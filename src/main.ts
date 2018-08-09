import * as elasticsearch from "elasticsearch";
import * as fs from "fs";
import csv from "fast-csv";

const stream = fs.createReadStream("1987.csv");
const client = new elasticsearch.Client({
  host: "https://search-eg-cluster-44ixoq4bigmmkxfr6akgx2qe3m.us-west-2.es.amazonaws.com/",
  log: "trace"
});

const exists = client.exists({
  index: "helloworld",
  type: "thing",
  id: "1"
}).then((r: any) => {
  if (r == false) {
    client.indices.create({
      "index": "helloworld"
    });
  }
});

// const csvStream = csv({
//   headers: true,
//   ignoreEmpty: true
// }).on("data", function(data: any) {
//   client.index({
//     index: "helloworld",
//     type: "thing",
//     body: {
//       data
//     }
//   }).catch((r: any) => {
//     console.log(r);
//   });
// })
// .on("end", function() {
//       console.log("All Finished! 😄");
// });

