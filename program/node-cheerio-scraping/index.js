const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
request('https://thenewstep.cn/myblog/',(err,response,html) => {
  if(!err){
    const $ = cheerio.load(html);
    let result = [];
    $('.post').each((i,el) => {
      const date = $(el).find('.date').text();
      const title = $(el).children('.post-info').children('.post-title').text();
      const body = $(el).find('.post-body').text();
      result.push({
        id:i,
        year:date,
        title:title,
        content:body
      });
    })
    result = JSON.stringify(result);
    fs.writeFile('data.json',result,'utf-8',(err) => {
      if(err){
        throw err;
      }
      console.log('数据获取成功');
    })

  }
})
