import { validate } from 'node_modules/validate.js/validate.js';
const http = require('http');
const cheerio = require('cheerio');
const corsProxy = 'https://cors-anywhere.herokuapp.com/';

export const isValidUrl = url => {
  // use validate library to determine if url is valid
  return !validate({ website: url }, { website: { url: true } });
};

// returns array of {index: , href: , text: }
export const getLinks = url => {
/*
for a given url, pull the html via proxy (to avoid CORS rejections), then return
an array of all hyperlinks on the page
*/

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
        let hyperlinks = $('a'); // get all hyperlinks
        let textLinks = $(hyperlinks).map(function(i, link) {
          return {
            index: i,
            href: ($(link).attr('href') || '').trim(),
            text: ($(link).text() || '(no text)').trim()
          };
        });
        return resolve(textLinks.toArray());
      })
      .catch(err => {
        reject(new Error(`Failed to load, error: ${err}`));
      });
  });
};
