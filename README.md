# @kazesolo/scraped

> A very simple nodejs programming language that can make it easier to scrape websites.


## :cloud: Installation

```sh
# Using npm
npm install --save @kazesolo/scraped

# Using yarn
yarn add @kazesolo/scraped
```


## FAQ


Here are some frequent questions and their answers.

### 1. How to parse scrape pages?


`@kazesolo/scraped` has only a simple request module for making requests. That means you cannot directly parse ajax pages with it, but in general you will have those scenarios:


 1. **The ajax response is in JSON format.** In this case, you can make the request directly, without needing a scraping library.
 2. **The ajax response gives you HTML back.** Instead of calling the main website (e.g. example.com), pass to `@kazesolo/scraped` the ajax url (e.g. `example.com/api/that-endpoint`) and you will you will be able to parse the response
 3. **The ajax request is so complicated that you don't want to reverse-engineer it.** In this case, use a headless browser (e.g. Google Chrome, Electron, PhantomJS) to load the content and then use the `.scrapeHTML` method from scrape it once you get the HTML loaded on the page.

### 2. Crawling


There is no fancy way to crawl pages with `@kazesolo/scraped`. For simple scenarios, you can parse the list of urls from the initial page and then, using Promises, parse each page. Also, you can use a different crawler to download the website and then use the `.scrapeHTML` method to scrape the local files.

### 3. Local files


Use the `.scrapeHTML` to parse the HTML read from the local files using `fs.readFile`.








## :clipboard: Example



```js
const scraped = require("@kazesolo/scraped")

// Promise interface
scraped(Your_Url {
    title: ".header h1"
  , desc: ".header h2"
  , avatar: {
        selector: ".header img"
      , attr: "src"
    }
}).then(({ data, status }) => {
    console.log(`Status Code: ${status}`)
    console.log(data)
});


// Async-Await
(async () => {
    const { data } = await scraped(Your_Url, {
        // Fetch the articles
        articles: {
            listItem: ".article"
          , data: {

                // Get the article date and convert it into a Date object
                createdAt: {
                    selector: ".date"
                  , convert: x => new Date(x)
                }

                // Get the title
              , title: "a.article-title"

                // Nested list
              , tags: {
                    listItem: ".tags > span"
                }

                // Get the content
              , content: {
                    selector: ".article-content"
                  , how: "html"
                }

                // Get attribute value of root listItem by omitting the selector
              , classes: {
                    attr: "class"
                }
            }
        }

        // Fetch the blog pages
      , pages: {
            listItem: "li.page"
          , name: "pages"
          , data: {
                title: "a"
              , url: {
                    selector: "a"
                  , attr: "href"
                }
            }
        }

        // Fetch some other data from the page
      , title: ".header h1"
      , desc: ".header h2"
      , avatar: {
            selector: ".header img"
          , attr: "src"
        }
    })
    console.log(data)
    
    // output
    // { articles:
    //    [ { title: '',
    //        tags: [Object],
    //        content: '',
    //        classes: [Object] },
    //      { title: '',
    //        tags: [Object],
    //        content: '<p>Playing computer games is a lot of fun. ...',
    //        classes: [Object] }],
    //   pages:
    //    [ { title: 'Blog', url: '/' },
    //      { title: 'About', url: '/about' }]
    //   title: '',
    //   desc: ',
    //   avatar: 'example.png' }
})()
```











## :question: Get Help

There are few ways to get help:



 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:





## :memo: Documentation


### `scraped(url, opts, cb)`
A scraping module for humans.

#### Params

- **String|Object** `url`: The page url or request options.
- **Object** `opts`: The options passed to `scrapeHTML` method.
- **Function** `cb`: The callback function.

#### Return
- **Promise** A promise object resolving with:
  - `data` (Object): The scraped data.
  - `$` (Function): The Cheeerio function. This may be handy to do some other manipulation on the DOM, if needed.
  - `response` (Object): The response object.
  - `body` (String): The raw body as a string.

### `scraped.scrapeHTML($, opts)`
Scrapes the data in the provided element.

For the format of the selector, please refer to the [Selectors section of the Cheerio library](https://github.com/cheeriojs/cheerio#-selector-context-root-)

#### Params

- **Cheerio** `$`: The input element.
- **Object** `opts`: An object containing the scraping information.
  If you want to scrape a list, you have to use the `listItem` selector:

   - `listItem` (String): The list item selector.
   - `data` (Object): The fields to include in the list objects:
      - `<fieldName>` (Object|String): The selector or an object containing:
         - `selector` (String): The selector.
         - `convert` (Function): An optional function to change the value.
         - `how` (Function|String): A function or function name to access the
           value.
         - `attr` (String): If provided, the value will be taken based on
           the attribute name.
         - `trim` (Boolean): If `false`, the value will *not* be trimmed
           (default: `true`).
         - `closest` (String): If provided, returns the first ancestor of
           the given element.
         - `eq` (Number): If provided, it will select the *nth* element.
         - `texteq` (Number): If provided, it will select the *nth* direct text child.
           Deep text child selection is not possible yet.
           Overwrites the `how` key.
         - `listItem` (Object): An object, keeping the recursive schema of
           the `listItem` object. This can be used to create nested lists.

  **Example**:
  ```js
  {
     articles: {
         listItem: ".article"
       , data: {
             createdAt: {
                 selector: ".date"
               , convert: x => new Date(x)
             }
           , title: "a.article-title"
           , tags: {
                 listItem: ".tags > span"
             }
           , content: {
                 selector: ".article-content"
               , how: "html"
             }
           , traverseOtherNode: {
                 selector: ".upperNode"
               , closest: "div"
               , convert: x => x.length
             }
         }
     }
  }
  ```

  If you want to collect specific data from the page, just use the same
  schema used for the `data` field.

  **Example**:
  ```js
  {
       title: ".header h1"
     , desc: ".header h2"
     , avatar: {
           selector: ".header img"
         , attr: "src"
       }
  }
  ```

#### Return
- **Object** The scraped data.












## :sparkling_heart: Support my projects
I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).





## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

- Stalk Twitter https://github.com/KazeDevID/scraped/blob/main/example/twitter.js
