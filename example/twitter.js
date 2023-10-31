"use strict"

const scraped = require("../lib")

const username = ""//Your username 

// Scrape profile
scraped(`https://twitter.com/${username}`, {
    name: ".ProfileHeaderCard-nameLink"
  , bio: ".ProfileHeaderCard-bio"
}).then(({ data }) => console.log(data)).catch(console.error)
// Output 
// { name: '',
//   bio: '' }
