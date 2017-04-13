import { validate } from 'node_modules/validate.js/validate.js';
const http = require('http');
const cheerio = require('cheerio');
const corsProxy = 'https://cors-anywhere.herokuapp.com/';

export const isValidUrl = url => {
  return !validate({ website: url }, { website: { url: true } });
};

export const getLinks = url => {
  return new Promise((resolve, reject) => {
    fetch(corsProxy + url)
      .then(res => {
        if (res.status != 200) {
          return reject(
            new Error(`Failed to load, statusCode: ${res.statusCode}`)
          );
        } else {
          return res.text();
        }
      })
      .then(body => {
        let $ = cheerio.load(body);
        let hyperlinks = $('a').slice(0,10); //jquery get all hyperlinks
        let textLinks = $(hyperlinks).map(function(i, link) {
          return {
            href: ($(link).attr('href') || '').trim(),
            text: ($(link).text() || '(no text)').trim()
          };
        });
        return resolve(textLinks);
      })
      .catch(err => {
        reject(new Error(`Failed to load, error: ${err}`));
      });
  });
};
