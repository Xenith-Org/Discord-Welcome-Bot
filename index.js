const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config');
const { Client, GatewayIntentBits } = require('discord.js');
const canvafy = require("canvafy");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] })

const commands = [{
  name: 'ping',
  description: 'Check the bot\'s ping',
}];

const rest = new REST({ version: '9' }).setToken(config.Botconfig.token);

client.on('ready', () => {
  console.clear();
  console.log('\x1b[34m%s\x1b[0m', `Logged in as ${client.user.tag}`);

  // Register the slash commands
  (async () => {
    try {
      await rest.put(
        Routes.applicationGuildCommands(config.Botconfig.clientid, config.Botconfig.guildid),
        { body: commands },
      );
      console.log('\x1b[36m%s\x1b[0m', 'Slash commands registered successfully!');
      console.log('\x1b[31m%s\x1b[0m', `A discord welcome bot by`);
      console.log('\x1b[31m%s\x1b[0m', ` 
      ╔═══╗                 ╔╗  ╔╗╔════╗
      ║╔═╗║                 ║╚╗╔╝║║╔╗╔╗║
    ╔╗║╚═╝║╔╗╔╗╔══╗╔══╗╔╗ ╔╗╚╗╚╝╔╝╚╝║║╚╝
    ╠╣║╔══╝║║║║║╔╗║║╔╗║║║ ║║ ╚╗╔╝   ║║  
    ║║║║   ║╚╝║║╚╝║║╚╝║║╚═╝║  ║║   ╔╝╚╗ 
    ╚╝╚╝   ╚══╝║╔═╝║╔═╝╚═╗╔╝  ╚╝   ╚══╝ 
               ║║  ║║  ╔═╝║             
               ╚╝  ╚╝  ╚══╝             
    `);
    } catch (error) {
      console.error(error);
    }
  })();


  // Set the bot's presence
  client.user.setPresence({
    activities: [{ name: config.Presence.activity, type: config.Presence.type }],
    status: config.Presence.status.toLowerCase(),
  });

});

client.on("guildMemberAdd", async member => {
  const welcome = await new canvafy.WelcomeLeave()
    .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
    .setBackground("image", config.Image.background)
    .setTitle(member.user.tag, config.Image.titlemessagecolor)
    .setDescription(config.Image.description, config.Image.descriptioncolor)
    .setBorder(config.Image.bordercolor)
    .setAvatarBorder(config.Image.avatarbordercolor)
    .setOverlayOpacity(config.Image.overlayopacity)
    .build();

  const guildname = member.guild.name;
  const welcomeMessage = `Welcome to ${guildname} <@${member.id}>`;
  member.guild.channels.cache.get(config.Botconfig.channelid).send({
    content: welcomeMessage,
    files: [{
      attachment: welcome,
      name: `welcome-${member.id}.png`
    }]
  })
    .catch(console.error);
});


client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'ping') {
    const ping = client.ws.ping;
    const uptime = formatUptime(client.uptime);
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    const numServers = client.guilds.cache.size;
    const numUsers = client.users.cache.size;
    const apiLatency = client.ws.ping;
    const discordJSVersion = require('discord.js').version;
    const nodeVersion = process.version;
    const version = require('./package.json').version;

    const githubbutton = new ButtonBuilder()
      .setLabel('GitHub Repository')
      .setURL('https://github.com/Xenith-Org/Discord-Welcome-Bot')
      .setStyle(ButtonStyle.Link);

    const developerbutton = new ButtonBuilder()
      .setLabel('Developer')
      .setURL('https://github.com/ipuppyyt')
      .setStyle(ButtonStyle.Link);

    const pingembed = {
      color: 0x0099ff,
      author: {
        name: client.user.username + ' Stats',
        icon_url: client.user.avatarURL(),
        url: 'https://github.com/Xenith-Org/Discord-Welcome-Bot',
      },
      fields: [
        {
          name: ':ping_pong: Ping',
          value: `┕ ${ping} ms`,
          inline: true,
        },
        {
          name: ':clock1: Uptime',
          value: '┕ ' + uptime,
          inline: true,
        },
        {
          name: ':file_cabinet: Memory',
          value: `┕ ${Math.round(memoryUsage * 100) / 100} MB`,
          inline: true,
        },
        {
          name: ':desktop: Servers',
          value: `┕ ${numServers}`,
          inline: true,
        },
        {
          name: ':busts_in_silhouette: Users',
          value: `┕ ${numUsers}`,
          inline: true,
        },
        {
          name: ':satellite: API Latency',
          value: `┕ ${apiLatency} ms`,
          inline: true,
        },
        {
          name: ':robot: Version',
          value: `┕ v${version}`,
          inline: true,
        },
        {
          name: ':blue_book: Discord.js',
          value: `┕ v${discordJSVersion}`,
          inline: true,
        },
        {
          name: ':green_book: Node.js',
          value: `┕ ${nodeVersion}`,
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: "Requested by " + interaction.user.tag,
        icon_url: interaction.user.avatarURL(),
      },
    };

    interaction.reply({ embeds: [pingembed], components: [new ActionRowBuilder().addComponents(githubbutton).addComponents(developerbutton) ] });

  }
});




//login to the bot
if (config.token == "") {
  console.log(`\x1b[31m%s\x1b[0m`, "Please enter a bot token in the config.json file");
  process.exit(1);
}
else {
  client.login(config.Botconfig.token);
}

function formatUptime(uptime) {
  const totalSeconds = Math.floor(uptime / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
  const seconds = Math.floor(((totalSeconds % 86400) % 3600) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}