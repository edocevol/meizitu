
# nodejs环境下html的解析
nodejs环境下，对妹子图网站的数据进行获取/解析/并利用express对客户端进行json数据的返回。
本文主要解决了：1.jquery解析请求过来的html如何实现的问题；2.nodejs环境下jquery重度使用者的替代函数库的问题；3.nodejs下，如何发送ajax请求的问题（ajax请求，本身就是一个request请求）；4. 本文用实际的案例来介绍了如何使用`cheerio`进行dom操作。

使用者需要安装npm模块：cheerio
另外推荐使用npm模块:nodemon，可以对nodejs的程序进行热部署

## 引言
微信小程序平台的基本要求是：
1. 数据服务器必须要是https协议的service接口
2. 微信小程序不是html5，不支持dom解析和window操作
3. 测试版本可以用第三方的数据服务接口，正式版本不允许用第三方的接口（当然，这里说的是多个第三方数据接口）。

在APICLOUD平台下，我们可以使用html5配合jquery等类库来实现dom数据的解析，来解决数据源不是json格式的问题（html下利用jquery加载html5中的数据，回头整理一下之前学习apicloud平台api的时候，做的测试app），但是在微信小程序平台下，解析html元素基本上是没有办法的。在本文撰写之前，我在网上看到有说用`underscore`来代替jquery做dom解析的回答，我搞了半天，发现还是不是那么顺手。

因此，本文提出的方案是为了解决两个问题：
1. 利用自己的服务器，给自己的微信小程序提供第三方网站的html数据转换服务，将第三方的html元素解析出自己需要的元素，在nodejs平台下，利用`request`模块来完成数据请求，利用`cheerio`模块来完成html的解析。
2. 在nodejs平台下，虽然有jquery模块，但是用起来还是有很多问题的。网上有一贴被给个网站复制的帖子，给出的在nodejs环境下使用jquery的方法，经过我的实际测试，发现并不能顺利的进行上手编写代码。

因此，本文的行文思路：1. 对数据源进行分析; 2. 对`request`进行简单的介绍；3.对`cheerio`模块的常用方法进行简单的介绍；4. 编写在nodejs下，利用`express`模块来实现json数据的提供。

## 数据源分析
### 数据列表的分析
按照大多数程序的套路，对第三方数据源的操作多是爬虫案例，那么本文的案例应该也是宅男福利了吧。本文的目标地址是：`http://m.mmjpg.com`.

![妹子图官网长这样][1]


本文的数据源是来自**排行榜**页面。**排行榜页面**长这样，
![enter description here][2]

滑动滚动条在对底部，我们可以发现有一个**加载更多**的按钮，点击加载更多之后，在浏览器的控制台中，可以看到，浏览器发送了一个`url`为`http://m.mmjpg.com/getmore.php?te=1&page=3`的请求.
![加载更多][3]

浏览器的控制台显示的网络请求截图如下图所示：
![enter description here][4]
我们可以用浏览器，打开上面这个链接（`http://m.mmjpg.com/getmore.php?te=1&page=3`），这是我在写本文的时候，访问这个链接时浏览器获取到的实时数据(读者在自己进行浏览器访问时，可能获取的数据和我的不一样)。
下图中，我对页面源代码中的数据进行了标注，包括一下内容：1. 标题;2.所有图片的浏览地址；3.预览图的地址；4.发布时间；5.点赞次数
![enter description here][5]

### 数据详情页的分析

对上面我们访问加载更多页面时，获取的page=3的列表的页面中，点击了下面这个链接`http://m.mmjpg.com/mm/958`，对应的标题是`亮丽清纯妹子冰露纯天然的G杯巨乳美图`。


![enter description here][6]

从上图中，可以看到，每个`http://m.mmjpg.com/mm/958/数组序号`页面都有一张图片，且这张图片的地址也很规范，为`http://img.mmjpg.com/2017/958/1.jpg`。那后面的事情就很简单了，我们只需要知道当前图片集一共有多少张，就可以根据规则来拼接出所有图片的地址了。那这里，对详情页数据的获取，我们只需要对第一个图片的页面进行数据的获取就可以了。主要获取的数据是`第（1/N）张`和`class`为`content`的div下面第一个`img`标签的src就可以了。

那，上面对数据源的介绍，就是这么多，其他的数据源的分析都是这样的一个思路。相信列位看官一定能够得到自己想要获取的数据。


## request模块简介

`request`模块让`http`请求变的更加简单。(作为客户端，去请求、抓取另一个网站的信息) **GitHub**:`https://github.com/request/request`

### 最简单的一个示例：

```javascript
var request = require('request'); 
request('http://www.google.com', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
})
```
### 抓取网上的图片，保存到本地

```javascript
var fs=require('fs');
var request=require('request');
request('http://n.sinaimg.cn/news/transform/20170211/F57R-fyamvns4810245.jpg').pipe(fs.createWriteStream('doodle.png'));
```

### 将本地的file.json文件上传到http://mysite.com/obj.json

```javascript
fs.createReadStream('file.json').pipe(request.put('http://mysite.com/obj.json'))
```

### 将http://google.com/img.png上传到http://mysite.com/img.png

```javascript
request.get('http://google.com/img.png').pipe(request.put('http://mysite.com/img.png'))
```


### 表单提交到http://service.com/upload

```javascript
var r = request.post('http://service.com/upload')
var form = r.form()
form.append('my_field', 'my_value')
form.append('my_buffer', new Buffer([1, 2, 3]))
form.append('my_file', fs.createReadStream(path.join(__dirname, 'doodle.png'))
form.append('remote_file', request('http://google.com/doodle.png'))
```

### HTTP认证

```javascript
request.get('http://some.server.com/').auth('username', 'password', false);
```

### 定制HTTP header

```javascript
//User-Agent之类可以在options对象中设置。
var options = {
 url: 'https://api.github.com/repos/mikeal/request',
 headers: {
 'User-Agent': 'request'
 }
};
function callback(error, response, body) {
 if (!error && response.statusCode == 200) {
 var info = JSON.parse(body);
 console.log(info.stargazers_count +"Stars");
 console.log(info.forks_count +"Forks");
}
}
request(options, callback);
```

## cheerio模块简介
cheerio为服务器特别定制的，快速、灵活、实施的jQuery核心实现.**npm官网下对cheerio模块的简介**：[`https://www.npmjs.com/package/cheerio`][7]   

如果阅读英文文献有问题的话，nodejs中文社区下的关于cheerio的api的中文介绍：[`http://cnodejs.org/topic/5203a71844e76d216a727d2e`][8]

### 对jquery的对比
其实，如果在nodejs下，使用`const cheerio = require('cheerio');`这样的方式加载`cheerio`模块的话，将我们的html源字符串作为参数，利用`cheerio`的`load`函数进行加载的话，我们是可以完全按照在`jquery`环境下的编程思路，来实现对dom的解析的。

由于`cheerio`模块实现了大部分的`jquery`的函数，因此，本文在这里不进行过多的介绍。


### 结合代码讲述如何获取数据

通过上面的分析，我们可以看到我们的数据源不是`json`，而是`html`，对`jquery`来说，`html`应该在发送`ajax`请求的时候，设置`dataType`为`text`。

主要流程（jquery）：
1. 利用ajax请求，传入url和设置dataType
2. 利用`$(data)`将`ajax`得到的数据转换成`jquery`对象。
3. 利用`jquery`的`find`和`get`方法，找到需要获取的元素。
4. 利用`jquery`的`attr`和`html`方法，取得所需要的信息。
5. 将上述信息整合成json串或者之前对你的`html`进行`dom`操作，完成数据的加载。

主要流程（nodejs）：
1. 利用requets请求，传入url和设置dataType
2. 利用`cheerio.load(body)`将`request`得到的数据转换成`cheerio`对象。
3. 利用`cheerio`的`find`和`get`方法，找到需要获取的元素。
4. 利用`cheerio`的`attr`和`text`方法，取得所需要的信息。
5. 将上述信息整合成json串，利用`express`的`res.json`将json响应给客户端（小程序或者其他APP）。

### 直接上代码吧

### nodejs下图片列表的获取与解析

```javascript
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


```
在浏览中，获取列表页的json，截图如下：

![enter description here][9]

详情页的json获取，截图如下：

![enter description here][10]

上面的json经过格式检验，都是有效的。

![enter description here][11]


### apicloud平台下利用jquery实现的代码

```javascript
//获取妹子图的列表
function loadData() {
    url = 'http://m.mmjpg.com/getmore.php';
    $.ajax({
        url: tmpurl,
        method: 'get',
        dataType: "application/text",
        data:{
            te：0,
            page:3
        },
        success: function (data) {
            if (data) {
                ret = "<ul>" + ret + "</ul>";
                var lis = $(ret).find("li");
                var one = '';
                $(lis).each(function () {
                    var a = $(this).find("h2 a");
                    var ahtml = $(a).html();//标题
                    var ahref = $(a).attr('href');//链接
                    var info = $(this).find(".info");
                    var date = $($(info).find("span").get(0)).html();
                    var like = $($(info).find(".like")).html();
                    var img = $(this).find("img").get(0);
                    var imgsrc = $(img).attr('data-img');
                    //接下来，决定如何对数据进行显示咯。如dom操作，直接显示。
                });
            } else {
                alert("数据加载失败，请重试");
            }
        }
    });
};//end of loadData

//图片详情页的获取，就不再提供jquery版本的代码了


```

## 总结

本文主要解决了：1.jquery解析请求过来的html如何实现的问题；2.nodejs环境下jquery重度使用者的替代函数库的问题；3.nodejs下，如何发送ajax请求的问题（ajax请求，本身就是一个request请求）；4. 本文用实际的案例来介绍了如何使用`cheerio`进行dom操作。


代码已经上传到github了，小伙伴们，觉得有用的，`start`一下吧。

地址：[https://github.com/edocevol/meizitu][12]


  [1]: http://cdnfrank.wanqing520.cn/1494141040442.jpg
  [2]: http://cdnfrank.wanqing520.cn/1494141225376.jpg
  [3]: http://cdnfrank.wanqing520.cn/1494141396059.jpg
  [4]: http://cdnfrank.wanqing520.cn/1494141608877.jpg
  [5]: http://cdnfrank.wanqing520.cn/1494141845583.jpg
  [6]: http://cdnfrank.wanqing520.cn/1494142370329.jpg
  [7]: https://www.npmjs.com/package/cheerio
  [8]: http://cnodejs.org/topic/5203a71844e76d216a727d2e
  [9]: http://cdnfrank.wanqing520.cn/1494146076476.jpg
  [10]: http://cdnfrank.wanqing520.cn/1494146104647.jpg
  [11]: http://cdnfrank.wanqing520.cn/1494146154791.jpg
  [12]: https://github.com/edocevol/meizitu
