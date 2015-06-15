var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var user = new Schema({
	fullname:String,
	email: String,
	address:String,
	phone:String,
	gender:String,
	birthday:String,
	indentification:String,
	country:String,
	password: String,
	DT_RowId:String,
	createdate:String,
	exam: [{ type: Schema.Types.ObjectId, ref: 'Exam' }]
});

var User = mongoose.model('User', user);

var sha1 = function(input){
    return crypto.createHash('sha1').update(input.toString()).digest('hex');
};

function _login(u, callback) {
	u.password = sha1(u.password);
	User.findOne({'email': u.email, 'password': u.password }, function(err, result) {	
		if (err) {
			callback(true, 'error');
		} else {
			if (result) {
				callback(false,result);
			}
			else callback(true, 'error');
		}
	});
}
function _checkLogin(u, callback) {
	User.find({'email': u.email}).exec(function(err, user){
		if(user.length){
			user.forEach(function(element, index){
				if(element.password == sha1(u.password)) {
					callback(false, element);
				}
				else callback(true, 'error');
			});	
		}
		else callback(true, 'error');
	});
}


function _listUser(callback) {
	
	User.find().exec(function(err, user) {
		callback(err, user);
	});
}
function _findEmailAndString(email, callback){
	User.findOne({'email': email }, function(err, result) {	
		if (err) {
			callback(true, 'error');
		} else {
			if (result) {
				callback(false, result);
			}
			else callback(true, 'error');
		}
	});
}

function _createUsers(u, callback) {
  u.password = sha1(u.password);
  user = new User(u);
  User.create(user,function(err){
    if(err)
    {
        throw"Can not create new user";
    }
    else
    {
      for (var i=1; i<arguments.length; ++i) {
        var candy = arguments[i];
        User.update({'_id':candy._id},{DT_RowId:candy._id},function(){});
    }
    }
  })
}
function _selectUser(id, callback) {
	User.find({'_id': id}).exec(function(err, user){
		callback(err, user);
	});
}

function _createUser(u, callback) {
	User.find({'email': u.email}).exec(function(err, user){
		if(user.length) {
			callback(true, 'error');
		}
		else {
			u.password = sha1(u.password);
			user = new User(u);
			user.save(function(err, result) {
				if (err) {
					throw "Can not create new User";
				}
				else {
					if (typeof callback == "function") {
						callback(false, result);
					}
				}
			});
		}
	});
}
function _Rowid(id,u,callback){
  User.update({'_id':id},u,function(){});
}
function _updateUser(id, u ,callback) {
	User.update({'_id': id}, u, function(err, result){
		if (err) {
			throw "Can not update new user";
		}
		else {
			if (typeof callback == "function") {
				callback(false, result);
			}
		}
	});
}

function _deleteUser(id, callback) {
	var res=[];
 	res= id.split(",");
  	for (var index in res) {
    if(index==0)
    {
        User.remove({'_id':res[index]},function(err,result){
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
      User.remove({'_id':res[index]},function(err,user){
      });
    }
  }
}

module.exports = {
	checkLogin: _checkLogin,
	listUser: _listUser,
	selectUser: _selectUser,
	createUser: _createUser,
	updateUser: _updateUser,
	deleteUser: _deleteUser,
	createUsers:_createUsers,
	rowid:_Rowid,
	login:_login,
	findEmailAndString:_findEmailAndString
};