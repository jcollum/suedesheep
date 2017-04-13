const validator = require('validate.js');
const Promise = require('bluebird');
const request = require('request-promise');


const parseWebsite = url => {
  return new Promise((resolve, reject) => {
    request({
      method: 'GET',
      uri: url
    })
      .then(result => {
        resolve({ url, result });
      })
      .catch(err => {
        resolve({ url, failed: true, error: err });
      });
  });
};

const isValidUrl = url => {
  return !validator({ website: url }, { website: { url: true } });
};

const validateAndVerify = urls => {
  return new Promise((resolve, reject) => {
    const validUrls = [];
    const failedUrls = [];
    const passedUrls = [];
    const promises = [];
    for (url of urls) {
      if (isValidUrl(url)) {
        validUrls.push(url);
      } else {
        failedUrls.push({ url, error: 'Invalid url.' });
      }
    }

    Promise.map(
      validUrls,
      url => {
        return parseWebsite(url);
      },
      { concurrency: 5 }
    )
      .then(results => {
        for (item of results) {
          // TODO: is a 3xx code valid?
          if (item.result) {
            passedUrls.push({ url: item.url });
          } else if (item.failed) {
            failedUrls.push({ url: item.url, error: item.error.message });
          }
        }
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      })
      .finally(() => {
        resolve({ passed: passedUrls, failed: failedUrls });
      });
  });
};

module.exports = { validateAndVerify, isValidUrl, parseWebsite };
