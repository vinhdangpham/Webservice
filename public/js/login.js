$(document).ready(function(){
	$('#myForm').validate({
		errorClass: "my-error-class",
		rules: {
    		email: {
        		email: true,
        		minlength: 6,
    		},
    		password: {
       			required: true,
    		}
		},
		messages: {
			email: {
    			email: "Nhập đúng chuẩn email có @",
    			minlength: "Nhập trên 6 kí tự",
			},
				password:"Đề nghị bạn nhập password"
		}	
	});
	login();
});
function login()
{
	$('#myForm').on('submit', function(e){
		e.preventDefault();
		var email = $(this).find('input[name=email]').val();
		var password = $(this).find('input[name=password]').val();
			$.ajax({
				type: 'POST',
				url: '/adminlogin',
				data: {
					email: email,
					password: password
				},
				dataType: 'JSON',
				success: function(r){
					if(r.status==1){
						swal('Quyền Admin','Bạn Đã Đăng Nhập Thành Công','success');
						var delay = 1000;
						var url = '/manager/index';
						setTimeout(function(){ $(location).attr('href',url); }, delay);	
					}
					else if(r.status==2){
						swal('Quyền Bác Sĩ','Bạn Đã Đăng Nhập Thành Công','success');
						var delay = 1000;
						var url = '/doctors/index';
						setTimeout(function(){ $(location).attr('href',url); }, delay);	
					}
					else{
						swal("Thất bại", "Email hoặc mật khẩu không đúng", "warning");
					}
				}
			});
	});
}