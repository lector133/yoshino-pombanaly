const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const arrayServers = process.env.GUILDID.split(',');

const commandsWithDescription = [
	new SlashCommandBuilder().setName('info').setDescription('Informação sobre mim!'),
	new SlashCommandBuilder().setName('irmas').setDescription('Amo as irmãs!'),
	new SlashCommandBuilder().setName('beijo').setDescription('Beija alguém').addMentionableOption(user => user.setName('menção').setDescription('informe um usuário').setRequired(true)),
	new SlashCommandBuilder().setName('cotacao').setDescription('Mostra a cotação atual').addStringOption(cotacao => cotacao.setName('cotacao').setDescription('informe a empresa').setRequired(true))
]
	.map(command => command.toJSON()); 

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

for(let c = 0; c < arrayServers.length; c++) {
	rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, arrayServers[c]), { body: commandsWithDescription })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
}