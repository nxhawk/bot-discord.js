const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pause music is playing"),
  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply({
        content: "`I'm not playing music in this server`",
        ephemeral: true,
      });
    if (player.options.voiceChannel !== interaction.member.voice.channel.id) {
      return interaction.reply({
        content: "`Bot Music not here`",
        ephemeral: true,
      });
    }
    if (!player.playing) return interaction.reply("`I am already paused`");
    player.pause(true);
    interaction.reply("`Successfully paused the music`");
  },
};
