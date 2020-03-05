const request = require('request');
const cheerio = require('cheerio');
const fs = require("fs");

var URL = `https://okwine.ua/search/search=%D0%BD%D0%B0%D0%B1%D0%BE%D1%80/page-2`;


    function getLinks(url){
        request(url, function (err, res, body) {
            if (err) throw err;

        let $ = cheerio.load(body);
        let arrLinks = [];

        let allLinks = $('.vina-item.product > a');
        for(let i = 0; i < allLinks.length; i++){
            arrLinks.push(`https://okwine.ua/${allLinks.eq(i).attr('href')}`);
        }

        for(let i = 0; i < arrLinks.length; i++){
            getAll(arrLinks[i]);
        }

        });
}

    getLinks(URL);


 function getParamCharacter(string){
    let index;
    let res = [];

    for(let i = 0; i < string.length; i++){
        if(string[i] == ":"){
        index = i;
        let part1 = string.slice(0, index);
        let part2 = string.slice(index + 1);
        `<param name="${part1}">${part2}</param>`;
        res.push(`<param name="${part1}">${part2}</param>`);
        }
    }
    return res;
}
