#!/usr/bin/env node

const bot = require("circle-github-bot").create();


console.log(`
Built for: ${bot.env.commitMessage} \n
Download theme: ${bot.artifactLink('dist/konversion-theme.zip', 'konversion-theme.zip')}
`);
bot.comment(`
<h4>${bot.env.commitMessage}</h4>
Download theme: <strong>${bot.artifactLink('dist/konversion-theme.zip', 'konversion-theme.zip')}</strong>
`);

//https://27-81215894-gh.circle-artifacts.com/0/tmp/circle-artifacts.llsqx1o/konversion-theme.zip
//https://27-81215894-gh.circle-artifacts.com/0/home/ubuntu/theme_konversion/konversion-theme.zip