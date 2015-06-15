// $.fn.editable.defaults.mode = 'inline';
$(document).ready(function(){
	var username,password;
	login();
	getdata();
	edituser();
	deletedata();
	
});
function edituser()
{
	$('.table-user').on('click', '.edit-user', function(){
		var row = $(this).parent().parent();
		var useredit = row.find('input[name="username"]').val();
		var passedit = row.find('input[name="password"]').val();
		var id = row.data('id');
		console.log(id);
		swal({
			title: "",
			text: "Sửa User: " +useredit,
			type: "input",  
			showCancelButton: true,
			cancelButtonText: 'Hủy bỏ', 
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Đồng ý",   
			closeOnConfirm: false 
		},
		function(inputValue){   
			if (inputValue === false) return false;      
			if (inputValue === "") 
				{     
					swal.showInputError("Vui lòng điền tên");     
					return false   
				}
				$.ajax({
					type: 'PUT',
					url:'/update/'+id,
					data: {username:inputValue, password:passedit},
					dataType: 'json',
					success:function(r)
					{
						console.log('ok');
						row.find('input[name="username"]').val(inputValue);
						row.find('input[name="password"]').val(passedit);
						swal('', 'Đã lưu thành công','success');
					}
				})
		});
	});
}
function deletedata()
{
	$('.table-user').on('click', '.delete-user', function(){
		var row= $(this).parent().parent();
		var table=row.parent();
		var id=row.data('id');
		swal({
			title: "",
			text: "Bạn có muốn xóa User",
			type: "warning",  
			showCancelButton: true,
			cancelButtonText: 'Hủy bỏ', 
			confirmButtonColor: "#DD6B55",   
			confirmButtonText: "Đồng ý",   
			closeOnConfirm: false 
		},function(){
		$.ajax({
			type:'DELETE',
			url:'/delete/'+id,
			dataType:'json',
			success:function(){
				console.log('ok');
				row.remove();
				swal('Thành công','Đã xóa user','success');
			}
		})
		});
	});
}
function getdata()
{
	var user="#username";
	$.ajax({
		type: 'GET',
		url: '/user',
		dataType: 'json',
		success: function(r){
			if(!r.code) {
				$.each(r.data, function(i, e) {
// <td><input type="text" disabled name="username'+e._id+'" value="'+e.username+'"></td>
					$('.table-user').append('<tr data-id="'+e._id+'"><td>'+(i+1)+'</td><td><a href="#" id="username'+e._id+'">'+e.username+'</a></td><td><input name="password'+e._id+'" type="password" disabled value="'+e.password+'" ></td><td><a class="glyphicon glyphicon-edit edit-user" title="Sửa"></a><a class="glyphicon glyphicon-remove delete-user" title="Xóa"></a></td></tr>');
					var username=user+e._id;
					$(username).editable({
					    success: function(response, newValue) {
					    	console.log(newValue);
					    	$.ajax({
					    		type:'PUT',
					    		url:'/update/'+e._id,
					    		dataType:'json',
					    		data:{username:newValue}
					    	})
					    }
					});
				});
			}
			else swal('Lỗi', 'Có lỗi xảy ra', 'error');
		}
	});
}
function login()
{
	$('#login').click(function(){
	username = $("[name=username]").val();
	password = $("[name=password]").val();
		console.log(username);
		console.log(password);
		$.ajax({
				type: 'POST',
				url: '/login',
				data: {username: username,password:password},
				dataType: 'json',
				success: function() {console.log('ok');}
			})
	 });
}