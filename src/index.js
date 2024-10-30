const os = require('os');
const chalk = require('chalk');
const gradient = require('gradient-string');
const catwomanArt = require('./ascii-art');
const facts = require('./facts');

function getSystemInfo() {
    return {
        hostname: os.hostname(),
        platform: os.platform(),
        release: os.release(),
        cpus: os.cpus()[0].model,
        memory: `${Math.round(os.totalmem() / (1024 * 1024 * 1024))} GB`,
        uptime: `${Math.floor(os.uptime() / 3600)} hours`,
        shell: process.env.SHELL || 'Unknown',
        username: os.userInfo().username,
        arch: os.arch(),
        cores: os.cpus().length
    };
}

function getRandomFact() {
    return facts[Math.floor(Math.random() * facts.length)];
}

function padRight(str, len) {
    return str.padEnd(len);
}

function displayInfo() {
    const info = getSystemInfo();
    const randomFact = getRandomFact();
    const artLines = catwomanArt.split('\n');
    
    console.clear();
    
    console.log(gradient.pastel.multiline('='.repeat(120)));
    console.log(gradient.rainbow(`\n🐱 Welcome ${info.username}! Let's explore your system... 🐱\n`));
    
    const infoLines = [
        '',
        chalk.cyan.bold('System Information:'),
        '',
        `${chalk.blue('→')} ${chalk.blue.bold('Host:')}      ${chalk.green(info.hostname)}`,
        `${chalk.blue('→')} ${chalk.blue.bold('OS:')}        ${chalk.green(info.platform)} (${info.arch})`,
        `${chalk.blue('→')} ${chalk.blue.bold('Kernel:')}    ${chalk.green(info.release)}`,
        `${chalk.blue('→')} ${chalk.blue.bold('CPU:')}       ${chalk.green(info.cpus)}`,
        `${chalk.blue('→')} ${chalk.blue.bold('Cores:')}     ${chalk.green(info.cores)}`,
        `${chalk.blue('→')} ${chalk.blue.bold('Memory:')}    ${chalk.green(info.memory)}`,
        `${chalk.blue('→')} ${chalk.blue.bold('Uptime:')}    ${chalk.green(info.uptime)}`,
        `${chalk.blue('→')} ${chalk.blue.bold('Shell:')}     ${chalk.green(info.shell)}`,
        '',
        chalk.magenta('😺 ') + chalk.magenta.bold('Did you know?'),
        chalk.yellow(randomFact)
    ];

    const artWidth = Math.max(...artLines.map(line => line.length));
    
    const maxLines = Math.max(artLines.length, infoLines.length);
    for (let i = 0; i < maxLines; i++) {
        const artLine = i < artLines.length ? artLines[i] : '';
        const infoLine = i < infoLines.length ? infoLines[i] : '';
        console.log(`${padRight(artLine, artWidth + 4)}${infoLine}`);
    }

    console.log('\n' + gradient.pastel.multiline('='.repeat(120)) + '\n');
}

module.exports = displayInfo;

if (require.main === module) {
    displayInfo();
}