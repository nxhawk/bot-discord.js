const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getvolume")
    .setDescription("Get now volume music"),

  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply({
        content: "`I'm not playing music in this server`",
        ephemeral: true,
      });
    const vol = await player.volume;
    return interaction.reply({
      content: `\`Volume is ${vol}%\``,
      ephemeral: true,
    });
  },
};
