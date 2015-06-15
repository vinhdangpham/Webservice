
$(document).ready(function(){
	doctor_user();
    doctor_exam();
});
function doctor_exam()
{
    var id=$("#id_doctor").text();
    console.log(id);
    $.ajax({
        type:'GET',
        url: "/doctor/exam/"+id,
        datatype:"json",
        success:function(r)
        {
            if(r.status==1)
            {
                console.log("ok");
                 showdoctor();
            }
            if(r.status==0)
            {
                 swal("Thông Báo", "Bạn chưa có lịch khám", "warning");
            }
        }
    });
}
function showdoctor()
{
     var id=$("#id_doctor").text();
     console.log(id);
    $('.table-exam').dataTable( {
        "ajax": "/doctor/exam/"+id,
            "columns": [
                { "data": "nameuser" },
                { "data": "date" },
                { "data": "detail" },
                { "data": "fullname" },
                ]
        } );
}
function doctor_user()
{
	 $('#button').click( function () {
       swal({
            title:"Xóa người chơi",
            text:"Bạn có chắc muốn xóa người chơi",
            type:"warning",
            showCancelButton: true,
            cancelButtonText: 'Hủy bỏ', 
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Đồng ý",   
            closeOnConfirm: false 
        },function(){
            $.ajax({
            type:"DELETE",
            url:"/doctor/"+selected,
            datatype:"json",
            data:{id:selected},
            success:function(r){
                  table.ajax.reload( null, false );
            }
            })
             swal("Deleted!", "Bạn xóa thành công.", "success");
    });   
    } );
}