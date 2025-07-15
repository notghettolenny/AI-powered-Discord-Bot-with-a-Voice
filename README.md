# 🤖 AI-powered Discord Bot with a Voice

![Node.js](https://img.shields.io/badge/built%20with-Node.js-339933?style=flat\&logo=node.js\&logoColor=white)
![Discord.js](https://img.shields.io/badge/library-discord.js-7289DA?style=flat\&logo=discord\&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

A Discord bot built with **Node.js**, which uses **IBM Watson Assistant** for AI-powered conversation and **IBM Watson Text-to-Speech** to speak answers in voice channels.
The bot listens for a command, generates a response using Watson Assistant, and sends the response both as a text message and as spoken audio in the user’s voice channel.

---

## ✨ Features

✅ Responds to text commands in Discord channels
✅ Uses IBM Watson Assistant to generate conversational replies
✅ Joins the user’s voice channel and speaks the response using IBM Watson Text-to-Speech
✅ Deletes temporary audio files after playback
✅ Docker-ready for deployment
✅ Configurable via `.env`

---

## 🏗️ Tech Stack

| Component           | Technology                                                            |
| ------------------- | --------------------------------------------------------------------- |
| **Language**        | Node.js                                                               |
| **Discord API**     | [discord.js](https://discord.js.org/)                                 |
| **AI Service**      | [IBM Watson Assistant](https://www.ibm.com/cloud/watson-assistant)    |
| **Voice Synthesis** | [IBM Watson Text-to-Speech](https://www.ibm.com/cloud/text-to-speech) |
| **Deployment**      | Docker                                                                |

---

## 📁 Project Structure

```
AI-powered-Discord-Bot-with-a-Voice/
├── .env                # Environment variables (Discord token & IBM API keys)
├── dockerfile          # Dockerfile for deployment
├── index.js            # Main bot logic
├── package.json        # Node.js dependencies & scripts
```

---

## 🚀 Getting Started

### 📋 Prerequisites

* Node.js v14+
* npm
* A Discord Bot Token ([get one here](https://discord.com/developers/applications))
* IBM Watson Assistant credentials (API key, URL, Assistant ID)
* IBM Watson Text-to-Speech credentials (API key, URL)
* Docker (optional)

---

### ⚙️ Installation

1️⃣ Clone the repository:

```bash
git clone https://github.com/notghettolenny/AI-powered-Discord-Bot-with-a-Voice.git
cd AI-powered-Discord-Bot-with-a-Voice
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Configure your `.env` file:

```
DISCORD_TOKEN=your_discord_bot_token
ASSISTANT_KEY=your_ibm_assistant_api_key
ASSISTANT_URL=your_ibm_assistant_url
ASSISTANT_ID=your_ibm_assistant_id
TTS_KEY=your_ibm_tts_api_key
TTS_URL=your_ibm_tts_url
```

4️⃣ Run the bot:

```bash
node index.js
```

---

## 🐳 Docker Deployment

1️⃣ Build the Docker image:

```bash
docker build -t discord-voice-bot .
```

2️⃣ Run the container:

```bash
docker run -d --env-file .env discord-voice-bot
```

---

## 🎮 Usage

* Prefix for commands: `*`
* Send a message starting with `*` followed by your question in a text channel.
* If you’re in a voice channel, the bot will join, speak the answer, and also reply in the text channel.
* Example:

  ```
  *What is the weather today?
  ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

* Fork the repo
* Create your feature branch (`git checkout -b feature/your-feature`)
* Commit your changes
* Push to the branch (`git push origin feature/your-feature`)
* Open a Pull Request

---

## 📬 Contact

For questions or feedback, open an [issue](https://github.com/notghettolenny/AI-powered-Discord-Bot-with-a-Voice/issues).

---

### 📌 Notes

* Be sure to keep your `.env` file private; never commit your tokens or keys.
* The bot saves an `audio.wav` file temporarily while playing; it deletes it after playback.

---
