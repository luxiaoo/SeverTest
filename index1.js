var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(request,response){
    var params = url.parse(request.url, true).query;
    var name = params.name;
    var post = '';
    console.log(name);
    if(request.url.indexOf('/1.html')!==-1){
        if(request.method = 'GET'){
            fs.readFile('1.html', function (err, data) {
                if (err) {
                    return console.error(err);
                }
                var data2 = data.toString().replace("name",name);
                console.log(name);
                console.log( data2);
                if (data2!==undefined){
                    response.end(data2);
                }else {
                    response.end(data.toString());
                }

            });

        }else if(request.method == 'POST'){
            request.on('data', function(chunk){
                post += chunk;
            });
            post = querystring.parse(post);


        }

    }








}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/1.html');
