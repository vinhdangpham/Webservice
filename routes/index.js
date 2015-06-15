var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/project');
//--import controller
var express = require('express');
var router = express.Router();
var admin =require('../controllers/admin');
var doctor=require('../controllers/doctor');
var user=require('../controllers/user');
var exam=require('../controllers/exam');
var room=require('../controllers/room');
var medicine=require('../controllers/medicine');
/*test*/
router.get('/img',function(req,res){
	res.render('image',{title:'image'});
});
router.get('/test',function(req,res,next){
	res.render('test',{title:'Danh Sách Thuốc'});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy();
  res.render('login', { title: 'Đăng nhập' });
});
router.get('/forgot-password',function(req,res){
	res.render('forgot-password',{title: 'Lấy lại mật khẩu'});
});
function isdoctor(req, res, next)
{
	if(req.session.id_doctor!=null)	
	{
		return next();
	}	
	else res.redirect('/');
}

// Doctor role
router.all('/doctors/*', isdoctor, function(req, res, next){
	next();
});
router.get('/doctors/index',function(req,res,next){
	res.render('layoutdoc',{title:'Trang Bác Sĩ',name:req.session.fullname_doctor,id:req.session.id_doctor});
});
router.get('/doctors/user',function(req,res,next){
	res.render('doctor_user',{title:'Danh Sách Bệnh Nhân',name:req.session.fullname_doctor,id:req.session.id_doctor});
});
router.get('/doctors/exam',function(req,res,next){
	res.render('doctor_exam',{title:'Danh Sách Lịch Khám',name:req.session.fullname_doctor,id:req.session.id_doctor})
});
router.get('/doctors/change',function(req,res,next){
	res.render('change-passworddoctor',{title:'Đổi mật khẩu bác sỉ',name:req.session.fullname_doctor,id:req.session.id_doctor})
});
router.get('/doctors/about',function(req,res,next){
	res.render('about-doc',{title:'Thông tin trang web',name:req.session.fullname_doctor})
});
router.get('/doctor/exam/:id',exam.selectdoc);
// Admin role

function isLogin(req, res, next)
{
	if(req.session.id_user!=null)	
	{
		return next();
	}	
	else res.redirect('/');
}

router.all('/manager/*', isLogin, function(req, res, next){
	next();
});
//_______Manager________
//Views
router.get('/manager/medicine',function(req,res,next){
	res.render('manager_medicine',{title:'Danh Sách Thuốc'});
});
router.get('/manager/index',function(req, res, next) {
  res.render('index', { title: 'Trang Chủ' ,name:req.session.fullname});
});
router.get('/manager/account/user', function(req, res, next){
	res.render('account_user', {title: 'Dang Sách Bệnh Nhân',name:req.session.fullname});
});
router.get('/manager/doctor',function(req,res,next){
	res.render('manager_doctor',{title:"Danh Sách Bác Sỉ",name:req.session.fullname});
});
router.get('/manager/change',function(req,res,next){
	res.render('change-password',{title:"Thay đổi mật khẩu",id:req.session.id_user,name:req.session.fullname});
});
router.get('/manager/exam',function(req,res,next){
	res.render('exam',{title:"Danh Sách Lịch Khám",name:req.session.fullname});
});
router.get('/manager/about',function(req,res,next){
	res.render('about',{title:'Thông tin trang web',name:req.session.fullname})
});
//Service
//Admin
router.get('/admin', admin.list);
router.get('/admin/:id', admin.select);
router.post('/admin', admin.create);
router.delete('/admin/:id',admin.delete);
router.put('/admin/:id', admin.update);
router.post('/adminlogin',admin.adminlogin);
router.get('/admin/infor/:email', admin.findemail);
router.post('/admin/password',admin.changePassword);
router.put('/admin/reset/password/:id',admin.updatepassword);
router.post('/admin/checkpass',admin.checkpassword);
router.get('/manager/account/admin', function(req, res, next){
	res.render('account_admin', {title: 'Danh Sách Bệnh Nhân',name:req.session.fullname});
});

//User
router.get('/user', user.list);
router.get('/user/:id', user.select);
router.post('/user', user.create);
router.delete('/user/:id',user.delete);
router.post('/login',user.login);
router.put('/user/:id', user.update);
router.post('/users',user.creates);
router.get('/user/infor/:email', user.findemail);
router.post('/user/password',user.changePassword);


//Doctor
router.post('/doctors',doctor.creates);
router.get('/doctor/:id',doctor.select);
router.get('/doctor', doctor.list);
router.post('/doctor', doctor.create);
router.put('/doctor/:id',doctor.update);
router.delete('/doctor/:id',doctor.del);
router.post('/doctor/upload',doctor.upload);
router.get('/department/:department',doctor.getdoctor);
router.get('/getdoctor/:fullname',doctor.getDepartment);
router.post('/doctor/checkpass',doctor.checkpassword);
router.post('/doctor/password',doctor.changepassword);
//Medicine
router.post('/medicine',medicine.create);
router.post('/medicines',medicine.creates);
router.get('/medicine',medicine.list);
router.put('/medicine/:id',medicine.update);
router.delete('/medicine/:id',medicine.delete);

//Exam
router.post('/exam',exam.create);
router.get('/exam',exam.list);
router.delete('/exam/:id',exam.del);
//-- Views

module.exports = router;