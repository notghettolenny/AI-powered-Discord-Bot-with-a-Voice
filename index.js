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
