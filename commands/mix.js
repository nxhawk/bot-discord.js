const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mix")
    .setDescription("Mix list music"),
  async execute(client, interaction) {
    const player = client.manager.players.get(interaction.guild.id);
    if (!player)
      return interaction.reply("I'm not playing music in this server");
    if (player.options.voiceChannel !== interaction.member.voice.channel.id) {
      return interaction.reply("Bot Music not here");
    }
    let oldQueue = [];
    for (const track of player.queue) oldQueue.push(track);
    const shuffledArray = oldQueue.sort((a, b) => 0.5 - Math.random());
    player.queue.clear();
    for (const track of shuffledArray) player.queue.add(track);
    if (player.queue.size) {
      return interaction.reply("Mixed list Music >>");
    }
    interaction.reply("No music in queue");
  },
};
