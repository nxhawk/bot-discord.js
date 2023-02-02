const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const moment = require("moment");

const regions = {
  brazil: "Brazil",
  europe: "Europe",
  hongkong: "Hong Kong",
  india: "India",
  japan: "Japan",
  russia: "Russia",
  singapore: "Singapore",
  southafrica: "South Africa",
  sydeny: "Sydeny",
  "us-central": "US Central",
  "us-east": "US East",
  "us-west": "US West",
  "us-south": "US South",
  "en-US": "US",
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Server information"),
  async execute(client, interaction) {
    const roles = interaction.guild.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((role) => role.toString());
    const members = interaction.guild.members.cache;
    const emojis = interaction.guild.emojis.cache;
    const owner = await interaction.guild.fetchOwner();

    try {
      const embed = new EmbedBuilder()
        .setDescription(
          `**Guild information for __${interaction.guild.name}__**`
        )
        .setColor("BLUE")
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addFields({
          name: "General",
          value: `\n**❯ Name:** ${interaction.guild.name}
            **❯ ID:** ${interaction.guild.id}
            **❯ Owner:** ${owner.user.username} (${owner.user.id})
            **❯ Region:** ${regions[interaction.guild.preferredLocale]}
            **❯ Boost Tier:** ${
              interaction.guild.premiumTier
                ? `Tier ${interaction.guild.premiumTier}`
                : "None"
            }
            **❯ Time Created:** ${moment(
              interaction.guild.createdTimestamp
            ).format("LT")} ${moment(interaction.guild.createdTimestamp).format(
            "LL"
          )} ${moment(interaction.guild.createdTimestamp).fromNow()}\n`,
          inline: false,
        })
        .addFields({
          name: "Statistics",
          inline: false,
          value: `\n
          **❯ Role Count:** ${roles.length}
          **❯ Emoji Count:** ${emojis.size}
          **❯ Regular Emoji Count:** ${
            emojis.filter((emoji) => !emoji.animated).size
          }
          **❯ Animated Emoji Count:** ${
            emojis.filter((emoji) => emoji.animated).size
          }
          **❯ Member Count:** ${interaction.guild.memberCount}
          **❯ Humans:** ${members.filter((member) => !member.user.bot).size}
          **❯ Bots:** ${members.filter((member) => member.user.bot).size}
          **❯ Boost Count:** ${
            interaction.guild.premiumSubscriptionCount || "0"
          }
          `,
        })
        .addFields({
          name: `Roles [${roles.length - 1}]`,
          inline: false,
          value:
            roles.length < 10
              ? roles.join(", ")
              : roles.length > 10
              ? this.client.utils.trimArray(roles)
              : "None",
        })
        .setTimestamp();
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.log(error);
    }
  },
};
