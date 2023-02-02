const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("search 10 exact name music you want play")
    .addStringOption((option) =>
      option
        .setName("song_name")
        .setDescription("Enter the name of song you want to search!")
    ),
  async execute(client, interaction) {
    const song_name = interaction.options.getString("song_name");

    if (!interaction.member.voice.channel)
      return interaction.reply({
        content: "`You need to join a voice channel.`",
        ephemeral: true,
      });

    if (!song_name)
      return interaction.reply({
        content: "`You need to give me a URL or a search term.`",
        ephemeral: true,
      });

    let res;

    try {
      // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
      res = await client.manager.search(song_name, interaction.author);
      // Check the load type as this command is not that advanced for basics
      if (res.loadType === "LOAD_FAILED") throw res.exception;
      else if (res.loadType === "PLAYLIST_LOADED")
        throw { interaction: "Playlists are not supported with this command." };
    } catch (err) {
      return interaction.reply(
        `there was an error while searching: \`${err.interaction}\``
      );
    }

    const tracks = res.tracks.slice(0, 10);
    let resultDesc = "";
    let counter = 0;
    const emojiarray = [
      "1️⃣",
      "2️⃣",
      "3️⃣",
      "4️⃣",
      "5️⃣",
      "6️⃣",
      "7️⃣",
      "8️⃣",
      "9️⃣",
      "🔟",
    ];
    for (const track of tracks)
      resultDesc += `${emojiarray[counter++]}. [[LINK]](${track.uri}) ${
        track.title
      }.\n \n`;
    const embed = new EmbedBuilder()
      .setTitle("What song would you like to choose? Enter the number.")
      .setColor(0x0099ff)
      .setDescription(resultDesc);

    interaction.reply({ embeds: [embed] });
    const filter = (msg) => {
      return msg.author.id === interaction.user.id;
    };
    const response = await interaction.channel.awaitMessages({
      filter,
      max: 1,
      time: 30000,
    });

    try {
      const answer = parseInt(response.first().content);
      const track = tracks[answer - 1];
      let player = client.manager.players.get(interaction.guild.id);
      if (player) {
        player.queue.add(track);
        let playembed = new EmbedBuilder()
          .setDescription(`${track.title} was added to the queue.`)
          .setColor(0x222345)
          .setImage(track.thumbnail);
        return interaction.channel.send({
          embeds: [playembed],
        });
      } else {
        player = client.manager.create({
          guild: interaction.guild.id,
          voiceChannel: interaction.member.voice.channel.id,
          textChannel: interaction.channel.id,
        });
        player.connect();
        player.queue.add(track);
        if (!player.playing && !player.paused && !player.queue.size) {
          player.play();
          let playembed = new EmbedBuilder()
            .setDescription(`Playing ${res.tracks[0].title}.`)
            .setColor(0x222345)
            .setImage(res.tracks[0].thumbnail);
          return interaction.channel.send({
            embeds: [playembed],
          });
        }
      }
    } catch (error) {
      interaction.channel.send("`Error !!!`");
    }
  },
};
