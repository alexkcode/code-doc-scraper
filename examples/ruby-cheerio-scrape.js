var request = require('request');
var cheerio = require('cheerio');

request('http://ruby-doc.org/core-2.4.2/', function(err, resp, html) {
  if (!err) {
    const $ = cheerio.load(html);
    var test = code_elements.get_code_elements($('html'))
    var test = code_elements.get_sub_elements(test)
    console.log(code_elements.get_code_text(test));
  } else {
    console.log("Page didn't load!");
  }
});

var code_elements = {
  get_code_elements(obj) {
    // after selector operator is called on the cheerio object
    // the result must be reinitialized as a cheerio object
    var filtered = cheerio(obj).find('div').filter(function(i, item) {
      if (cheerio(item).attr('id') !== undefined){
        if (cheerio(item).attr('id').match(/class|method/gi)) {
          return item;
        }
      }
      // console.log(item.attribs.id);
      // is the same as below
      // console.log(element(this).attr('id'))
    });
    return filtered;
  },

  get_sub_elements(obj) {
    var sub_elements = cheerio(obj).find('p').map(function(i, item) {
      return cheerio(item).find('a');
    });
    return sub_elements;
  },

  get_code_text(obj) {
    return cheerio(obj).map(function(i, item) {
      if (item.text().match(/.* /)){
        return item;
      }
    });
  }
  
};