$(document).ready(function(){
	uploadImage();
	removeImage();
});
function uploadImage()
{    
    $('#image').on('change', function(e){        
        e.preventDefault();
        var image = $(this).val();
        var files = e.target.files;
        $.each(files, function(i,e){
        	if(e.type != "image/bmp" && e.type != "image/jpeg" && e.type != "image/png" && e.type != "image/gif") {
        		swal('Lỗi','Chọn không đúng định dạng file ảnh','error');
	            $(this).val('');
        	}        
        	else {
	            var form = $('.upload-image');    
	            var formData = new FormData($(form)[0]);            
	            $.ajax({
	            	type: 'POST',
	                url: '/doctor/upload',
	                data: formData,
	                async: false,
	                cache: false,
	                contentType: false,
	                processData: false,
	                success: function (r){
	                	if(!r.code) {
	                		console.log(r.name);
	                		$('.td-image').find('img').remove();
	                        $('.td-image').parent().find('a').remove();
	                        $('.td-image').find('input[name=name_of_image]').remove();
	                		$('.td-image').find('.images').append('<img src="/uploads/'+r.name+'" title="image">');
	                		$('.td-image').find('.images').append('<a class="remove-image">Xóa</a>');
	                		$('.td-image').find('.images').append('<input name="name_of_image" type="text" hidden="" value="'+r.name+'">');
	                	}
	                	else swal('Error','','error');
	                  }
	            });
	        }
        });
    });
}
function removeImage()
{
	$('.td-image').on('click','.remove-image', function(){    
        $(this).parent().find('img').remove();
        $(this).parent().parent().find('input').val('');
        $(this).parent().find('input[name=name_of_image]').remove();
        $(this).remove();
    });
}