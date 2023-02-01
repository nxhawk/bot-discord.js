require("dotenv").config();
const handleMessage = require("./message/message");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { REST, Routes } = require("discord.js");
const { Manager } = require("erela.js");
const fs = require("node:fs");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
});

// Define some options for the node
const nodes = [
  {
    host: process.env.HOST,
    password: process.env.PASS,
    port: 443,
    secure: true,
  },
];

client.commands = new Collection();

const commands = [];

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands`
    );
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch (error) {
    console.error(error);
  }
})();

client.on("ready", () => {
  client.manager.init(client.user.id);
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand() || !interaction.isCommand) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
    command.execute(client, interaction);
  } catch (error) {
    interaction.reply({
      content: "There was error executing this command.",
      ephemeral: true,
    });
  }
});

// Assign Manager to the client variable
client.manager = new Manager({
  // The nodes to connect to, optional if using default lavalink options
  nodes,
  // Method to send voice data to Discord
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    // NOTE: FOR ERIS YOU NEED JSON.stringify() THE PAYLOAD
    if (guild) guild.shard.send(payload);
  },
});

// Emitted whenever a node connects
client.manager.on("nodeConnect", (node) => {
  console.log(`Node "${node.options.identifier}" connected.`);
});

// Emitted whenever a node encountered an error
client.manager.on("nodeError", (node, error) => {
  console.log(
    `Node "${node.options.identifier}" encountered an error: ${error.message}.`
  );
});

// THIS IS REQUIRED. Send raw events to Erela.js
client.on("raw", (d) => client.manager.updateVoiceState(d));

//message
client.on("messageCreate", (message) => handleMessage(message, client));

client.login(TOKEN);
