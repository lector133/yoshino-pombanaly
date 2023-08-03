const { parse } = require('node-html-parser')
const axios = require('../service/api');

exports.run = async (interaction) => {
    const cotacaoName = interaction.options._hoistedOptions[0].value == undefined ? interaction.reply(`Nome da cotação não informado`) : interaction.options._hoistedOptions[0].value;

    await interaction.deferReply()

    const file = await axios.get(`https://www.google.com/search?q=${cotacaoName}`);

    if (file === undefined || file.data == undefined) {
        return await interaction.editReply('Xiii, não achei os dados')
    }

    const arquivoNode = parse(file.data)

    try {
        const numberCotacao = arquivoNode.querySelector('span.jBBUv');
        const valueCotacao = arquivoNode.querySelector('span.IsqQVc');

        //interaction.user.send(`A cotação da ${cotacaoName} é ${valueCotacao} subindo ${numberCotacao}`)

        //await interaction.editReply('Te respondi na DM')

        await interaction.editReply('Comando em manutenção')
    } catch(error) {
        await interaction.editReply('Xiii, deu erro ao buscar')
    }   

}