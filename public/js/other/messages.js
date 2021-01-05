
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(queryString)
var user_id =urlParams.get('user');





function start(){
req = new XMLHttpRequest();
req.open("GET",'/api/v1/chat/' + user_id, true);
req.send();
req.onload = function () {
    json = JSON.parse(req.responseText);
    var body = "";
    for (var i = json.rows.length - 1; i >= 0; i--) {
        body += "<div id='" + json.rows[i].matrikel_number + "' onclick='getAllMessages(" + json.rows[i].matrikel_number+")' class='chat_list active_chat'>"+
                         "<div class='chat_people'>"+
                                "<div class='chat_img'> <img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'> </div>"+
                                "<div class='chat_ib'>"+
                                  "<h5>"+ json.rows[i].first_name +" "+ json.rows[i].last_name + "</h5>"+
                                  "<p>"+ json.rows[i].matrikel_number+"<span style='float:right' class='chat_date'>" +  json.rows[i].created_date + "</span></p>"+
                                "</div>"+
                              "</div>"+
                            "</div>";
    }

  
    document.getElementById('inbox_chat').innerHTML = body;
};

}
start()
/////////////////(end)

////////////////////////when you click to any user to get all message history(begin)
function getAllMessages(secondUser_id) {
sender_id=secondUser_id;
    var params = 'receiver_id=' + secondUser_id + '&sender_id=' + user_id;



    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200)
{
console.log("all messages loading...");
        json = JSON.parse(req.responseText);
        var body = "";
        for (var i = 0; i < json.rows.length; i++) {
            if (json.rows[i].matrikel_number == secondUser_id) {
                
                body += "<div class='incoming_msg' style='margin-bottom:25px'>\
         <div class='incoming_msg_img'> <img src='https://ptetutorials.com/images/user-profile.png' alt='sunil'> </div>\
         <div class='received_msg'>\
           <div class='received_withd_msg'>\
             <p>"+ json.rows[i].message + "</p>\
             <span class='time_date'>"+ json.rows[i].created_date + "</span></div>\
         </div>\
       </div>"

            }
            else if (json.rows[i].matrikel_number == user_id) {

                body += "<div class='outgoing_msg'>"+
         "<div class='sent_msg'><p>";
         msg_length=json.rows[i].message.length;
         for(var n=0;n<(msg_length-(msg_length%32))/32;n++)
                             {
                                body +=json.rows[i].message.substring(n*32, (n+1)*32)+"<br>"
                             }
                             body +=json.rows[i].message.substring((msg_length-(msg_length%32)), msg_length);
           body +="</p><span class='time_date'>"+ json.rows[i].created_date + "</span> </div>"+
       "</div>";

            }

        }
        document.getElementById('msg_history').innerHTML = body;
        scrollBottom();
        var msg_send = "<table border='1' width='100%' ><tr><td> "+
    "<input id='write_msg' onclick='sendMessageEnter(event,"+ user_id +", " + secondUser_id + "," + json.rows[0].product_id + ")' type='text' class='write_msg' placeholder='Type a message' />"+
   " <button onclick='sendMessage("+ user_id + ", " + secondUser_id + "," + json.rows[0].product_id + ")' class='msg_send_btn' type='button'>></button></table></tr></td> ";
   
        document.getElementById('input_msg_write').innerHTML = msg_send;



            scrollBottom();

            }
    };
    req.open("POST", '/api/v1/chat/getAllMessages/', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    req.send(params);

}

////////(end)
function sendMessageEnter(e, sender_id, receiver_id, product_id) {
    //See notes about 'which' and 'key'
    if (e.keyCode == 13) {
        sendMessage(sender_id, receiver_id, product_id);
        console.log("enter pressed");
    }
}
function sendMessage(sender_id, receiver_id, product_id) {
console.log("|"+sender_id+"|"+receiver_id+"|"+product_id+"|")


    var message = document.getElementById('write_msg').value;
    var currentdate = new Date();
    var created_date = "" + currentdate.getFullYear() + "-"
        + (currentdate.getMonth() + 1) + "-"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    var modified_date = created_date;

    var params = 'receiver_id=' + receiver_id + '&sender_id=' + sender_id + '&product_id=' + product_id + '&message=' + message + '&created_date=' + created_date + '&modified_date=' + modified_date;



    req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200)
    {
        socket_call(sender_id,receiver_id);
    }
    }
    req.open("POST",'/api/v1/chat/sendMessage/', true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    req.send(params);

    var body = document.getElementById('msg_history').innerHTML;

    body += "<div class='outgoing_msg'>"+
         "<div class='sent_msg'>"+
           "<p>"+ message + "</p>"+
           "<span class='time_date'>"+ created_date + "</span> </div>"+
       "</div>"

    document.getElementById('msg_history').innerHTML = body;
    document.getElementById('write_msg').value = "";

    var messageBody = document.querySelector('#msg_history');
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;


}
function socket_call(sender_id,receiver_id){
 console.log("socked methods calling");
socket.emit('chat message', receiver_id);
    socket.emit('msg hist',sender_id+"-"+ receiver_id);
}
function scrollBottom(){
            var messageBody = document.querySelector('#msg_history');
            messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
            }


            ///////socket io
            
var socket = io();
$(function () {
  socket.on('chat message', msg =>{
  console.log("socket on chat message");
  if(msg==user_id){
      start();
      console.log("start(user_id)");
  }

  })

  socket.on('msg hist',sender =>{
  console.log("1-"+sender_id+'-'+user_id)
   var res = sender.split("-");
  if(res[0]==sender_id && res[1]==user_id ){
    getAllMessages(sender_id);
  }

  })
});

///////////