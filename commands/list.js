const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("List all music ordered!"),
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
    if (player.queue.size < 1) return interaction.reply("`No music in queue!`");
    let resultDesc = "";
    let cnt = 1;
    for (const track of player.queue)
      resultDesc += `${cnt++}. ${track.title} - ${track.author}.\n`;
    const embed = new EmbedBuilder()
      .setTitle("All music in queue")
      .setColor(0x0099ff)
      .setDescription(resultDesc);
    interaction.reply({ embeds: [embed] });
  },
};
