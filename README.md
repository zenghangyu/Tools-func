# Tools-func
Some javascript  tool functions for project using

封装一下日常使用的函数，在项目开发中节省时间



#### 使用说明

##### 1. getQueryString

*use way* 

```
 
 Tools.getQueryString('object')   

```

*des*:获取地址栏中指定字符串

###### demo 

```
 url:https://www.baidu.com/aa.html?object=bb&ss=cc
 Tools.getQueryString('object');
 result:bb
```



##### 2. trim

##### *use way* 

```
Tools.trim(str,type)

```

*des*-去除字符串的空格

param **{String}** str-待处理的字符串

param **{Int}** type-去除空格的形式（1-所有空格 2-前后空格 3-前空格 4-后空格，不传返回原字符串）

##### demo

```
Tools.trim('  1235asd',1)
result：'1235asd'
```
