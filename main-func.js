const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

var URL = `https://okwine.ua/nabor-vina-zinfandel-roze-zinfandel-rose-770-miles-rozovoe-polusuhoe-6075l`;

getAll(URL);

function getAll(URL){
    let res2;
    request(URL, function (err, res, body) {
        if (err) throw err;

    let $ = cheerio.load(body);


    let charArr = [];
    let id = $('#product_code').text();
    let vendor = $('.manufacturer_name  a').text();
    let name = $('.product-name h1').text();
    let priceRUAH = $('#block_price').text();
    priceRUAH = priceRUAH.slice(0, priceRUAH.indexOf('.'));
    let oldprice = $('#old_price').text();
    oldprice = oldprice.slice(0, oldprice.indexOf('грн'));

    let charachter = $('.extra_fields_name');


    for(let i = 0; i < charachter.length; i++){
        charArr.push(charachter.eq(i).text());
    }

    console.log(charArr.join('\n'));

    charArr = charArr.map((item) =>{
        return getParamCharacter(item);
    });

    let description = $('.js-product-description').text();
    let img =  $('.slider-for-item.active').attr('href');
    res2 = `
<item>
    <id>${id}</id>
    <categoryId>1</categoryId>
    <vendor> ${vendor}</vendor>
    <name>
        ${name.slice(0, name.indexOf("("))}
    </name>
    <description>
        ${description}
    </description>
    <url>
        ${URL}
    </url>
    <image>
        https://okwine.ua/${img}
    </image>
    <priceRUAH>${priceRUAH}</priceRUAH>
    <oldprice>${oldprice}</oldprice>
    <stock>В наличии</stock>
        ${charArr.join('\n')}
</item>
    `;
        fs.appendFile('hello.xml', res2, function(error){
            if(error) throw error;
        });
    });
    return res2;
}

function getParamCharacter(string){
    let index;

    for(let i = 0; i < string.length; i++){
        if(string[i] == ":"){
        index = i;
        let part1 = string.slice(0, index);
        let part2 = string.slice(index + 1);
        return `<param name="${part1}">${part2}</param>`;
        }
    }

}
