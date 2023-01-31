const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unpause")
    .setDescription("Continue music "),
  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply("I'm not playing music in this server");
    if (player.options.voiceChannel !== interaction.member.voice.channel.id) {
      return interaction.reply("Bot Music not here");
    }
    if (player.playing) return interaction.reply("I am not paused yet!");
    player.pause(false);
    interaction.reply("Music is continued");
  },
};
