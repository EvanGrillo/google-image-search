const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const mimeTypes = require('./mappings/mimeTypes.js');
const port = process.env.PORT || 3000;

const server = http.createServer(async function(){});

server.on('request', async (request, response) => {

    const { headers, method, url } = request;

    var filePath = '.' + url;
    if (filePath == './') {
        filePath = './public/index.html';
    }

    if (method === 'GET' && filePath.includes('./api')) {

        console.log(url);

        // let search = [];
        let search = url.match(/search=([^&]+)/)[1];

        try {

            console.log('search:', search);
            let page_source = await query_google(search);
            console.log('page source:', page_source);
            response.end(page_source);

        } catch (err) {

            console.log('error:', err);
            response.end();

        }

        
    } else {

        var extname = String(path.extname(filePath)).toLowerCase();

        // map mimeType by file extension
        var contentType = mimeTypes[extname] || 'application/octet-stream';

        console.log('content type', contentType);
        
        fs.readFile(filePath, function (error, content) {

            if (error) {

                console.log(error);
                
                if(error.code == 'ENOENT' || 'EISDIR') {
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(404, { 'Content-Type': 'text/html' });
                        response.end(content, 'utf-8');
                    });
                } else {
                    response.writeHead();
                    response.end(error.code);
                }

            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }

        });
        
    }
});
    
server.listen(port);

async function query_google(search) {

    try {

        let browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        let page = await browser.newPage();
        if (page) {
            console.log('page ready');
        }
        await page.goto(`https://www.google.com/search?q=${search}&tbm=isch`, {
            waitUntil: 'networkidle0',
        });

        let page_source = await page.content();

        browser.close();

        return page_source;
        
    } catch (err) {
        return err;
    }
    
}

console.log(`Server running at http://localhost:${port}/`);
