module.exports = {
    callback: (message, Discord, client, ...args) => {
        //Command information
        const COMMAND_NAME = "kick";
        const REQUIRED_ROLE = "Mod";
        const EXCPECTED_ARGUMENTS = 1;
        const OPTIONAL_ARGUMENTS = 1;

        //Help command
        if(args[0] == '?') {
            const help_command = new Discord.MessageEmbed()
                .setColor('#2020ff')
                .setAuthor({name: "dir: ./commands/kick.js; Lines: 181; File size: ~8.9 KB"})
                .setTitle(`,${COMMAND_NAME} command help (${REQUIRED_ROLE})`)
                .setDescription('This command kicks a user from the guild.')
                .addField(`Usage`, "`" + `,${COMMAND_NAME}` + " <user> (<reason>)" + "`", false)
                .addField(`Excpected arguments`, `${EXCPECTED_ARGUMENTS}`, true)
                .addField(`Optional arguments`, `${OPTIONAL_ARGUMENTS}`, true)
                .addField('Related commands', "`ban`", false)
                .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [help_command]})
            return;
        }

        //Declaring variables
        let verdict;
        let messageMemberHighestRole;
        let memberTargetHighestRole;

        //Declaring functions
        function GetMessageMemberHighestRole(message) {
            if(message.member.roles.cache.find(role => role.name == "Owner")) {
                return 0;
            } else if(message.member.roles.cache.find(role => role.name == "Admin")) {
                return 1;
            } else if(message.member.roles.cache.find(role => role.name == "Mod")) {
                return 2;
            } else if(message.member.roles.cache.find(role => role.name == "staff")) {
                return 3;
            } else {
                return null;
            }
        }
        function GetMemberTargetHighestRole(memberTarget) {
            if(memberTarget.roles.cache.find(role => role.name == "Owner")) {
                return 0;
            } else if(memberTarget.roles.cache.find(role => role.name == "Admin")) {
                return 1;
            } else if(memberTarget.roles.cache.find(role => role.name == "Mod")) {
                return 2;
            } else if(memberTarget.roles.cache.find(role => role.name == "staff")) {
                return 3;
            } else {
                return null;
            }
        }
        function CanMessageMemberExecute(messageMemberHighestRole, memberTargetHighestRole) {
            if(messageMemberHighestRole == memberTargetHighestRole) {
                return "equal";
            } else if(messageMemberHighestRole < memberTargetHighestRole || memberTargetHighestRole == null) {
                return "yes";
            } else {
                return "no";
            }
        }
        function Verdict(message, verdict) {
            if(verdict == "equal") {
                const error_equal_roles = new Discord.MessageEmbed()
                    .setColor('ff2020')
                    .setAuthor({name: "PermissionError"})
                    .setDescription(`Your highest role is equal to <@${message.member.user.id}>'s highest role.`)
                    .setFooter({text: "Your role must be higher than the targeted member's role."})
                    .setFooter({text: `${message.author.tag} • Use ',${COMMAND_NAME} ?' for help`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                    .setTimestamp();

                message.channel.send({embeds: [error_equal_roles]})
                return;
            } else if(verdict == "yes") {
                memberTarget.kick()
                    .then((kickResult) => {
                        const success_kick = new Discord.MessageEmbed()
                            .setColor('20ff20')
                            .setAuthor({name: "Success"})
                            .setTitle("User kick")
                            .setDescription(`<@${message.member.user.id}> kicked <@${memberTarget.user.id}>.`)
                            .setFooter({text: `${message.author.tag} • ${COMMAND_NAME}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                            .setTimestamp();

                        message.channel.send({embeds: [success_kick]})
                        return;
                    })
                    .catch((error) => {
                        console.log(error)
                        const error_catch = new Discord.MessageEmbed()
                            .setColor('#ff20ff')
                            .setAuthor({name: "PromiseRejected"})
                            .setTitle("Critical error catch")
                            .setDescription("An error was caught at line `94`.")
                            .addField("code", `${error.code}`, true)
                            .addField("httpsStatus", `${error.httpStatus}`, true)
                            .addField("path", `${error.path}`, false)
                            .setFooter({text: `${message.author.tag} • Use ',${COMMAND_NAME} ?' for help`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                            .setTimestamp();

                        message.channel.send({embeds: [error_catch]})
                    })
            } else {
                const error_role_too_low = new Discord.MessageEmbed()
                    .setColor('ff2020')
                    .setAuthor({name: "PermissionError"})
                    .setDescription(`Your role is lower then <@${memberTarget.user.id}>'s role.`)
                    .setFooter({text: `${message.author.tag} • Use ',${COMMAND_NAME} ?' for help`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                    .setTimestamp();

                message.channel.send({embeds: [error_role_too_low]})
                return;
            }
        }

        //Checks
        if(!message.member.roles.cache.find(role => role.name == REQUIRED_ROLE)) {
            const error_permissions = new Discord.MessageEmbed()
                .setColor('#ff2020')
                .setAuthor({name: "PermissionError"})
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")
                .setFooter({text: `${message.author.tag} • Use ',${COMMAND_NAME} ?' for help`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [error_permissions]})
            return;
        }
        if(!args[0]) {
            const error_missing_arguments = new Discord.MessageEmbed()
                .setColor('#ff2020')
                .setAuthor({name: "Error"})
                .setDescription(`Excpected **${EXCPECTED_ARGUMENTS}** arguments but only provided **0**.\n` +
                    "Please provide a member to kick.")
                .setFooter({text: `${message.author.tag} • Use ',${COMMAND_NAME} ?' for help`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [error_missing_arguments]})
            return;
        }
        const target = message.mentions.users.first();
        if(!target) {
            const reference_error_target = new Discord.MessageEmbed()
                .setColor('ff2020')
                .setAuthor({name: "ReferenceError"})
                .setDescription('Invalid user (not found).\n' +
                    "Please provide a vavlid member to kick.")
                .setFooter({text: `${message.author.tag} • Use ',${COMMAND_NAME} ?' for help`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [reference_error_target]})
            return;
        }
        const memberTarget = message.guild.members.cache.get(target.id);
        if(memberTarget == message.member) {
            const error_cannot_use_on_self = new Discord.MessageEmbed()
                .setColor('ff2020')
                .setAuthor({name: "Error"})
                .setDescription('You cannot use this command on yourself.')
                .setFooter({text: `${message.author.tag} • Use ',${COMMAND_NAME} ?' for help`, iconURL: message.author.displayAvatarURL({dynamic: true})})
                .setTimestamp();

            message.channel.send({embeds: [error_cannot_use_on_self]})
            return;
        }

        //Code
        messageMemberHighestRole = GetMessageMemberHighestRole(message)
        memberTargetHighestRole = GetMemberTargetHighestRole(memberTarget)

        verdict = CanMessageMemberExecute(messageMemberHighestRole, memberTargetHighestRole)

        Verdict(message, verdict)
    }
}
