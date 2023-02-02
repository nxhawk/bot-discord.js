const { EmbedBuilder } = require("discord.js");

async function addTop(message, client) {
  msg = message.content.slice(5);
  if (!message.member.voice.channel)
    return message.channel.send({
      content: "You need to join a voice channel.",
      ephemeral: true,
    });
  if (!msg)
    return message.channel.send("You need to give me a URL or a search term.");

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
    player = await client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });
    player.connect();
  }
  try {
    let oldQueue = [];
    oldQueue.push(res.tracks[0]);
    for (const track of player.queue) oldQueue.push(track);
    player.queue.clear();
    for (const track of oldQueue) player.queue.add(track);

    message.channel.send(
      `🎶 Đã thêm bài hát ${res.tracks[0].title} vào đầu danh sách phát.`
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
  } catch (error) {
    return message.channel.send("Some thing wrong");
  }
}

module.exports = addTop;
