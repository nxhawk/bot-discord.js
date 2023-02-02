const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
function format(millis) {
  try {
    var s = Math.floor((millis / 1000) % 60);
    var m = Math.floor((millis / (1000 * 60)) % 60);
    var h = Math.floor((millis / (1000 * 60 * 60)) % 24);
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return (
      h + ":" + m + ":" + s + " | " + Math.floor(millis / 1000) + " Seconds"
    );
  } catch (e) {
    console.log(String(e.stack).grey.bgRed);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("infor")
    .setDescription("infor music is playing"),
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
    if (!player.playing)
      return interaction.reply({
        content: "`No music is playing!!`",
        ephemeral: true,
      });
    const music = player.queue.current;
    var playembed = new EmbedBuilder()
      .setDescription("INFOR MUSIC IS PLAYING")
      .setColor(0x222345)
      .setThumbnail(music.thumbnail)
      .addFields({
        name: "Name: ",
        value: `[${music.title}](${music.uri})`,
        inline: false,
      })
      .addFields({
        name: "⌛ Duration: ",
        value: `> \`${
          music.isStream ? "LIVE STREAM" : format(music.duration)
        }\``,
        inline: true,
      })
      .addFields({
        name: "💯 Song By: ",
        value: `> \`${music.author}\``,
        inline: true,
      })
      .addFields({
        name: "🔂 Queue length: ",
        value: `> \`${player.queue.length} Songs\``,
        inline: true,
      });
    interaction.reply({
      embeds: [playembed],
    });
  },
};
