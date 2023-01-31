const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("order")
    .setDescription("Order food and drink to chill")
    .addStringOption((option) =>
      option
        .setName("food")
        .setDescription("Order your favorite food")
        .setRequired(true)
        .addChoices(
          { name: "Trứng chiên", value: "Trứng vịt chiên" },
          { name: "Mì", value: "Mì trứng cút" },
          { name: "Xoài", value: "Xoài thái" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("drink")
        .setDescription("Order your favorite dink")
        .setRequired(true)
        .addChoices(
          { name: "Coca", value: "coca-cola" },
          { name: "Trà tắc", value: "trà tắc" },
          { name: "Trà sữa thái", value: "trà sữa thái trân châu" }
        )
    ),
  async execute(client, interaction) {
    interaction.reply(
      `Bạn đã order ${interaction.options.getString(
        "food"
      )} và ${interaction.options.getString(
        "drink"
      )}.\nVui lòng đợi trong giây lát nhà hàng đang chuẩn bị.`
    );
  },
};
