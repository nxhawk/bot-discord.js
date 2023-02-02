const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mix")
    .setDescription("Mix list music"),
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
    let oldQueue = [];
    for (const track of player.queue) oldQueue.push(track);
    const shuffledArray = oldQueue.sort((a, b) => 0.5 - Math.random());
    player.queue.clear();
    for (const track of shuffledArray) player.queue.add(track);
    if (player.queue.size) {
      return interaction.reply("`🔀 Đã xáo trộn thành công`");
    }
    interaction.reply("`No music in queue`");
  },
};
