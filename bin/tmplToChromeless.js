#!/usr/bin/env node

let fs = require('fs');
let os = require('os');
let program = require('commander');
let pkg = require('../package');
let tmplValue = undefined;

program
    .version(pkg.version)
    .description(pkg.description)
    .arguments('<file.chromeless.tmpl> [args...]')
    .action(function(file){
        tmplValue = file;
    });
program.parse(process.argv);
if (typeof tmplValue === 'undefined') {
    program.help();
    process.exit(1);
}

const converted = fs.readFileSync(tmplValue,'utf8')
    .split(os.EOL)
    .map(line => {
    for(let i = 0 ; program.args[1].length > i ; i++){
        line = line
            .replace(`<$${i+1}>`,program.args[1][i]);
    }
    return line;
}).join(os.EOL);
console.log(converted.slice(0,-1));
