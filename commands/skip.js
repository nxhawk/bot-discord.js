const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("skip").setDescription("Skip music"),
  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply("I'm not playing music in this server");
    if (player.options.voiceChannel !== interaction.member.voice.channel.id) {
      return interaction.reply("Bot Music not here");
    }
    let oldQueue = [];
    for (const track of player.queue) oldQueue.push(track);
    player.queue.clear();
    for (const track of oldQueue) player.queue.add(track);
    if (player.queue.size) {
      player.stop();
      player.play();
      let playembed = new EmbedBuilder()
        .setDescription(`Playing ${oldQueue[0].title}.`)
        .setColor(0x222345)
        .setImage(oldQueue[0].thumbnail);
      return interaction.reply({
        embeds: [playembed],
      });
    }
    interaction.reply("No music in queue");
  },
};
