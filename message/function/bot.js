async function callBot(message, client) {
  if (!message.member.voice.channel)
    return message.channel.send({
      content: "`You need to join a voice channel.`",
      ephemeral: true,
    });
  let player = client.manager.players.get(message.guild.id);
  if (player) {
    if (!player.playing && !player.paused && !player.queue.size) {
      await player.stop();
      await player.destroy();
    } else {
      message.channel.send("`Bot is busy now!`");
      return;
    }
  }
  player = client.manager.create({
    guild: message.guild.id,
    voiceChannel: message.member.voice.channel.id,
    textChannel: message.channel.id,
  });
  player.connect();
  player.stop();
  message.channel.send("/clear to use me");
}

module.exports = callBot;
