module.exports = {
    callback: (message, Discord, client, ...args) => {
        //Command information
        const COMMAND_NAME = "_stop";
        const REQUIRED_ROLE = "Jerry#3756";
        const EXCPECTED_ARGUMENTS = 0;
        const OPTIONAL_ARGUMENTS = 1;

        //Help command
        if(args[0] == '?') {
            const help_command = new Discord.MessageEmbed()
                .setColor('#2020ff')
                .setAuthor({name: "dir: ./commands/op/_stop.js; Lines: 141; File size: ~7.5 KB"})
                .setTitle(`,${COMMAND_NAME} command help (${REQUIRED_ROLE})`)
                .setDescription('This command stops the bot.')
                .addField(`Usage`, "`" + `,${COMMAND_NAME}` + " (<reason>)" + "`", false)
                .addField(`Aliases`, "`end`, `kill`, `shutdown`, `terminate`", false)
                .addField(`Excpected arguments`, `${EXCPECTED_ARGUMENTS}`, true)
                .addField(`Optional arguments`, `${OPTIONAL_ARGUMENTS}`, true)
                .addField(`Notes`, "If no reason is provided, the bot will stop after 10 seconds. The user will be able to cancel the request within these 10 seconds.", false)
                .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [help_command]})
            return;
        }

        //Declaring variables

        //Declaring functions

        //Checks
        if(message.member.user.id !== "611633988515266562") {
            const error_permissions = new Discord.MessageEmbed()
                .setColor('#ff2020')
                .setAuthor({name: "PermissionError"})
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.\n" +
                    "__This command can only be used by Jerry#3756.__ For staff members, please use `stop` (not `_stop`).")
                .setFooter({text: `${message.author.tag} • Use ',${COMMAND_NAME} ?' for help`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [error_permissions]})
            return;
        }

        //Code
        if(!args[0]) {
            let filter = m => m.author.id === message.author.id;
            const warning_no_arguments = new Discord.MessageEmbed()
                .setColor('ffff20')
                .setAuthor({name: "Warning"})
                .setDescription("No reason was provided. __The bot will stop in **10** seconds__. You can cancel the request within these 10 seconds by sending any message.\n" +
                    "By providing a reason, you can skip the waiting period.")
                .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [warning_no_arguments]})
            const collector = message.channel.createMessageCollector({
                filter,
                max: 1,
                time: 10000,
            })
            collector.on('collect', message => {
                const request_canceled = new Discord.MessageEmbed()
                    .setColor('#20ff20')
                    .setAuthor({name: "Rejected"})
                    .setDescription("The request was canceled.")
                    .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                    .setTimestamp();

                message.channel.send({embeds: [request_canceled]})
                return;
            })
            collector.on('end', collected => {
                if(collected.size === 0) {
                    const request_resolve_stop = new Discord.MessageEmbed()
                        .setColor('#ff20ff')
                        .setAuthor({name: "Client"})
                        .setTitle("Bot shutdown")
                        .setDescription(`<@${message.member.user.id}> requested a bot shutdown.`)
                        // .addField("Name", `${message.author.username}`, true)
                        // .addField("Discriminator", `${message.author.discriminator}`, true)
                        // .addField("User ID", `${message.author.id}`, true)
                        .addField("Channel ID", `${message.channel.id}`, false)
                        .addField("Timestamp (message.createdAt)", `${message.createdAt}`, false)
                        .addField("Reason", 'No reason was provided.', false)
                        .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                        .setTimestamp();

                    message.channel.send({embeds: [request_resolve_stop]})
                        .then(() => {
                            const destroying_client = new Discord.MessageEmbed()
                                .setColor('ff20ff')
                                .setDescription("Destroying the client and terminating the NodeJS process with code 0...")

                            message.channel.send({embeds: [destroying_client]})
                                .then(() => {
                                    console.log(`Stopping the bot\n` +
                                        `Reason: No reason was provided.\n` +
                                        `Timestamp: ${message.createdAt}`);
                                    client.destroy()
                                    process.exit();
                                })
                        })
                }
            })
        } else if(args[0]) {
            let stopReason = args.join(" ");
            const request_resolve_stop = new Discord.MessageEmbed()
                .setColor('#ff20ff')
                .setAuthor({name: "Client"})
                .setTitle("Bot shutdown")
                .setDescription(`<@${message.member.user.id}> requested a bot shutdown.`)
                // .addField("Name", `${message.author.username}`, true)
                // .addField("Discriminator", `${message.author.discriminator}`, true)
                // .addField("User ID", `${message.author.id}`, true)
                .addField("Channel ID", `${message.channel.id}`, false)
                .addField("Timestamp (message.createdAt)", `${message.createdAt}`, false)
                .addField("Reason", `${stopReason}`, false)
                .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [request_resolve_stop]})
                .then(() => {
                    const destroying_client = new Discord.MessageEmbed()
                        .setColor('ff20ff')
                        .setDescription("Destroying the client and terminating the NodeJS process with code 0...")

                    message.channel.send({embeds: [destroying_client]})
                        .then(() => {
                            console.log(`Stopping the bot\n` +
                                `Reason: ${stopReason}\n` +
                                `Timestamp: ${message.createdAt}`);
                            client.destroy()
                            process.exit();
                        })
                })
        }
    }
}