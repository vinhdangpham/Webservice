function login()
{
	var data = {};
	$('input,checkbox').each(function(index, item) {
		var value = $(this).val();
		var key = $(this).attr('name');
	});
	console.log(data);
	// $.post('/login', data, function(r) {
	// 	if (!r.code) {
	// 		$.redirect('index.jade');
	// 	}
	// 	else{
	// 		$('.alert').addClass('btn-danger').html('Create question fail!');
	// 	}
	// })

}