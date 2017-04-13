// for a list of input urls (from command line), confirm that they are valid then
// run an HTTP HEAD call to make sure the server is listening on the other side
const { validateAndVerify } = require('./validator');
const inputs = process.argv.slice(2);

if (inputs.length == 0) {
  console.log('Failed, no inputs.');
  process.exit(1);
}

validateAndVerify(inputs)
  .then(results => {
    console.dir(results);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
  });
