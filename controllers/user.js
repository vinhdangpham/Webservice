var User = require('../models/user');
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
function _login(req, res) {
	if (!req.body.email || !req.body.password) {
		throw 'Missing email or password';
	}
	var user = {
		email: req.body.email,
		password: req.body.password
	};	

	User.login(user, function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		else {
			if(result)
			{
				res.send({
					id:result._id,
					status:1
				});
			}
		}
	});
}
function _changePassword(req,res)
{
	var id=req.body.id;
	var pass=sha1(req.body.password);
	User.selectUser(id, function(err, result) {
		var password ={password:pass};
		User.rowid(id,password,function(){});
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
function _findEmailAndString(req, res)
{
	var email = req.params.email;
	User.findEmailAndString(email, function(err, result){		
		if(err){
			res.send({
				status:0
			});
		}
		else {
			if(result) {
				var randpassword= Math.random().toString(36).slice(-10);
				var user = {
					password: sha1(randpassword)
				};
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
	    			to: email,
	    			subject: '[Reg Medic] Đổi mật khẩu',
	    			text: 'Đổi mật khẩu',
	    			html: 'Mật khẩu mới của bạn là : <br>'+ randpassword
				};

				transporter.sendMail(mailOptions, function(error, info){
	    			if(error){
	        			console.log(error);
	    			} else{
	        			console.log('Message sent: ' + info.response);
	    			}
				});

				User.updateUser(result._id, user, function(err, result){
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
		}
	});
}
function _checkLogin(req, res) {
	var user = req.body;
	User.checkLogin(user, function(err, result){
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

function _listUser(req, res) {
	User.listUser(function(err, result) {
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


function _createUsers(req, res) {
	for(var number=0;number<=10000;number++)
	{
		for(var a in req.body)
		{
		if(req.body[a][number].fullname!=null)
		{	
			var user = {
				fullname: req.body[a][number].fullname,
				phone: req.body[a][number].phone,
				address: req.body[a][number].address,
				gender: req.body[a][number].gender,
				indentification: req.body[a][number].indentification,	
				country: req.body[a][number].country,
				password: req.body[a][number].password,
				email:req.body[a][number].email,
				birthday:req.body[a][number].birthday,
				createdate: _getdate(),
			};
			User.createUsers(user, function(err, result) {
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

function _selectUser(req, res) {
	var id = req.params.id
	User.selectUser(id, function(err, result) {
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

function _createUser(req, res) {
	var user = {
		fullname: req.body.fullname,
		password:req.body.password,
		gender:req.body.gender,
		indentification:req.body.indentification,
		country:req.body.country,
		address:req.body.address,
		phone:req.body.phone,
		createdate:_getdate(),
		email:req.body.email,
		birthday:req.body.birthday
	};
	User.createUser(user, function(err, result) {
		var row ={DT_RowId:result.id};
		User.rowid(result.id,row,function(){});
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

function _updateUser (req, res) {
	var id = req.params.id;
	var user = {
		fullname: req.body.fullname,
		gender:req.body.gender,
		indentification:req.body.indentification,
		country:req.body.country,
		address:req.body.address,
		phone:req.body.phone,
		email:req.body.email,
		birthday:req.body.birthday
	}
	User.updateUser(id, user, function(err, result) {
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

function _deleteUser(req, res) {
	var id = req.params.id;
	User.deleteUser(id, function(err, resuft){
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
	changePassword:_changePassword,
	findemail:_findEmailAndString,
	creates:_createUsers,
	login: _checkLogin,
	list: _listUser,
	select: _selectUser,
	create: _createUser,
	update: _updateUser,
	delete: _deleteUser,
	login:_login
};
