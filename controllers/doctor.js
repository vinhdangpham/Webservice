var Doctor= require('../models/doctor');
var Exam=require('../models/exam');
var User=require('../models/user');
var crypto = require('crypto');
var sha1 = function(input){
    return crypto.createHash('sha1').update(input.toString()).digest('hex');
};
function _listDoctor(req, res) {
	Doctor.list(function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				data: result
			});
		}
	});
}
function _upload(req,res)
{
	if(req.files){
		res.send({
			code:0,
			name:req.files.image.name
		})
	}
}
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
function _checkpassword(req,res)
{
	var id=req.body.id;
	var password=req.body.password;
	Doctor.checkpassword(id,password,function(err,result){
		if(err)
		{
			res.send({
				status:0
			});
		}
		else{
			res.send({
				status:1
			});
		}
	});
}
function _changePassword(req,res)
{
	
	var id=req.body.id;
	var pass=sha1(req.body.password);
	Doctor.select(id, function(err, result) {
		
		var password ={password:pass};
		Doctor.rowid(id,password,function(){});
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				data: result
			});
		}
	});
}
function _selectDoctor(req, res) {
	var id = req.params.id;
	Doctor.select(id, function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				data: result
			});
		}
	});
}
function _getDepartment(req,res){
	var fullname=req.params.fullname;
	Doctor.getDepartment(fullname,function(err,result){
		if(err){
			res.send({
				status:0
			})
		}
		else{
			res.send({
				status:1,
				department:result.department
			})
		}
	})
}
function _getdoctor(req,res){
	var department=req.params.department;
	Doctor.getdoctor(department,function(err,result){
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				data: result
			});
		}
	})
}

function _createDoctors(req, res) {
	for(var number=0;number<=10000;number++)
	{
		for(var a in req.body)
		{
		if(req.body[a][number].fullname!=null)
		{	
			var user = {
				department : req.body[a][number].department,
				fullname : req.body[a][number].fullname,
				birthday : req.body[a][number].birthday,
				gender: req.body[a][number].gender,
				address : req.body[a][number].address,
				certificate : req.body[a][number].certificate,//bằng cấp
				experience : req.body[a][number].experience,//kinh nghiem
				createdate:_getdate(),
				email:req.body[a][number].email,
				password:req.body[a][number].password
			};
			Doctor.creates(user, function(err, result) {
				if (err) {
					res.send({
						status:0
				});
				}
			});
		}
	}
}
}
function _createDoctor(req, res) {
	var doctor = {
		department : req.body.department,
		fullname : req.body.fullname,
		birthday : req.body.birthday,
		gender: req.body.gender,
		address : req.body.address,
		certificate : req.body.certificate,//bằng cấp
		experience : req.body.experience,//kinh nghiem
		email:req.body.email,
		password:req.body.password,
		createdate:_getdate()
	};
	Doctor.create(doctor, function(err, result) {
		var row ={DT_RowId:result.id};
		Doctor.rowid(result.id,row,function(){});
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				id:result._id,
			});
		}
	});
}
function _updateDoctor (req, res) {
	var id = req.params.id;
	var user = {
		department : req.body.department,
		fullname : req.body.fullname,
		birthday : req.body.birthday,
		gender: req.body.gender,
		address : req.body.address,
		certificate : req.body.certificate,//bằng cấp
		experience : req.body.experience//kinh nghiem
	};

	Doctor.update (id, user, function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				data: result
			});
		}
	});

}

function _deleteDoctor(req, res) {
	var id = req.params.id;
	Doctor.del(id, function(err, resuft){
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
	checkpassword:_checkpassword,
	changepassword:_changePassword,
	getDepartment:_getDepartment,
	getdoctor:_getdoctor,
	select:_selectDoctor,
	list: _listDoctor,
	create: _createDoctor,
	update:_updateDoctor,
	del:_deleteDoctor,
	creates:_createDoctors,
	upload:_upload
};