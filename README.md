# client

## 配置说明
1. 配置client调用api的基础路径
```
client/config.json -> 
{
    "api":{
        "baseurl":"http://wgwzjl.baosteel.com",
```
2. iis部署，需安装urlrewrite拓展，https://www.iis.net/downloads/microsoft/url-rewrite



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```





npm run build
cd dist
git init
git add .
git commit -m 'init'
git remote add sae https://git.sinacloud.com/wxmov
git push -f sae master:1
cd ..
