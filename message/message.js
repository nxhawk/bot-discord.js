const { EmbedBuilder } = require("discord.js");
const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

// more function
const addTop = require("./function/addTop");
const callBot = require("./function/bot");
const help = require("./function/help");
const loadFunc = require("./function/loadFunc");
const userInfor = require("./function/userInfor");

async function handleMessage(message, client) {
  if (message.author.bot) return;
  // Get the command name and arguments
  msg = message.content;
  if (msg.startsWith("!cat", 0)) {
    try {
      await fetch(process.env.API_IMAGE_CAT)
        .then((res) => res.json())
        .then((data) => {
          const embed = new EmbedBuilder()
            .setTitle("(´ ▽ `)b")
            .setColor(0xf273e6)
            .setImage(data.file);
          message.channel.send({ embeds: [embed] });
        });
    } catch (error) {
      console.log(error.message);
    }
  } else if (msg.startsWith("!dog", 0)) {
    try {
      await fetch(process.env.API_IMAGE_DOG)
        .then((res) => res.json())
        .then((data) => {
          const embed = new EmbedBuilder()
            .setTitle("(´ ▽ `)b")
            .setColor(0xf273e6)
            .setImage(data.message);
          message.channel.send({ embeds: [embed] });
        });
    } catch (error) {
      console.log(error.message);
    }
  } else if (msg.startsWith("!dark", 0)) {
    try {
      await fetch(process.env.API_DARK)
        .then((res) => res.json())
        .then((data) => {
          data = data.data.images.original.url;
          const embed = new EmbedBuilder().setColor(0x000).setImage(data);
          message.channel.send({ embeds: [embed] });
        });
    } catch (error) {
      console.log(error.message);
    }
  } else if (msg.startsWith("!quote", 0)) {
    try {
      await fetch(process.env.API_QUOTE)
        .then((res) => res.json())
        .then((data) => {
          data = data[0]["q"] + " (Cre: " + data[0]["a"] + ")";
          message.channel.send(data);
        });
    } catch (error) {
      console.log(error.message);
    }
  } else if (msg.startsWith("load", 0) || msg.startsWith("play", 0))
    loadFunc(message, client);
  else if (msg.startsWith("!top", 0)) addTop(message, client);
  else if (msg.includes("!infor") && msg.includes("<@")) userInfor(message);
  else if (msg.startsWith("!help")) help(message, client);
  else if (msg === "!bot") callBot(message, client);
}

module.exports = handleMessage;
