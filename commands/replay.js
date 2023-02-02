const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("replay")
    .setDescription("Replay music"),
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
    player.play();
    interaction.reply("`Music is play again`");
  },
};
