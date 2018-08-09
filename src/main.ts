let elasticsearch = require("elasticsearch");
let fs = require("fs");
let csv = require("fast-csv");

let stream = fs.createReadStream("1987.csv");
let client = new elasticsearch.Client({
  host: "https://search-eg-cluster-44ixoq4bigmmkxfr6akgx2qe3m.us-west-2.es.amazonaws.com/",
  log: "trace"
});

let csvStream = csv({
  headers: true,
  ignoreEmpty: true
})
    .on("data", function(data: any) {
      client.index({
        index: "helloworld",
        type: "thing",
        body: {
          data
        }
      }).catch((r: any) => {
        console.log(r);
      });
    })
    .on("end", function() {
         console.log("done");
    });

stream.pipe(csvStream);

// data = {
//   "LOL!": "uhh",
//   "another": 123
// }

// client.index({
//   index: "helloworld",
//   type: "thing",
//   body: {
//     data
//   }
// }).catch((r) => {
//   console.log(r)
// })

// client.indices.create({
//   "index": "helloworld"
// })

// client.ping({
//     // ping usually has a 3000ms timeout
//     requestTimeout: 1000
//   }, function (error) {
//     if (error) {
//       console.trace('elasticsearch cluster is down!');
//     } else {
//       console.log('All is well');
//     }
//   });

// const response = client.search({
//   index: 'twitter',
//   type: 'tweets',
//   body: {
//     query: {
//       match: {
//         body: 'elasticsearch'
//       }
//     }
//   }
// }).then( () => {
//   for (const tweet of response.hits.hits) {
//     console.log('tweet:', tweet);
//   }
// })
