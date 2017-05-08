#!/usr/bin/env node

const bot = require("circle-github-bot").create();

// const build_no = process.env['CIRCLE_BUILD_NUM'];
const build_url = process.env['CIRCLE_BUILD_URL'];
const path = process.env['CIRCLE_ARTIFACTS'];


const url = `${build_url}/${path}`;

console.log(`
Built for: ${bot.env.commitMessage} \n
Download theme: ${bot.artifactLink('dist/konversion-theme.zip', 'konversion-theme.zip')}
or: ${url}
`);
bot.comment(`
<h4>${bot.env.commitMessage}</h4>
Download theme: <strong><a href="${url}">konversion-theme.zip</a></strong>
`);

//https://27-81215894-gh.circle-artifacts.com/0/tmp/circle-artifacts.llsqx1o/konversion-theme.zip
//https://27-81215894-gh.circle-artifacts.com/0/home/ubuntu/theme_konversion/konversion-theme.zip