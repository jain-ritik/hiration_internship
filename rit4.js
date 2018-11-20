const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
const obj = {
		table:[]
		};
// Write Headers
//writeStream.write(`Title\n`);

request('https://stackoverflow.com/jobs', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('.-job-summary').each((i, el) => {
      const title = $(el)
        .find('.-title')
        .text()
        .replace(/\s\s+/g, '');
console.log(title);
const l = $(el)
      .find('.fc-black-500')
      .text()
      .replace(/\s\s+/g, '');
console.log(l);  
obj.table.push({"name": title, "details": l});
console.log('\n');          
      // Write Row To CSV
    //  writeStream.write(`${title}, ${link}, ${date} \n`);
//writeStream.write(`${title}\n`);
    });
    console.log('Scraping Done...');
    const json = JSON.stringify(obj);
    fs.writeFile('myjsonfile.json', json, 'utf8');
  }
});
