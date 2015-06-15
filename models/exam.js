var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Exam = mongoose.model('Exam', {
	namedoctor:String,
	nameuser:String,
	number:String,
	date : String,
	time:String,
	detail: String,
	fullname:String,
	DT_RowId:String,
	deparment:String,
	id_doctor: {type: String, ref: 'Doctor'},
	id_user: {type: String, ref: 'User'},
});

function _createExam(u, callback) {
	var exam=Exam(u);
	exam.save(function(err, result) {
		if (err) {
			throw "Can not create new exam";
		}
		else {
			console.log("success");
			if (typeof callback == "function") {
				callback(false, result);
			}
		}
	});
}
function _countNumber(id,callback)
{
	Exam.find({'id_doctor':id}).count(function(err,count){
		if(count==48)
		{
			callback(true,'error')
		}
		else {	
			callback(err, count);
		}
	});
}
function _selectExamdoc(id,callback){
	Exam.find({'id_doctor': id}).exec(function(err, result){
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
function _checkDepartment(id,deparment,date,callback)
{
	Exam.findOne({"id_user":id,"deparment":deparment,"date":date}).exec(function(err,result){
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
function _Rowid(id,u,callback){
  Exam.update({'_id':id},u,function(){});
}
function _listExam(callback) {
	Exam.find().exec(function(err, exam) {
		callback(err, exam);
	});
}
function _updateExam(id, u ,callback) {	
	Exam.update({'_id': id}, u, function(err, result){
		if (err) {
			throw "Can not update Exam";
		}
		else {
			if (result) {
				callback(false);				
			}
		}
	});
}
function _deleteExam(id, callback) {
	var res=[];
 	res= id.split(",");
  	for (var index in res) {
    if(index==0)
    {
        Exam.remove({'_id':res[index]},function(err,result){
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
      Exam.remove({'_id':res[index]},function(err,user){
      });
    }
  }
}
module.exports = {
	checkDepartment:_checkDepartment,
	selectdoc:_selectExamdoc,
	create: _createExam,
	list: _listExam,
	update:_updateExam,
	del:_deleteExam,
	rowid:_Rowid,
	countNumber:_countNumber
};