var weixin      = require('weixin-api');
var express     = require('express');
var app         = express(); 
var https = require("https");  


var appid='';
var appsecert= '';
weixin.token = 'tICtMWbYtZaGLTPXEc0RgMCglpX0mKodsuzKMI9jA8U9dX1uAmKO9k3br7ldLxJcAyByBHZIr3QB8fASc7GM1dJ0BVigRQVsw17eLd5oOHEfJAB_VJH-sAxS3tyOYv1EBRAbADAGWF';

main();
function main() {
    //getAccess_token(appid,appsecert);
    getMenuCreate(weixin.token);
}
function getAccess_token(APPID,APPSECRET) {
    var url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+APPID+"&secret="+APPSECRET;  
    https.get(url, function (res) {  
        var datas = [];  
        var size = 0;  
        res.on('data', function (data) {  
            datas.push(data);  
            size += data.length;  
        });  
        res.on("end", function () {  
            var buff = Buffer.concat(datas, size);  
            var result = buff.toString(); 
            var json = JSON.parse(result);
            access_token(json.access_token);
        });  
    }).on("error", function (err) { 
        console.log('https error',err.stack); 
    }); 
}
function access_token(data) {
    console.log(data);
}
//设置菜单
function getMenuCreate(token) {
    var data = JSON.stringify({
     "button":[
     {  
          "name":"项目合作",
          "sub_button":[
           {    
               "type":"view",
               "name":"项目介绍",
               "url":"http://www.wongshek.cn/weixin_about.html"
            },
            {
               "type":"view",
               "name":"我要众筹",
               "url":"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx862ea6971d2f690b&redirect_uri=http://pay.emomo.cc&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
            },
            {
               "type":"click",
               "name":"我要合作",
               "key":"V1001_GOOD"
            }
          ]
      },
      {
           "name":"emomo中心",
           "sub_button":[
           {    
               "type":"click",
               "name":"我的收益",
               "key":"V1001_GOOD"
            },
            {
               "type":"click",
               "name":"我的emomo",
               "key":"V1001_GOOD"
            },
            {
               "type":"click",
               "name":"收货地址",
               "key":"V1001_GOOD"
            }]
       }]
    });
    var options = {
    host: 'api.weixin.qq.com',
    path:'/cgi-bin/menu/create?access_token='+token,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
        }
    };

    var req = https.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log("body: data" + chunk);
        });
    res.on('end',function(chunk){
        console.log("body: end" + chunk);
        })
    });
    req.write(data);
    req.end();
}




// 接入验证
app.get('/', function(req, res) {
    // 签名成功
    if (weixin.checkSignature(req)) {
        res.status(200).send(req.query.echostr);
    } else {
        res.status(200).send('fail');
    }
});
app.post('/', function(req, res) {
    weixin.loop(req, res);
});

// 监听事件消息
weixin.eventMsg(function(msg) {
    console.log(msg.fromUserName);
    var resMsg = {};
    switch(msg.event){
/*      case "CLICK":
            if (msg.eventKey == 'V1001_GOOD') {
                console.log('V1001_GOOD');
                resMsg = {
                    fromUserName : msg.toUserName,
                    toUserName : msg.fromUserName,
                    msgType : "text",
                    content : "这是文本V1001_GOOD回复",
                    funcFlag : 0
                };
            };
        break;*/
        //订阅
        case "subscribe":
           /* var articles = {
                title : "項目介绍",
                description : "emomo按摩沙发項目介绍",
                picUrl : "http://weizhifeng.net/images/tech/composer.png",
                url : "http://weizhifeng.net/manage-php-dependency-with-composer.html"
            };
            // 返回图文消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : articles,
                funcFlag : 0
            }*/
            resMsg = {
                    fromUserName : msg.toUserName,
                    toUserName : msg.fromUserName,
                    msgType : "text",
                    content : "这是文本V1001_GOOD回复",
                    funcFlag : 0
                };
        break;
    }; 
    weixin.sendMsg(resMsg);
});

// 监听文本消息
weixin.textMsg(function(msg) {
    console.log("textMsg received");
    console.log(JSON.stringify(msg));

    var resMsg = {};

    switch (msg.content) {
        case "文本11" :
            // 返回文本消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "text",
                content : "这是文本111回复",
                funcFlag : 0
            };
            break;

        case "音乐" :
            // 返回音乐消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "music",
                title : "音乐标题",
                description : "音乐描述",
                musicUrl : "音乐url",
                HQMusicUrl : "高质量音乐url",
                funcFlag : 0
            };
            break;


        case "图文" :
            // 图文 可以订阅的时候显示
            var articles = [];
            articles[0] = {
                title : "PHP依赖管理工具Composer入门",
                description : "PHP依赖管理工具Composer入门",
                picUrl : "http://weizhifeng.net/images/tech/composer.png",
                url : "http://weizhifeng.net/manage-php-dependency-with-composer.html"
            };

            articles[1] = {
                title : "八月西湖",
                description : "八月西湖",
                picUrl : "http://weizhifeng.net/images/poem/bayuexihu.jpg",
                url : "http://weizhifeng.net/bayuexihu.html"
            };

            articles[2] = {
                title : "「翻译」Redis协议",
                description : "「翻译」Redis协议",
                picUrl : "http://weizhifeng.net/images/tech/redis.png",
                url : "http://weizhifeng.net/redis-protocol.html"
            };

            // 返回图文消息
            resMsg = {
                fromUserName : msg.toUserName,
                toUserName : msg.fromUserName,
                msgType : "news",
                articles : articles,
                funcFlag : 0
            }
    }

    weixin.sendMsg(resMsg);
});

app.listen(3000);
// 监听图片消息
/*weixin.imageMsg(function(msg) {
    console.log("imageMsg received");
    console.log(JSON.stringify(msg));
});*/

// 监听位置消息
/*weixin.locationMsg(function(msg) {
    console.log("locationMsg received");
    console.log(JSON.stringify(msg));
});*/

// 监听链接消息
/*weixin.urlMsg(function(msg) {
    console.log("urlMsg received");
    console.log(JSON.stringify(msg));
});*/