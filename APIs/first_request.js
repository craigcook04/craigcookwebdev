var request = require('request');
request('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition.text%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22dallas%2C%20tx%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body) {
    if(!error && response.statusCode == 200) { // 200 OK status codenod
        var parsedData = JSON.parse(body);
        console.log(parsedData['query']['results']['channel']); // Show the HTML for requested web page
    }
});