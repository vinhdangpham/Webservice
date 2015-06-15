var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var Doctor = mongoose.model('Doctor', {
	department : String,
	fullname : String,
	birthday : String,
	gender: String,
	address : String,
	certificate : String,//bằng cấp
	experience : String,//kinh nghiem
	createdate:String,
	DT_RowId:String,
	email:String,
	password:String,
});
var sha1 = function(input){
    return crypto.createHash('sha1').update(input.toString()).digest('hex');
};

function _createDoctor(u, callback) {
	Doctor.find({'email':u.email}).exec(function(err,doctor){
		if(doctor.length){
			callback(true,'error');
		}
		else{
			u.password=sha1(u.password);
			doctor=new Doctor(u);
			doctor.save(function(err,result){
				if(err){
					throw"Can not create new Doctor";
				}
				else{
					if(typeof callback=="function"){
						callback(false,result);
					}
				}
			})
		}
	})
}
function _checkpassword(id,password,callback)
{
	pass=sha1(password);
	console.log(pass);
	Doctor.findOne({'_id':id,'password':pass}).exec(function(err,doctor){
		if(err){
			callback(true,'error');
		}
		else{
			if(doctor){
				callback(false,doctor);
			}
			else callback(true,'error');
		}
	});
}
function _createDoctors(u, callback) {
	u.password = sha1(u.password);
	doctor = new Doctor(u);
  	Doctor.create(doctor,function(err){
    if(err)
    {
        throw"Can not create new doctor";
    }
    else
    {
      for (var i=1; i<arguments.length; ++i) {
        var candy = arguments[i];
        Doctor.update({'_id':candy._id},{DT_RowId:candy._id},function(){});
    }
    }
  })
}
function _selectDoctor(id, callback) {
	Doctor.find({'_id': id}).exec(function(err, doctor){
		callback(err, doctor);
	});
}
function _Rowid(id,u,callback){
  Doctor.update({'_id':id},u,function(){});
}
function _listDoctor(callback) {
	Doctor.find().select().exec(function(err, doctor) {
		callback(err, doctor);
	});
}
function _getdoctor(u,callback)
{
	Doctor.find({'department':u}).exec(function(err,doctor){
		callback(err,doctor);
	});	
}
function _getDepartment(u,callback)
{
	Doctor.findOne({'fullname':u}).exec(function(err,department){
		callback(err,department);
	});
}
function _updateDoctor(id, u ,callback) {	
	Doctor.update({'_id': id}, u, function(err, result){
		if (err) {
			throw "Can not update Doctor";
		}
		else {
			if (result) {
				callback(false);				
			}
		}
	});
}
function _login(u, callback) {
	u.password = sha1(u.password);
	Doctor.findOne({'email': u.email, 'password': u.password }, function(err, result) {	
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

function _deleteDoctor(id, callback) {
	var res=[];
 	res= id.split(",");
  	for (var index in res) {
    if(index==0)
    {
        Doctor.remove({'_id':res[index]},function(err,result){
        if(err)
        {
         throw"Can not delete doctor";
        }
        else if (typeof callback == "function") {
         callback(false, result);
        }
      });
    }
    else {
      Doctor.remove({'_id':res[index]},function(err,doctor){
      });
    }
  }
}
module.exports = {
	checkpassword:_checkpassword,
	getDepartment:_getDepartment,
	getdoctor:_getdoctor,
	select:_selectDoctor,
	rowid:_Rowid,
	create: _createDoctor,
	list: _listDoctor,
	update:_updateDoctor,
	del:_deleteDoctor,
	creates:_createDoctors,
	login:_login
};