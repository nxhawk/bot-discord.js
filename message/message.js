const { EmbedBuilder } = require("discord.js");
const fetch = (url) =>
  import("node-fetch").then(({ default: fetch }) => fetch(url));

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
  } else if (msg.startsWith("load", 0)) {
    msg = msg.replace("load ", "");
    if (!message.member.voice.channel)
      return message.channel.send({
        content: "You need to join a voice channel.",
        ephemeral: true,
      });
    if (!msg)
      return message.channel.send(
        "You need to give me a URL or a search term."
      );

    let res;

    try {
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      res = await client.manager.search(msg, message.author);
      // Check the load type as this command is not that advanced for basics
    } catch (err) {
      console.log(err.message);
    }
    let player = client.manager.players.get(message.guild.id);
    if (!player) {
      player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
      });
      player.connect();
    }

    for (const track of res.tracks) {
      await player.queue.add(track);
    }
    message.channel.send(
      `🎶 Đã thêm playlist\n${res.tracks.length} bài từ ${res.playlist.name}.`
    );
    if (!player.playing && !player.paused) {
      player.play();
      let playembed = new EmbedBuilder()
        .setDescription(`Playing ${res.tracks[0].title}.`)
        .setColor(0x222345)
        .setImage(res.tracks[0].thumbnail);
      return message.channel.send({
        embeds: [playembed],
      });
    }
  }
}

module.exports = handleMessage;
