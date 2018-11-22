const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
const obj = {
        table:[]
        };


var name;
var name1;
var name2;
var A,B,C;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question(`enter city name?`, (name) => {
readline.close()
A=name;
 sam();
})
const sam = function(){
const readline1 = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline1.question(`enter state name?`, (name1) => {
 B=name1;
readline1.close()
 dep();
})}
const dep = function(){
const readline2 = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline2.question(`enter country name?`, (name2) => {
C=name2;
readline2.close()
rit()
})}
// Write Headers
//writeStream.write(`Title\n`);
const rit = function(){
request(`https://stackoverflow.com/jobs?l=${A}%2C+${B}%2C+${C}&d=20&u=Km`, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('.-job-summary').each((i, el) => {
      const title = $(el)
        .find('.-title')
        .text()
        .replace(/\s\s+/g, '');
//console.log(title);
const l = $(el)
      .find('.fc-black-500')
      .text()
      .replace(/\s\s+/g, '');
//console.log(l); 
obj.table.push({"name": title, "details": l});
//console.log('\n');         
      // Write Row To CSV
    //  writeStream.write(`${title}, ${link}, ${date} \n`);
//writeStream.write(`${title}\n`);
    });
   // console.log('Scraping Done...');
    const json = JSON.stringify(obj);
console.log(obj);
    fs.writeFile('myjsonfile.json', json, 'utf8');
  }
});}
