const { MessageEmbed } = require('discord.js')
const puppeteer = require('puppeteer');
module.exports = {
    async beijo(message) {
        const beijos = [
            'https://th.bing.com/th/id/R.66abd66c19131daadfc07989caeb350d?rik=dNMincWhEpm6ZA&pid=ImgRaw&r=0',
            'https://th.bing.com/th/id/OIP.CaWgNpthk327I2VhBoIXEwHaEK?pid=ImgDet&rs=1',
            'https://th.bing.com/th/id/R.7e369086033c586f43ca49c3807d0ed8?rik=t8Al2eClTGcagQ&pid=ImgRaw&r=0'
        ];

        const link = beijos[Math.floor(Math.random() * beijos.length)];

        if (message.options._hoistedOptions[0].user == undefined) return message.reply('Informe um usuário, não um cargo!');

        const user = (message.user.username != undefined) ? message.user.username : message.reply('Usuário inválido!');
        const mention = message.options._hoistedOptions[0].user.username;

        const embed = new MessageEmbed().setImage(link).setTitle(`${user} beijou ${mention} :heart:`).setTimestamp().setDescription('Quanto amor')

        await message.reply({ embeds: [embed] })
    },

    async cotacao(test) {
        const cotacaoName = test.options._hoistedOptions[0].value == undefined ? test.reply(`Nome da cotação não informado`) : test.options._hoistedOptions[0].value;

        const url = `https://www.google.com/search?q=${cotacaoName}`;

        (async () => {
            await test.deferReply()
            
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            const values = await page.evaluate(() => {
                return {
                    numberCotacao: document.querySelector('span.jBBUv').ariaLabel,
                    valueCotacao: document.querySelector('span.IsqQVc').textContent,
                };
            });

            await browser.close();

            test.user.send(`A cotação da ${cotacaoName} é ${values.valueCotacao} subindo ${values.numberCotacao}`)

            await test.editReply('Te respondi na DM')
        })();
    }
}