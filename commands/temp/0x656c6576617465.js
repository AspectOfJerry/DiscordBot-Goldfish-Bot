//GIVE ROLE
//0x656C6576617465
//0x656c6576617465
module.exports = {
    callback: (message, Discord, client, ...args) => {
        //Command information

        //Declaring variables

        //Declaring functions

        //Checks
        if(!message.member.user.id == "611633988515266562") {
            const error_permissions = new Discord.MessageEmbed()
                .setColor('#ff2020')
                .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 16})}`)
                .setDescription("I'm sorry but you do not have the permissions to perform this command. Please contact the server administrators if you believe that this is an error.")

            message.channel.send({embeds: [error_permissions]})
            return;
        }
        //Code
        const memberTarget = message.mentions.members.first()
        message.member.roles.add("908099650156892191")
        memberTarget.roles.add("908099650156892191")
    }
}
