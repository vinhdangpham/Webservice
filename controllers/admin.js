var Admin = require('../models/admin');
var Doctor=require('../models/doctor');
var crypto = require('crypto');

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
function _checkpassword(req,res)
{
	var id=req.body.id;
	var password=req.body.password;
	Admin.checkpassword(id,password,function(err,result){
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
	Admin.selectAdmin(id, function(err, result) {
		var password ={password:pass};
		Admin.rowid(id,password,function(){});
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
function _checkLogin(req, res) {
	var admin = req.body;
	Admin.checkLogin(admin, function(err, result){
		if (err) {
			res.send({
				code: "err.login.fail",
				message: "Can not login"
			});
		}
		else {
			res.send({
				code: 0,
				message: 'success'
			});
		}
	});
}

function _login(req, res) {
	if (!req.body.email || !req.body.password) {
		throw 'Missing email or password';
	}
	var email=req.body.email;
	var data = {
		email: req.body.email,
		password: req.body.password
	};	
	Admin.findEmailAndString(email, function(err, result){		
		if(err){
			Doctor.login(data, function(err, result) {
				if (err) {
					res.send({
					status:0
				});
			}
			else {
				if(result)
				{
					var session = req.session;
					session.id_doctor=result._id;
					session.fullname_doctor=result.fullname;
					res.send({
						status:2,
						id:result._id
					});
				}
			}
		});
		}
		else {
			Admin.login(data, function(err, result) {
				if (err) {
					res.send({
					status:0
				});
			}
			else {
				if(result)
				{
					var session = req.session;
					session.id_user=result._id;
					session.fullname=result.fullname;
					res.send({
						status:1
					});
				}
			}
		});
		}
	});
	
}
function _listAdmin(req, res) {
	Admin.listAdmin(function(err, result) {
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
function _updateString(req, res)
{
	var id = req.params.id;
	var admin = {
		password:sha1(req.body.random)
	};
	//Send Mail
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
	  	port: 465,
	  	secure: true,
	    auth: {
	        user: 'projectstudy1234@gmail.com',
	        pass: 'dangvinh92'
	    }
	});

	var mailOptions = {
	    from: 'Phạm Đăng Vinh<vinhdangpham@gmail.com>',
	    to: req.body.email,
	    subject: '[Reg Medic] Đổi mật khẩu Admin',
	    text: 'Đổi mật khẩu',
	    html: 'Mật khẩu mới của bạn là : <br>'+ req.body.random
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        console.log(error);
	    } else{
	        console.log('Message sent: ' + info.response);
	    }
	});

	Admin.updateAdmin(id, admin, function(err, result){
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				id:result._id
			});
		}
	});
}
function _findEmailAndString(req, res)
{
	var email = req.params.email;
	Admin.findEmailAndString(email, function(err, result){		
		if(err){
			res.send({
				status:0
			});
		}
		else {
			if(result) {				
				res.send({
					status:1,
					 id: result._id
				});
			}
		}
	});
}

function _selectAdmin(req, res) {
	var id = req.params.id
	Admin.selectAdmin(id, function(err, result) {
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

function _createAdmin(req, res) {
	var admin = {
		fullname: req.body.fullname,
		username:req.body.username,
		password:req.body.password,
		createdate:_getdate(),
		email:req.body.email
	};
	Admin.createAdmin(admin, function(err, result) {
		var row ={DT_RowId:result.id};
		Admin.rowid(result.id,row,function(){});
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			res.send({
				status:1,
				id: result._id
			});
		}
	});	
}

function _updateAdmin (req, res) {
	var id = req.params.id;
	var admin = {
		fullname: req.body.fullname,
		username:req.body.username,
		email:req.body.email
	};	
	Admin.updateAdmin(id, admin, function(err, result) {
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

function _deleteAdmin(req, res) {
	var id = req.params.id;
	Admin.deleteAdmin(id, function(err, resuft){
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
	changePassword:_changePassword,
	findemail:_findEmailAndString,
	updatepassword:_updateString,
	adminlogin:_login,
	login: _checkLogin,
	list: _listAdmin,
	select: _selectAdmin,
	create: _createAdmin,
	update: _updateAdmin,
	delete: _deleteAdmin
};