var http = require('http');
//导入文件模块
var fs = require('fs');
//导入路径模块
var path = require('path');
//导入url模块
var url = require('url');
var querystring = require("querystring");

http.createServer(function (request, response) {
    //1.默认情况下，如果url路径中有中文，则会对中文进行URI编码，所以服务端要想获取中文需要对url进行URI解码
    console.log(encodeURI(request.url));
    console.log(request.url);
    // 2.url.parse 方法可以将一个 URL 路径解析为一个方便操作的对象
    // 将第二个可选参数指定为 true， 表示将结果中的 query 解析为一个对象
    var parseObj = url.parse(request.url, true);
    var pathname = parseObj.pathname; //相当于无参数的url路径
    console.log(pathname);
    // 这里将解析拿到的查询字符串对象作为一个属性挂载给 req 对象，这样的话在后续的代码中就可以直接通过 req.query 来获取查询字符串了
    request.query = parseObj.query;

    var name = "";
    // 处理接口
    switch (request.method) {
        case "GET":
            if (pathname == "/api/form"){
                name = request.query.name;
                //response.writeHead(200, {'Content-Type': 'text/plain'});
                fs.readFile('../form1.html', function (err, data) {
                    if (err) {
                        return console.error(err);
                    }
                   response.end(data.toString());
                });

            }

            if (pathname == "/api/submit"){
                name = request.query.name;
                fs.readFile("../1.html",function (err,data) {
                    if (err){
                        return console.error(err);
                    }
                    console.log(data.toString);
                    var data3 = data.toString().replace("name",name);
                    console.log("name"+name);
                    response.end(data3);
                })
            }

            break;
        case "POST":
            console.log(22222);
            if (pathname == "/api/submit"){
                console.log(1);
                var postData = "";
                console.log("3333");
                // 数据块接收中
                request.on("data", function (postDataChunk) {
                    postData += postDataChunk;
                });

                request.on("end", function () {
                    console.log('数据接收完毕');
                    console.log(postData);
                    //if(request.headers["content-type"] == "application/x-www-form-urlencoded"){
                    var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
                    console.log(params);
                    console.log(params["name"]);
                    name = params["name"];
                    console.log(name);
                    fs.readFile('../1.html', function (err, data) {
                        if (err) {
                            return console.error(err);
                        }

                        console.log(data.toString);
                        var data3 = data.toString().replace("**name**",name);
                        console.log("name"+name);
                        response.end(data3);
                    });

                    //}
                    //else if(request.headers["content-type"] == "application/json"){
                    //    var params = JSON.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
                    //    console.log(params);
                    //    console.log(params["name"]);
                    //    name = params["name"];
                    //    fs.readFile('1.html', function (err, data) {
                    //        if (err) {
                    //            return console.error(err);
                    //        }
                    //        var data2 = data.toString().replace("name",name);
                    //        console.log("name"+name);
                    //        response.end(data2);
                    //    });
                    //}


                    // response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
                    // response.write("======================================="+params["name"]+"~~"+params["password"]);
                    // response.write(util.inspect(params));
                    // response.end("数据提交完毕");

                    response.writeHead(200, {'Content-Type': 'text/html'});
                });
            }
            break;
    }



}).listen(8004);
console.log('Server running at http://127.0.0.1:8004/');
