var genx = require('genx');
var express = require('express');
var app = express()
var fs = require('fs');


var w = new genx.Writer();
let msg = "";
msg = ("<?xml version=\"1.0\" encoding=\"utf-8\"?>\n");
 
w.on('data', function(data) {
  msg += (data);
})
 app.get('/', function(req, res) {
	 
w.startDocument()
// This is not a processing instruction and as such can be generated by Genx
for (var d in data){
	console.log(data[d])
  .startElement(feed)
    .startElement(title).addText(data[d].title).endElement()
    .startElement(link).addAttribute(href, data[d].link).endElement()
    .startElement(updated).addText(data[d].updated).endElement()
    .startElement(author)
      .startElement(name).addText(data[d].name).endElement()
    .endElement()
    .startElement(id).addText(data[d].id).endElement()
    .startElement(entry)
      .startElement(title).addText(data[d].title).endElement()
      .startElement(link).addAttribute(href, data[d].link).endElement()
      .startElement(id).addText(data[d].id).endElement()
      .startElement(updated).addText(data[d].updated).endElement()
      .startElement(summary).addText(data[d].summary).endElement()
    .endElement()
  .endElement()
.endDocument();
}
res.send(msg);
 });
 app.listen(process.env.PORT || 7777, function() {});

 function readFiles(dirname, onFileContent, onError) {
	 if (dirname != '.git' && dirname != 'node_modules'){
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      //return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + '/' + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          //return;
        }
        onFileContent(filename, content);
      });
    });
  });
	 }
}
var data = {};


function getDirectories(path) {
  return fs.readdirSync(path).filter(function (file) {
    return fs.statSync(path+'/'+file).isDirectory();
  });
}
var files = {}
var dirs = getDirectories('./')
for (var d in dirs){
	if (dirs[d] != 'git' && dirs[d] != 'node_modules'){
	if (files[dirs[d]] == undefined){
		files[dirs[d]] = [];
	}
	readFiles(dirs[d], function(filename, content) {
	  data[dirs[d] + '/' + filename] = content;
	}, function(err) {
	  //throw err;
	});
	}
}
 
// Declare the elements and attributes up-front
var ns      = w.declareNamespace('http://www.w3.org/2005/Atom', '');
var feed    = w.declareElement(ns, 'feed');
var title   = w.declareElement(ns, 'title');
var link    = w.declareElement(ns, 'link');
var updated = w.declareElement(ns, 'updated');
var author  = w.declareElement(ns, 'author');
var name    = w.declareElement(ns, 'name');
var id      = w.declareElement(ns, 'id');
var entry   = w.declareElement(ns, 'entry');
var summary = w.declareElement(ns, 'summary');
 
var href    = w.declareAttribute('href');
