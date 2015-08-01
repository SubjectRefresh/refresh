var clockwork = require("clockwork")({key:"073752104caacc80b8b874aa8c0deee8a7da4fe7"});
var colors = require("colors");

colors.setTheme({
  title: ['white', 'italic'],
  error: ['bgRed', 'white', 'title'],
  info: ['bgYellow', 'white', 'italic'],
  success: ['bgGreen', 'white'],
});

 function sendMessage(phone){
// Send a message
clockwork.sendSms({ To: phone, Content: "Refresh - You haven't looked at your page in a while!  Come back and learn some more."}, function(error, resp) {
    if (error) {
        console.log("Clockwork.js: ".title + "Something went wrong".error);
    } else {
        console.log("Clockwork.js: ".title + "Message sent".success);
    }
});}

sendMessage("447858987130");