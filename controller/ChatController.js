var sequelize = require('../common/mysql');
var Chat = require("../model/ChatModel");

module.exports.getAllMessages = function (reciever_id, sender_id, callback) {
  var statement = "SELECT users.matrikel_number,chat.message,chat.product_id,chat.created_date,chat.modified_date\
     FROM sell_it.chat,sell_it.users\
      where chat.sender_id="+ reciever_id + " and chat.receiver_id=" + sender_id + " and chat.sender_id=users.matrikel_number \
        or chat.sender_id="+ sender_id + " and chat.receiver_id=" + reciever_id + " and chat.sender_id=users.matrikel_number";
  sequelize.query(statement).spread((data) => {
    callback(data);
  });

}

module.exports.getAllCommunications = function(matrikel_number,callback){
  var statement = "SELECT  users.matrikel_number,users.first_name,users.last_name,ANY_VALUE(max(chat.created_date)) as created_date\
  FROM sell_it.chat,sell_it.users\
  where chat.sender_id=users.matrikel_number and chat.receiver_id="+matrikel_number+" \
  or chat.sender_id="+matrikel_number+" and chat.receiver_id=users.matrikel_number \
  group  by users.matrikel_number  order by created_date";
      sequelize.query(statement).spread((data) => {
          callback(data);
      });

}

module.exports.sendMessage = function (message, callback) {
	Chat.build(message).save().then((data) => {
	  console.log(data.dataValues);
	  callback(data.dataValues);
	}).catch((err) => {
    console.log(err);
	  callback(err);
	})
  }
