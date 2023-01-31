const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("play your favorite song!")
    .addStringOption((option) =>
      option
        .setName("song_name")
        .setDescription("Enter the name of song you want to play!")
    ),
  async execute(client, interaction) {
    const song_name = interaction.options.getString("song_name");

    if (!interaction.member.voice.channel)
      return interaction.reply({
        content: "You need to join a voice channel.",
        ephemeral: true,
      });
    if (!song_name)
      return interaction.reply("You need to give me a URL or a search term.");

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
        `there was an error while searching: ${err.interaction}`
      );
    }

    // Create the player
    let player = client.manager.players.get(interaction.guild.id);
    if (!player) {
      player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
      });
      player.connect();
    }
    if (player.options.voiceChannel !== interaction.member.voice.channel.id) {
      return interaction.reply("Bot is busy now");
    }

    // Connect to the voice channel and add the track to the queue
    player.queue.add(res.tracks[0]);

    if (!player.playing && !player.paused && !player.queue.size) {
      player.play();
      let playembed = new EmbedBuilder()
        .setDescription(`Playing ${res.tracks[0].title}.`)
        .setColor(0x222345)
        .setImage(res.tracks[0].thumbnail);
      return interaction.reply({
        embeds: [playembed],
      });
    }
    if (player.paused) {
      let playembed = new EmbedBuilder()
        .setDescription(`Have music paused. Enqueuing ${res.tracks[0].title}.`)
        .setColor(0x222345)
        .setImage(res.tracks[0].thumbnail);
      return interaction.reply({
        embeds: [playembed],
      });
    }
    let playembed = new EmbedBuilder()
      .setDescription(`Enqueuing ${res.tracks[0].title}.`)
      .setColor(0x222345)
      .setImage(res.tracks[0].thumbnail);
    return interaction.reply({
      embeds: [playembed],
    });
  },
};
