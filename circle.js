#!/usr/bin/env node

const bot = require("circle-github-bot").create();
console.log(`
<h3>${bot.env.commitMessage}</h3>
Download theme: <strong>${bot.artifactLink('konversion-theme.zip', 'konversion-theme.zip')}</strong>
`);
bot.comment(`
<h3>${bot.env.commitMessage}</h3>
Download theme: <strong>${bot.artifactLink('konversion-theme.zip', 'konversion-theme.zip')}</strong>
`);