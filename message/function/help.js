const { EmbedBuilder } = require("discord.js");
const data = require("../../config/data");

async function help(message, client) {
  let msg = message.content.slice(5).replace(" ", "");

  if (msg.length > 0) {
    let dsc = "";
    for (const command of client.commands)
      if (msg.includes(command[0]))
        dsc += `\`/${command[0]}\`: ${command[1].data.description}
    `;
    data.forEach((d) => {
      if (msg.includes(d.message))
        dsc += `\`${d.message}\`: ${d.description}
      `;
    });

    if (dsc === "") {
      return message.channel.send(`Invalid Command named: \`${msg}\``);
    }
    const embed = new EmbedBuilder()
      .setColor("0x03C988")
      .setAuthor({
        name: `${message.guild.name}`,
        iconURL: message.guild.iconURL({ dynamic: true }),
      })
      .setTitle("Command information")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter({
        text: `Request by ${message.author.username}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    embed.setDescription(dsc);
    return message.channel.send({ embeds: [embed] });
  }

  const embed = new EmbedBuilder()
    .setColor("0xD61355")
    .setAuthor({
      name: `${message.guild.name}`,
      iconURL: message.guild.iconURL({ dynamic: true }),
    })
    .setTitle("Interaction menu")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({
      text: `Request by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({ dynamic: true }),
    })
    .setTimestamp();
  let dsc = "";
  for (const command of client.commands) {
    dsc += `\`/${command[0]}\`: ${command[1].data.description}
    `;
  }
  embed.setDescription(dsc);

  const embe = new EmbedBuilder()
    .setColor("0xF94A29")
    .setAuthor({
      name: `${message.guild.name}`,
      iconURL: message.guild.iconURL({ dynamic: true }),
    })
    .setTitle("Message menu")
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter({
      text: `Request by ${message.author.username}`,
      iconURL: message.author.displayAvatarURL({ dynamic: true }),
    })
    .setTimestamp();
  dsc = "";
  data.forEach((d) => {
    dsc += `\`${d.message}\`: ${d.description}
    `;
  });
  embe.setDescription(dsc);
  message.channel.send({ embeds: [embed, embe] });
}

module.exports = help;
