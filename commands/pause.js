const { SlashCommandBuilder } = require("discord.js");
//1069850528160432148
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause music is playing"),
  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply("I'm not playing music in this server");
    if (player.options.voiceChannel !== interaction.member.voice.channel.id) {
      return interaction.reply("Bot Music not here");
    }
    if (!player.playing) return interaction.reply("I am already paused");
    player.pause(true);
    interaction.reply("Successfully paused the music");
  },
};
