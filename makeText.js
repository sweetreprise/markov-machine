/** Command-line tool to generate Markov text. */

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const markov = require('./markov');

// instantiates a new
function createText(text){
    let newText = new markov.MarkovMachine(text);
    console.log(newText.makeText());
}

// reads a file and creates markov text from it
async function getText(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path}`, err);
            process.exit(1);
        } else {
            console.log('HERE IS THE DATA...');
            createText(data);
        }
    });
}

// reads URL and creates markov text from it
async function getURLText(url){
    axios.get(url).then(res => {
        console.log('HERE IS THE DATA...');
        createText(res.data);
    })
    .catch(err => {
        console.log(`ERROR fetching from ${url}`)
    });
}

// figures out which function to use based on method
let [method, path] = process.argv.slice(2);

if (method === 'file'){
    getText(path);
} else if (method === 'url'){
    getURLText(path);
} else {
    console.log(`Error: ${method} is not allowed. The only methods allowed are 'file' and 'url'.`);
    process.exit(1);
}



