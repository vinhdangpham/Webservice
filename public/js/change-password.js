$(document).ready(function(){
	reset();
	getpassword();
	validate();
});
function validate()
{
	$('#change').validate({
        errorClass: "my-error-class",
        rules: {
            old_password:{
            	required:true,
            },
            new_password:{
            	required:true,
            	minlength:6
            },
            confirm_password:{
            	required:true,
            	equalTo: "#password"
            }
        },
        messages: {
            old_password:{
            	required:"Đề nghị bạn nhập mật khẩu củ"
            },
            new_password:{
            	required:"Đề nghị bạn nhập mật khẩu mới",
            	minlength:"mật khẩu ít nhất 6 ký tự"
            },
            confirm_password:{
            	required:"Đề nghị bạn nhập lại mật khẩu",
            	equalTo:"Mật khẩu nhập lại không đúng"
            }
        }
    });
}
function getpassword()
{
	$('#btn-confirm').click(function(){
		var id=$("#id_admin").text();
		var old = $("input[name='old_password']").val();
		console.log(id);
		var newpass = $("input[name='confirm_password']").val();
		$.ajax({
			type:'POST',
			url:'/admin/checkpass',
			data:{id:id,password:old},
			dataType:'json',
			success:function(r){
				if(r.status==1)
				{
					newpassword(id,newpass);
				}
				else{
					 swal("Thông báo", "Thông tin nhập mật khẩu củ không đúng", "info");
				}
			}
		});
	});
}
function newpassword(id,password)
{
	$.ajax({
		type:'POST',
		dataType:'json',
		data:{id:id,password:password},
		url:'/admin/password',
		success:function(r){
			if(r.status==1)
			{
				url="/";
				delay=1500;
				setTimeout(function(){ $(location).attr('href',url); }, delay);
				swal("Thông báo", "Cập nhật mật khẩu thành công", "success");
			}
			else
			{
				 swal("Thông báo", "Cập nhật mật khẩu thất bại", "warning");
			}
		}
	});
}
function reset()
{
	$('#btn-reset').click(function(){
		$("input[name='old_password']").val("");
		$("input[name='new_password']").val("");
		$("input[name='confirm_password']").val("");
	});
}