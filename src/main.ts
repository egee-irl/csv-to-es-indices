import * as elasticsearch from "elasticsearch";
import * as fs from "fs";
import csv from "fast-csv";

const index_name = "helloworld";
const type_name = "thing";
const csv_path = "1987.csv";

const client = new elasticsearch.Client({
  host: "https://search-eg-cluster-44ixoq4bigmmkxfr6akgx2qe3m.us-west-2.es.amazonaws.com/",
  log: "trace"
});

client.exists({
  index: index_name,
  type: type_name,
  id: "1"
}).then((r: any) => {
  if (r == false) {
    client.indices.create({
      "index": index_name
    }).catch((r) => {
      console.log("Something went terribly wrong 😢" + r);
    });
  }
});

const stream = fs.createReadStream(csv_path);
const csvStream = csv({
  headers: true,
  ignoreEmpty: true
}).on("data", function(data: any) {
  client.index({
    index: index_name,
    type: type_name,
    body: {
      data
    }
  }).catch((r: any) => {
    console.log(r);
  });
})
.on("end", function() {
      console.log("All Finished! 😄");
});

stream.pipe(csvStream);
