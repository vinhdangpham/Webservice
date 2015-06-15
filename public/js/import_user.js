$(document).ready(function(){
var X=XLSX;
function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
	console.log(o);
}
function process_wb(wb) {
	var output = "";
	output = JSON.stringify(to_json(wb),2,2);
	return output;
}
function to_json(workbook) {
	var result = {};	
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}
	});
	return result;
}
var xlf = document.getElementById('xlf');
function handleFile(e) {
	var files = e.target.files;
	var f = files[0];
	{
		var reader = new FileReader();
		var name = f.name;
		reader.onload = function(e) {
			if(typeof console !== 'undefined') console.log("onload", new Date());
			var data = e.target.result;
			var wb;
			var arr = fixdata(data);
			wb = X.read(btoa(arr), {type: 'base64'});
			process_wb(wb);
			var contact = JSON.parse(process_wb(wb));
			console.log(contact);
			swal({
				title: "Import File",
				text: "Đồng ý chọn file này",
				type: "warning",
				showCancelButton: true,
				cancelButtonText: 'Hủy bỏ', 
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Đồng ý",   
				closeOnConfirm: false 
			}, 
			function(){
				url="/manager/account/user";
				delay=1000;
				setTimeout(function(){ $(location).attr('href',url); }, delay);
				$.ajax({
				type: 'POST',
				url: '/users',
				data: contact,
				dataType: 'json',
				success: function(r) {
					if(r.code==1)
					{
						swal('Thất bại','Dữ liệu bị lỗi','error');
					}
				}
			 })
			});	
			
			}
		};
	reader.readAsArrayBuffer(f);
}
$('#xlf').on('change',handleFile);
});