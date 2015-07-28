var PDFCollector = require("pdflist.js");

PDFCollector.collectURL("0600",function(){
	var pdftohtml = require('pdftohtmljs'), converter = new pdftohtml('test/pdfs/sample.pdf', "sample.html");

	converter.preset('default');

	converter.success(function() {
		console.log("convertion done");
	});

	converter.error(function(error) {
		console.log("conversion error: " + error);
	});

	converter.progress(function(ret) {
		console.log((ret.current*100.0)/ret.total + " %");
	});

	converter.convert();
})