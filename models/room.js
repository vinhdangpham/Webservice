var mongoose = require('mongoose');
var Room = mongoose.model('Room',{
	id_department: String,
	name : String,
});

function _createRoom(u,callback)
{
	var room = new Room;
	room.save(function(err, result) {
		if (err) {
			throw "Can not create new Room";
		}
		else {
			console.log("success");
			if (typeof callback == "function") {
				callback(false, result);
			}
		}
	});
}
function _listRoom(callback) {
	Room.find().select('name id_department').exec(function(err, room) {
		callback(err, room);
	});
}

function _updateRoom(id, u ,callback) {	
	Room.update({'_id': id}, u, function(err, result){
		if (err) {
			throw "Can not update Room";
		}
		else {
			if (result) {
				callback(false);				
			}
		}
	});
}

function _deleteRoom(id, callback) {
	var res=[];
 	res= id.split(",");
  	for (var index in res) {
    if(index==0)
    {
        Room.remove({'_id':res[index]},function(err,result){
        if(err)
        {
         throw"Can not delete user";
        }
        else if (typeof callback == "function") {
         callback(false, result);
        }
      });
    }
    else {
      Room.remove({'_id':res[index]},function(err,user){
      });
    }
  }
}
module.exports = {
	create: _createRoom,
	list: _listRoom,
	update:_updateRoom,
	del:_deleteRoom
};