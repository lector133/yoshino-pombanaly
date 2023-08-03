const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
const pidusage = require('pidusage');

//na pasta api é aonde se encontra o axios, é usado pra enviar informações pra outro local ou acessar determinada pegina
const api = require('./service/api')

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

require('./deploy-command');

client.on('ready', async message => {
	const attenaly = await api.get('https://twitch.tv/attenaly').catch(error => {
		console.log('Falha ao acessar a twitch');
		return;
	});

	if(attenaly.status != 200) {
		console.log('Ocorreu um erro ao acessar esse canal');
	}

	console.log(attenaly);

	setInterval(() => {
		client.user.setActivity('https://twitch.tv/attenaly', { type: 'STREAMING', name: 'https://twitch.tv/attenaly' });
	}, 3600000)

	//desomenta isso só se for usar (obs: muda o '1067062177539833866' com o id do canal do discord e o 
	//'1094834592931917924' pra mudar o id da mensagem que seu bot ja mandou nesse canal; caso seu bot não tenha mandado uma mensagem nesse canal, vai dar erro)

	// setInterval(async () => {

	// 	pidusage(process.pid, (err, stats) => {
	// 		if (err) throw err;

	// 		const cpu = stats.cpu;
	// 		const used = stats.memory / 1024 / 1024
	// 		const memoryUsageInMB = (process.memoryUsage().rss - process.memoryUsage().heapTotal) / (1024 * 1024);

	// 		message.channels.cache.get('1067062177539833866').messages.fetch('1094834592931917924').then((msg) => {
	// 			msg.edit({ embeds: [new MessageEmbed({ description: `**\`Status no servidor\`**\nCPU: \`${cpu.toFixed(2) || "0"} %\`\nRAM: \`${used.toFixed(2) || 0} MB\`\nIO: \`${memoryUsageInMB.toFixed(2) || 0} MB\`` }).setColor("#3577FF")] })
	// 		});

	// 		console.log(`Uso de CPU: ${stats.cpu}%, Uso de memória: ${stats.memory / 1024 / 1024} MB`);
	// 	});

	// }, 5000)


	let commandGlobal = client.application.commands;

	commandGlobal.create({
		name: 'beijo',
		description: 'Beija alguém',
	})
})

//na pasta commands existem alguns comandos prontos, usa de base pra criar outros


//slash commands (comandos de barra (/) discord)
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	try {
		const commandFile = require(`./modules/${commandName}.js`);
		commandFile.run(interaction);
	} catch (error) {
		console.log(error);
	}
});

client.login(process.env.TOKEN);