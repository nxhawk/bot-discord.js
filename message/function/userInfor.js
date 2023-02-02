const moment = require("moment");
const { EmbedBuilder } = require("discord.js");

async function userInfor(message) {
  msg = message.content.slice(7);
  const user = msg.split("@")[1].split(">")[0];
  const member = await message.guild.members.fetch(user);
  let avatar = member.user.displayAvatarURL({ size: 512, dynamic: true });
  const embed = new EmbedBuilder()
    .setThumbnail(avatar)
    .setColor(member.displayHexColor || "BLUE")
    .setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true }))
    .addFields({
      name: "User",
      value: `
  **❯ Username:** ${member.user.username}
  **❯ Discriminator:** ${member.user.discriminator}
  **❯ ID:** ${member.id}
  **❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({
    dynamic: true,
  })})
  **❯ Time Created:** ${moment(member.user.createdTimestamp).format(
    "LT"
  )} ${moment(member.user.createdTimestamp).format("LL")} ${moment(
        member.user.createdTimestamp
      ).fromNow()}
  `,
    })
    .setTimestamp();
  message.channel.send({ embeds: [embed] });
}

module.exports = userInfor;
