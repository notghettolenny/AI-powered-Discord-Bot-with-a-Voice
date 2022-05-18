FROM node:14-slim as base
RUN mkdir /app && chown -R node:node /app
WORKDIR /app

# Add `tiny` init for signal forwarding
RUN apt-get -qq update > /dev/null && \
    apt-get -qq -y install wget > /dev/null && \
    rm -rf /var/lib/apt/lists
RUN wget -qO /tini https://github.com/krallin/tini/releases/download/v0.18.0/tini-$(dpkg --print-architecture) && \
    chmod +x /tini

# Builder will install system dependencies
FROM base as builder

# Install ffmpeg and other deps
RUN apt-get -qq update > /dev/null && \
    apt-get -qq -y install python make g++ tar xz-utils > /dev/null && \
    rm -rf /var/lib/apt/lists
RUN wget -qO /tmp/ffmpeg.tar.xz https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-$(dpkg --print-architecture)-static.tar.xz && \
    tar -x -C /usr/local/bin --strip-components 1 -f /tmp/ffmpeg.tar.xz --wildcards '*/ffmpeg' && \
    rm /tmp/ffmpeg.tar.xz

# Build will compile ts to js
FROM builder AS build

# Copy files
COPY --chown=node:node . /app

# Install compile dependencies
RUN npm install && \
    npm cache clean --force --silent

# release has the bare minimum to run the application
FROM base as release

COPY --from=build --chown=node:node /usr/local/bin/ffmpeg /usr/local/bin/ffmpeg
COPY --from=build --chown=node:node /app .

USER node
ENV NODE_ENV=production
CMD [ "node", "index.js" ]
