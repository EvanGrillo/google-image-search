# google-image-search

### Demo

URL: https://glacial-chamber-56411.herokuapp.com/

### Dependencies

- Puppeteer

### Building / Running

```npm install``` and ```npm start```

### About

A simple Google image search scraper that accepts a search phrase input, runs a query and parses image URLs from a page source string. 

This app is similar to the projects that I completed while at Northwestern University, although it only requires Puppeteer and it took me ~1 hour to complete from start to finish. 

Despite its simplicity, I experienced two issues when deploying the app via Heroku:

1. The use of Async/Await with Node v14 required a minor change from the version that works in my local environment
2. My Heroku account was suspended and all of my sites were taken offline. After being locked out of my account for a week, a rep from Salesforce finally replied explaining that, "...an over-zealous anti-abuse rule suspended [my] account in error..."
