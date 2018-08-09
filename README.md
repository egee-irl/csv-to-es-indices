# csv-to-es-indices
A little script that takes csv data and stuffs it into an ElasticSearch index.

## What even is this?
It's a simple(ish) little script written in TypeScript on NodeJS that parses a single csv file, creates an index in Elastic Search, and loads each line from the CSV file into ElasticSearch under aforementioned index.

## Does it create or setup ElasticSearch for you?
No. The ElasticSearch cluster must exist and be available to the host machine before this script is run.

## Can this script parse multiple CSV files?
No. This script is limited to a single CSV file. However it could be run under multiple processes, for example on a dedicated CD machine.

## Why TypeScript?
Because TypeScript is awesome and ElasticSearch has bindings for it out of the box.

## How do I run the script?
Follow these steps:

0. Clone this repository
1. Install NodeJS, Npm, and TypeScript
2. Do `npm install` in the repo directory
3. Run `npm run-script build`
4. Download a compatible csv file. Any one of [these](http://stat-computing.org/dataexpo/2009/the-data.html) files should work good...
5. Update the `config.json` file to match your ElasticSearch cluster and the path to your csv file.
6. Run `npm start` and watch the script go!
