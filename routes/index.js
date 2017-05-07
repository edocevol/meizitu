var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var http = require('http');
const cheerio = require('cheerio');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/* GET 妹子图列表  page. */
router.get('/parser', function (req, res, next) {


    var json =new Array();
    var url = `http://m.mmjpg.com/getmore.php?te=0&page=3`;
    var request = require('request');
    request(url, function (error, response, body) { if (!error && response.statusCode == 200) {
        var $ = cheerio.load( body );//将响应的html转换成cheerio对象
        var $lis = $('li');//便利列表页的所有的li标签，每个li标签对应的是一条信息
        var json = new Array();//需要返回的json数组
        var index = 0;
        $lis.each(function () {
            var h2 = $(this).find("h2");//获取h2标签，方便获取h2标签里的a标签
            var a = $(h2).find("a");//获取a标签，是为了得到href和标题
            var img = $(this).find("img");//获取预览图
            var info =$($($(this).find(".info")).find("span")).get(0);//获取发布时间
            var like = $(this).find(".like");//获取点赞次数

            //生成json数组
            json[index] = new Array({"title":$(a).text(),"href":$(a).attr("href"),"image":$(img).attr("data-img"),"timer":$(info).text(),"like":$(like).text()});
            index++;
        })
        //设置响应头
        res.header("contentType", "application/json");
        //返回json数据
        res.json(json);
        }
    });

})
;
/**
 * 从第(1/50)张这样的字符串中提取50出来
 * @param $str
 * @returns {string}
 */
function getNumberFromString($str) {
    var start = $str.indexOf("/");
    var end = $str.indexOf(")");
    return $str.substring(start+1,end);
}

/* GET 妹子图所有图片  page. */
router.get('/details', function (req, res, next) {

    var json;
    var url = `http://m.mmjpg.com/mm/958`;
    var request = require('request');
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        var $ = cheerio.load( body );//将响应的html转换成cheerio对象

        var json = new Array();//需要返回的json数组
        var index = 0;

        var img = $($(".content").find("a")).find("img");//每一次操作之后得到的对象都用转换成cheerio对象的
        var imgSrc = $(img).attr("src");//获取第一张图片的地址
        var title = $(img).attr("alt");//获取图片集的标题
        var total  =$($(".contentpage").find("span").get(1)).text();//获取‘第(1/50)张’
        total = getNumberFromString(total);//从例如`第(1/50)张`提取出50来
        var imgPre = imgSrc.substring(0,imgSrc.lastIndexOf("/")+1);//获取图片的地址的前缀
        var imgFix = imgSrc.substring(imgSrc.lastIndexOf("."));//获取图片的格式后缀名
        console.log(imgPre + "\t" + imgFix);
        //生成json数组
        var images= new Array();
        for(var i=1;i<=total;i++) {
            images[i-1] =imgPre+i+imgFix;
        }
        json = new Array({"title":title,"images":images});

        //设置响应头
        res.header("contentType", "application/json");
        //返回json数据
        res.json(json);
    }
    });

})
;

module.exports = router;
