var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var admin = new Schema({
	fullname: String,
	username: String,
	password: String,
	email: String,
	DT_RowId:String,
	createdate:String
});

var Admin = mongoose.model('admin', admin);

var sha1 = function(input){
    return crypto.createHash('sha1').update(input.toString()).digest('hex');
};
function _getdate()
{
currentdate = new Date(); 
datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
return datetime; 
}
Admin.find({'email': 'admin@gmail.com'}).exec(function(err, user){
	if(!user.length) {
		var admin = {
			fullname: 'Admin',
			username:'AdminMaster',
			email: 'admin@gmail.com',
			password: sha1('admin'),
			createdate:_getdate()
		};
		admin = new Admin(admin);
		admin.save(function(err, result){
			Admin.update({'_id':result._id},{DT_RowId:result._id},function(){});
			if(err) throw "Can not create account";
		});
	}
});
function _login(u, callback) {
	u.password = sha1(u.password);
	Admin.findOne({'email': u.email, 'password': u.password }, function(err, result) {	
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
function _checkpassword(id,password,callback)
{
	pass=sha1(password);
	Admin.findOne({'_id':id,'password':pass}).exec(function(err,admin){
		if(err){
			callback(true,'error');
		}
		else{
			if(admin){
				callback(false,admin);
			}
			else callback(true,'error');
		}
	});
}
function _checkLogin(u, callback) {
	Admin.find({'username': u.username}).exec(function(err, admin){
		if(admin.length){
			console.log(admin);
			admin.forEach(function(element, index){
				if(element.password == sha1(u.password)) {
					callback(false, element);
				}
				else callback(true, 'error');
			});	
		}
		else callback(true, 'error');
	});
}


function _listAdmin(callback) {
	Admin.find().exec(function(err, admin) {
		callback(err, admin);
	});
}

function _selectAdmin(id, callback) {
	Admin.find({'_id': id}).exec(function(err, admin){
		callback(err, admin);
	});
}


function _createAdmin(u, callback) {
	Admin.find({'email': u.email}).exec(function(err, admin){
		if(admin.length) {
			callback(true, 'error');
		}
		else {
			u.password = sha1(u.password);
			admin = new Admin(u);
			admin.save(function(err, result) {
				if (err) {
					throw "Can not create new admin";
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
  Admin.update({'_id':id},u,function(){});
}

function _updateAdmin(id, u ,callback) {
	Admin.update({'_id': id}, u, function(err, result){
		if (err) {
			throw "Can not update new admin";
		}
		else {
			if (typeof callback == "function") {
				callback(false, result);
			}
		}
	});
}

function _deleteAdmin(id, callback) {
	var res=[];
 	res= id.split(",");
  	for (var index in res) {
    if(index==0)
    {
        Admin.remove({'_id':res[index]},function(err,result){
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
      Admin.remove({'_id':res[index]},function(err,user){
      });
    }
  }
}
function _findEmailAndString(email, callback){
	Admin.findOne({'email': email }, function(err, result) {	
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

module.exports = {
	findEmailAndString:_findEmailAndString,
	login:_login,
	checkpassword:_checkpassword,
	checkLogin: _checkLogin,
	listAdmin: _listAdmin,
	selectAdmin: _selectAdmin,
	createAdmin: _createAdmin,
	updateAdmin: _updateAdmin,
	deleteAdmin: _deleteAdmin,
	rowid:_Rowid,
};