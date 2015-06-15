$(document).ready(function(){
	// body...
	$('#form-pass').validate({
		errorClass: "my-error-class",
		rules: {
    		email: {
        		email: true,
        		minlength: 6,
    		}
		},
		messages: {
			email: {
    			required: "Đề nghị bạn nhập Email",
    			minlength: "Nhập trên 6 kí tự",
			}
		}	
	});
	checkEmail();
});
function checkEmail()
{
	$('#form-pass').on('submit', function(e){
		var email = $(this).find('input[name=email]').val();
		e.preventDefault();	
		$.ajax({
			type: 'GET',
			url: '/admin/infor/'+ email,
			dataType: 'JSON',
			success: function(r) {
				console.log("ok");
				console.log(r);
				if(r.status==1) {
					updateStringRandom(r.id, email);
				}
				else swal('Email không tồn tại','','error');
			}
		});
	});
}


function updateStringRandom(id, email)
{	
	var randpassword= Math.random().toString(36).slice(-10);
	$.ajax({
		type: 'PUT',
		url: '/admin/reset/password/'+ id,
		data: {
			email: email,
			random: randpassword
		},
		success: function(r){
			console.log(r);
			if(r.status==1){
				swal('Thành công','Kiểm tra email để reset password','success');
				var delay = 5000;
				var url = '/manager/index';
				setTimeout(function(){ $(location).attr('href',url); }, delay);	
			}
			else swal('Lỗi','Có lỗi xảy ra vui lòng thử lại','error');
		}
	});
}