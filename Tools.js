/**
 * create by zenghy 2018.1.10
 */


var Tools = {
    //  getQueryString(object)
    //  截取地址栏中的字符串
    getQueryString: function(strParame) {
        var args = new Object();
        var query = location.search;
        var newQuery = query.substring(query.indexOf('?') + 1);
        var pairs = newQuery.split("&"); // Break at ampersand
        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1)
                continue;
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            value = decodeURIComponent(value);
            args[argname] = value;
        }
        return args[strParame] || "";
    },
    //去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
    //trim('  1235asd',1)
    //result：1235asd
    trim(str, type) {
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },
    /*type
    1:首字母大写
    2：首字母小写
    3：大小写转换
    4：全部大写
    5：全部小写
    * */
    //changeCase('asdasd',1)
    //result：Asdasd
    changeCase(str, type) {
        function ToggleCase(str) {
            let itemText = ""
            str.split("").forEach(item => {
                if (/^([a-z]+)/.test(item)) {
                    itemText += item.toUpperCase();
                } else if (/^([A-Z]+)/.test(item)) {
                    itemText += item.toLowerCase();
                } else {
                    itemText += item;
                }
            });
            return itemText;
        }

        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function(word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

                });
            case 2:
                return str.replace(/\b\w+\b/g, function(word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return ToggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },
    //检测字符串
    //checkType('165226226326','phone')
    //result：false
    //大家可以根据需要扩展
    checkType(str, type) {
        switch (type) {
            case 'email':
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'phone':
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel':
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'number':
                return /^[0-9]$/.test(str);
            case 'english':
                return /^[a-zA-Z]+$/.test(str);
            case 'text':
                return /^\w+$/.test(str);
            case 'chinese':
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':
                return /^[a-z]+$/.test(str);
            case 'upper':
                return /^[A-Z]+$/.test(str);
            default:
                return true;
        }
    },
    upDigit(n) {
        let fraction = ['角', '分', '厘'];
        let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        let unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        let head = n < 0 ? '欠人民币' : '人民币';
        n = Math.abs(n);
        let s = '';
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (let i = 0; i < unit[0].length && n > 0; i++) {
            let p = '';
            for (let j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
            //s = p + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    //清除对象中值为空的属性
    //filterParams({a:"",b:null,c:"010",d:123})
    //Object {c: "010", d: 123}
    filterParams(obj) {
        let _newPar = {};
        for (let key in obj) {
            if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    },
    //数据类型判断
    //ecDo.istype([],'array')
    //true
    //ecDo.istype([])
    //'[object Array]'
    istype(o, type) {
        switch (type.toLowerCase()) {
            case 'string':
                return Object.prototype.toString.call(o) === '[object String]';
            case 'number':
                return Object.prototype.toString.call(o) === '[object Number]';
            case 'boolean':
                return Object.prototype.toString.call(o) === '[object Boolean]';
            case 'undefined':
                return Object.prototype.toString.call(o) === '[object Undefined]';
            case 'null':
                return Object.prototype.toString.call(o) === '[object Null]';
            case 'function':
                return Object.prototype.toString.call(o) === '[object Function]';
            case 'array':
                return Object.prototype.toString.call(o) === '[object Array]';
            case 'object':
                return Object.prototype.toString.call(o) === '[object Object]';
            case 'nan':
                return isNaN(o);
            case 'elements':
                return Object.prototype.toString.call(o).indexOf('HTML') !== -1
            default:
                return Object.prototype.toString.call(o)
        }
    },

    //手机类型判断
    browserInfo(type) {
        switch (type) {
            case 'android':
                return navigator.userAgent.toLowerCase().indexOf('android') !== -1
            case 'iphone':
                return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1
            case 'ipad':
                return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1
            case 'weixin':
                return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
            default:
                return navigator.userAgent.toLowerCase()
        }
    },
    show(obj) {
        let blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside', '']
        if (blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
            obj.style.display = 'inline';
        } else {
            obj.style.display = 'block';
        }
    },
    hide(obj) {
        obj.style.display = "none";
    },
    /* 封装ajax函数
     * @param {string}obj.type http连接的方式，包括POST和GET两种方式
     * @param {string}obj.url 发送请求的url
     * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}obj.data 发送的参数，格式为对象类型
     * @param {function}obj.success ajax发送并接收成功调用的回调函数
     * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
     */
    //  ajax({
    //  	type:'get',
    //  	url:'xxx',
    //  	data:{
    //  		id:'111'
    //  	},
    //  	success:function(res){
    //  		console.log(res)
    //  	}
    //  })
    ajax(obj) {
        obj = Object.assign({
            type: 'POST',
            url: '',
            async: true,
            data: null,
            success() {},
            error() {}
        }, obj);
        obj.type = obj.type.toUpperCase();
        let xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        let params = [];
        for (let key in obj.data) {
            params.push(key + '=' + obj.data[key]);
        }
        let postData = params.join('&');
        if (obj.type.toUpperCase() === 'POST') {
            xmlHttp.open(obj.type, obj.url, obj.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (obj.type.toUpperCase() === 'GET') {
            xmlHttp.open(obj.type, `${obj.url}?${postData}`, obj.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                obj.success(xmlHttp.responseText);
            } else {
                obj.error(xmlHttp.responseText);
            }
        };
    },
    //图片没加载出来时用一张图片代替
    aftLoadImg(obj, url, errorUrl, cb) {
        let oImg = new Image(),
            _this = this;
        oImg.src = url;
        oImg.onload = function() {
            obj.src = oImg.src;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        }
        oImg.onerror = function() {
            obj.src = errorUrl;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        }
    },
    //图片滚动懒加载
    //@className {string} 要遍历图片的类名
    //@num {number} 距离多少的时候开始加载 默认 0
    //比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
    //html代码
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
    //<p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
    //data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
    //详细可以查看testLoadImg.html

    //window.onload = function() {
    //	loadImg('load-img',100);
    //	window.onscroll = function() {
    //		loadImg('load-img',100);
    //		}
    //}
    loadImg(className = 'ec-load-img', num = 0, errorUrl = null) {
        let oImgLoad = document.getElementsByClassName(className);
        for (let i = 0, len = oImgLoad.length; i < len; i++) {
            //如果图片已经滚动到指定的高度
            if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - num && !oImgLoad[i].isLoad) {
                //记录图片是否已经加载
                oImgLoad[i].isLoad = true;
                //设置过渡，当图片下来的时候有一个图片透明度变化
                oImgLoad[i].style.cssText = "transition: ''; opacity: 0;";
                if (oImgLoad[i].dataset) {
                    this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, errorUrl, function(o) {
                        //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                        setTimeout(() => {
                            if (o.isLoad) {
                                this.removeClass(o, className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                } else {
                    this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), errorUrl, function(o) {
                        //添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
                        setTimeout(() => {
                            if (o.isLoad) {
                                this.removeClass(o, className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                }
                (function(i) {

                    setTimeout(function() {
                        oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                    }, 20)
                })(i);
            }
        }
    }
}