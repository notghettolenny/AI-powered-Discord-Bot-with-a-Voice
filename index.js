// We will need to 'require' some packages to use for this file
const fs = require('fs'); // This allows us to use file system commands
const dotenv = require('dotenv'); // This allows us to use the constants in our .env file
dotenv.config(); // Read the constants in our .env file

// Require the needed discord.js classes
const Discord = require('discord.js');

// Create a new Discord client
const client = new Discord.Client();

const AssistantV2 = require('ibm-watson/assistant/v2'); // Add Watson Assistant
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1'); // Add Text to Speech
const { IamAuthenticator } = require('ibm-watson/auth'); // Add Watson Authentication

// Add our assistant from the IBM Watson Assistant service
const assistant = new AssistantV2({
  version: '2021-06-14',
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_KEY,
  }),
  serviceUrl: process.env.ASSISTANT_URL,
});

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.TTS_KEY,
  }),
  serviceUrl: process.env.TTS_URL,
});
const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.TTS_KEY,
  }),
  serviceUrl: process.env.TTS_URL,
});

async function sendAndPlayMessage(message) {
  try {
    // Start a new session with our asssistant
    const sessionId = (await assistant.createSession({ assistantId: process.env.ASSISTANT_ID  })).result.session_id;
    // Send the user's question to our assistant
    assistant.message({
      input: { text: message.content.substring(1) },
      assistantId: process.env.ASSISTANT_ID,
      sessionId: sessionId
    })
    .then(response => {
      //  Convert the response into a readable message for our users
      let text =  JSON.stringify(response.result.output.generic[0].text, null, 2); // pass the value to the global variable

      // Join the same voice channel of the author of the message
      if (message.member.voice.channel) {

        // This configures the voice that will be used, the file type that is returned and the text that will be spoken
        const synthesizeParams = {
          text: response.result.output.generic[0].text,
          accept: 'audio/wav',
          voice: 'en-US_AllisonV3Voice',
        };

        // This is sending the request
        textToSpeech.synthesize(synthesizeParams)
        .then(response => {
          // This is here specifically for .wav files following IBM's Text to Speech guides
          return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
          // Here we are creating a file and saving the returned value from the Text to Speech instance into it
          fs.writeFile(`./audio.wav`, buffer, (err) => {
            if (err) console.error("error" + err);
            // Now we have the bot join the voice channel that the sender is in
            const connection = message.member.voice.channel.join().then(connection => {
              // And we get the bot to play the audio file
              const dispatcher = connection.play('audio.wav')
              .on('start', () => {
                console.log('audio.wav is now playing!'); // Checking the file is played
                message.reply(text); // While the audio is playing, we can send the message into the chat
              })
 .on('finish', () => {
                console.log('audio.wav has finished playing!'); // Checking the file is done playing
                fs.unlinkSync('audio.wav'); // Delete the file
                connection.disconnect();
              })
              .on('error', e => {
                message.channel.send("Sorry, I'm unable to speak right now."); // The file cannot be played
                console.error(e);
                fs.unlinkSync('audio.wav'); // Delete the file
                return connection.disconnect();;
              });
            });
          });
        })
        .catch(err => {
          console.log('error:', err);
        });
      } else {
        // This is if the message sender is not in a voice channel, we just send a reply in the message channel
        message.reply(text);
      }

      return JSON.stringify(response.result.output.generic[0].text, null, 2);
    })
    .catch(err => {
      // In case of an error, tell us what it is in the terminal
      console.log(err);
      return error.stringify;
    });
  } catch (error) {
    // In case of an error, tell us what it is in the terminal
    console.error(error);
  }  
}

client.once('ready', () => {
  console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);

const prefix = "*"

client.on('message', message => {
  // If the message doesn't start with the prefix or the message is coming from another bot, we're not going to do anything
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  // Otherwise, we'll send that message to our assistant
  sendAndPlayMessage(message);
});
