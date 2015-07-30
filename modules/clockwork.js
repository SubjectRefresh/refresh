var clockwork = require("clockwork")({key:"073752104caacc80b8b874aa8c0deee8a7da4fe7"});
 
 function sendMessage(phone){
// Send a message
clockwork.sendSms({ To: phone, Content: "Refresh - You haven't looked at your page in a while!  Come back and learn some more."}, function(error, resp) {
    if (error) {
        console.log("Something went wrong", error);
    } else {
        console.log("Message sent");
    }
});}

sendMessage("447858987130");