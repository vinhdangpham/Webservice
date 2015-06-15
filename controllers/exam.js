
var Exam = require('../models/exam');
var mongoose = require('mongoose');
function _listExam(req, res) {
	Exam.list(function(err, result) {
		if (err) {
			res.send({
				status:0,
			});
		}
		else {
			res.send({
				status:1,
				data:result
			});
		}
	});
}
function _getdoctor(id)
{
	var name=mongoose.model('Doctor').findById(id);
	return name;
}
function _selectExamdoc(req, res) {
	var id = req.params.id
	Exam.selectdoc(id, function(err, result) {
		if (err) {
			res.send({
				status:0
			});
		}
		if(result){
			res.send({
				status:1,
				data: result
			});
		}
	});
}
function _getuser(id)
{
	var name=mongoose.model('User').findById(id);
	return name;
}
function _time(hours,minutes)
{
	var time;
	if(minutes<10)
	{
		time=hours+":"+minutes+"0"; 
	}
	else{
		time=hours+":"+minutes
	}
	return time;
}
function _gettime(count)
{
    var time,hours,minutes;
	var d = new Date("July 13, 2015 08:00:00");
	var d2 = new Date("July 13, 2015 13:00:00");
	if(count<=24)
	{
		hours=d.getHours();
		minutes=d.getMinutes()+(10*count);
		if(minutes>=60)
		{
			hour=Math.floor(minutes/60);
			hours=hours+hour;
			minutes=minutes-(hour*60);
		}
		time=_time(hours,minutes);
	}
	else
	{
		hours=d2.getHours();
		minutes=d2.getMinutes()+(10*count);
		if(minutes>=60)
		{
			hour=Math.floor(minutes/60);
			hours=hours+hour;
			minutes=minutes-(hour*60);
		}
		time=_time(hours,minutes);
	}
	return time;
}
function _createExam(req, res) {
	var doctor,user,id_user,deparment;
	id_user=req.body.id_user;
	deparment=req.body.deparment;
	date=req.body.date;
	id_doctor=req.body.id_doctor;
	var exam = {
		id_doctor: req.body.id_doctor,
		id_user: req.body.id_user,
		date : date,
		detail: req.body.detail,
		fullname:req.body.fullname,
	};
	Exam.checkDepartment(id_user,deparment,date,function(err,result){
		if(err)
		{
			Exam.countNumber(id_doctor,function(err,count){
				if(err)
				{
					res.send({
						status:-1
					})
				}
				else
				{
					var time=_gettime(count);
					Exam.create(exam, function(err, result) {
					Exam.rowid(result._id,{time:time},function(){});
					Exam.rowid(result._id,{number:count+1},function(){});
					if(result.id_doctor!=null)
					{
						doctor=_getdoctor(req.body.id_doctor);
						doctor.exec(function(err,data){
							Exam.rowid(result._id,{namedoctor:data.fullname},function(){});
						});	
					}
					if(result.id_user!=null)
					{
						user=_getuser(req.body.id_user);
						user.exec(function(err,data){
							Exam.rowid(result._id,{nameuser:data.fullname},function(){});
						});
					}
					var row ={DT_RowId:result._id};
					Exam.rowid(result._id,row,function(){});
					if (err) {
						res.send({
						status:0
						});
					}
					else {
						res.send({
						message:"Thành công",
						'number':count,
						id:result._id,
						'time':time,
						status:1
					});
					}
				});
				}
			});
			
		}
		else{
			res.send({
				status:0
			})
		}
	});
	
	
}

function _updateExam (req, res) {
	var id = req.params.id;
	var exam = {
		id_doctor: req.body.id_doctor,
		id_user: req.body.id_user,
		date : req.body.date,
		detail: req.body.detail,
		fullname:req.body.fullname,
		birthday:req.body.birthday,
		gender:req.body.gender
	};

	Exam.update (id, exam, function(err, result) {
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

function _deleteExam(req, res) {
	var id = req.params.id;
	Exam.del(id, function(err, resuft){
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
	selectdoc:_selectExamdoc,
	list: _listExam,
	create: _createExam,
	update:_updateExam,
	del:_deleteExam,
};