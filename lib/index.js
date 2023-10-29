"use strict";

var req = require("cheerio-req"),
    typpy = require("typpy"),
    scrapeHTML = require("scraped-core");


async function scraped(url, opts) {
    var res = await req(url);
    var scrapedData = scraped.scrapeHTML(res.$, opts);
    return Object.assign(res, {
        data: scrapedData,
        body: res.data
    });
}

scraped.scrapeHTML = scrapeHTML;

module.exports = scraped;