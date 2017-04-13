## suedesheep

### Validator

From the command line, pass in a list of urls to validate:

```
$ node validate.js "https://www.google.com" "hts://www.google.com"  "https://alksdjf.google.com"
{ passed: [ { url: 'https://www.google.com' } ],
  failed:
   [ { url: 'hts://www.google.com', error: 'Invalid url.' },
     { url: 'https://alksdjf.google.com',
       error: 'Error: getaddrinfo ENOTFOUND alksdjf.google.com alksdjf.google.com:443' } ] }
```

To import and use in code:

```
const { validateAndVerify } = require('./validator');
validateAndVerify(inputs)
  .then( ...
...
```

**Could the function be improved if the same list of links is being passed in many times, and what are the tradeoffs?**

Yes, add in a redis layer for storage and store the results and add in a config for expiration time. You'd also want to check for duplicates in the list (lodash uniq function)

**How might the function be written to process arbitrarily long lists of links?**

I think the code I've provided does this already since it's using Bluebird's map with concurrency to throttle the number of reqs that are "in flight" at any time. It should have no problem processing thousands of urls but the total time to finish could be a problem when accessing this function via HTTP with a load balancer in play. A request/response queue pair would solve that.


**How might this function be exposed as an HTTP API to be used by a front-end application?**

Pretty simple, create a Hapi.js API with a GET route like `/validate/{url}` (url would need to be url encoded),  `require('./validator');` then run validateAndVerify on the decoded url. There's a tiny issue with combined url length there but that's quite an edge case.
