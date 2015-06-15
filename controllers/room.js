var Room = require('../models/room');


function _listRoom(req, res) {
	Room.list(function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1
			});
		}
	});
}

function _createRoom(req, res) {
	
	var room = {
		name:req.body.name,
		id_department:req.body.id_department
	};

	Room.create(room, function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1
			});
		}
	});
}

function _updateRoom (req, res) {
	var id = req.params.id;
	var room = {
		name:req.body.name,
		id_department:req.body.id_department
	};

	Room.update (id, room, function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1
			});
		}
	});

}

function _deleteRoom(req, res) {
	var id = req.params.id;
	Room.del (id, function(err, resuft){
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1
			});
		}
	});
}

module.exports = {
	list: _listRoom,
	create: _createRoom,
	update:_updateRoom,
	del:_deleteRoom
};