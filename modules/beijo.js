const { MessageEmbed } = require('discord.js')

exports.run = async(interaction) => {
    const beijos = [
        'https://th.bing.com/th/id/R.66abd66c19131daadfc07989caeb350d?rik=dNMincWhEpm6ZA&pid=ImgRaw&r=0',
        'https://th.bing.com/th/id/OIP.CaWgNpthk327I2VhBoIXEwHaEK?pid=ImgDet&rs=1',
        'https://th.bing.com/th/id/R.7e369086033c586f43ca49c3807d0ed8?rik=t8Al2eClTGcagQ&pid=ImgRaw&r=0'
    ];

    const link = beijos[Math.floor(Math.random() * beijos.length)];

    if (interaction.options._hoistedOptions[0].user == undefined) return interaction.reply('Informe um usuário, não um cargo!');

    const user = (interaction.user.username != undefined) ? interaction.user.username : interaction.reply('Usuário inválido!');
    const mention = interaction.options._hoistedOptions[0].user.username;

    const embed = new MessageEmbed().setImage(link).setTitle(`${user} beijou ${mention} :heart:`).setTimestamp().setDescription('Quanto amor')

    await interaction.reply({ embeds: [embed] })
}