const http = require('http'); //* To create Server
const fs = require('fs'); //* File System
var requests = require('requests'); //*For Routing

// * Reading the home.html file with fs (file System)
const homeFile = fs.readFileSync('home.html', 'utf8');

//* tempVal= homeFile, orgVal=values of the API
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace('{%tempval%}', orgVal.main.temp);
    temperature = temperature.replace('{%tempmin%}', orgVal.main.temp_min);
    temperature = temperature.replace('{%tempmax%}', orgVal.main.temp_max);
    temperature = temperature.replace('{%location%}', orgVal.name);
    temperature = temperature.replace('{%country%}', orgVal.sys.country);
    temperature = temperature.replace('{%tempstatus%}', orgVal.weather[0].main);
    return temperature;
};

// * Creating a Server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        //* Requesting the API will provide with the Stream of data 
        requests('http://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=f8f14d9833d1d35901df0b2bdd3f24a5')
            .on('data', (chunk) => {    //* data is an event fired when data is available to read
                const objData = JSON.parse(chunk);  //*converting JSON data to Objects by Parsing
                const arrData = [objData];  //* Passing the object to an array, resulting 'array of objects'
                const realTimeData = arrData.map((val) => replaceVal(homeFile, val)).join("");  //* join is used to convert array to string
                //* overriding the contents of home.html with realTimeData
                res.write(realTimeData);
            })
            .on('end', (err) => {   //* end is an event fired when there is no more data to read
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }
    else {
        res.end('File not Found!')
    }
});

//* Listening the server at port 8000. 127.0.0.1 is the localhost
// server.listen(8000,'127.0.0.1');
// server.listen(8000);
//* This command is for heroku/ deployment  
server.listen(process.env.PORT);