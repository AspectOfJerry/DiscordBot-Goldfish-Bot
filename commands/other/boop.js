const {Client, Intents, Collection, MessageEmbed} = require('discord.js');
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boop')
        .setDescription("Same as Hypixel's '/boop' command.")
        .addUserOption((options) =>
            options
                .setName('user')
                .setDescription("The user to 'boop'.")
                .setRequired(true))
        .addBooleanOption((options) =>
            options
                .setName('ephemeral')
                .setDescription("Whether you want the bot's messages to only be visible to yourself.")
                .setRequired(false)),
    async execute(client, interaction) {
        //Command information
        const REQUIRED_ROLE = "everyone";

        //Declaring variables
        const is_ephemeral = interaction.options.getBoolean('ephemeral');
        const target = interaction.options.getUser('user');
        const memberTarget = interaction.guild.members.cache.get(target.id);

        //Checks

        //Code
        interaction.channel.send({content: "<@611633988515266562>, This command requires verification."});

        const boop = new MessageEmbed()
            //.setColor('#') - VERIFY
            .setThumbnail(`${interaction.member.user.displayAvatarURL({dynamic: true, size: 16})}`)
            .setDescription("Boop!")

        interaction.reply({content: `<@${memberTarget.id}>`, embeds: [boop], ephemeral: is_ephemeral}); //VERIFY
    }
}
