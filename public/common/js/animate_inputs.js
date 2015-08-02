$(document).ready(function() {
	/*$("head").append("<link rel='stylesheet' href='http://www.egrappler.com/fancy-textbox/css/fancy-textbox.css'/>");
	$("head").append("<script src='http://www.egrappler.com/fancy-textbox/js/jquery.fancy-textbox.js' type='text/css'></script>");*/
	function animate_inputs(el){
        $(el).addClass("collapse");
        $(el).animate({
            width: 'toggle'
        }, 1000);
        
        //$(el).css("visibility","hidden").width("0px").attr("left","0px").attr("right","auto").css("visibility","visible").animate({width: '80%'}, "slow");
    }
    $("input[type='password']").each(function() {
    	animate_inputs(this);
    });
    $("input[type='email']").each(function() {
    	animate_inputs(this);
    });
    $("input[type='text']").each(function() {
    	animate_inputs(this);
    });
});