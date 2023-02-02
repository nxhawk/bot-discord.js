const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setvolume")
    .setDescription("Change volume music")
    .addStringOption((option) =>
      option
        .setName("new_volume")
        .setDescription("Enter new volume percentage (!type Number!)")
    ),
  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply({
        content: "`I'm not playing music in this server`",
        ephemeral: true,
      });
    const new_vol = interaction.options.getString("new_volume");
    if (!player.playing) return interaction.reply("`I'm not playing music`");
    try {
      const vol = parseInt(new_vol);
      if (isNaN(vol) || vol < 0 || vol > 100) throw new Error();

      await player.setVolume(vol);
      return interaction.reply({
        content: `\`Volume has been set to ${vol}% \``,
        ephemeral: true,
      });
    } catch (error) {
      console.log(error.message);
      return interaction.reply(
        `\`Error with [new_volume]. It must be between 0 and 100 (type int)\``
      );
    }
  },
};
