
$(document).ready(function(){
    edit_dataTable();
    $( "#birthday" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
    $( "#edit-birthday" ).datepicker({
      changeMonth: true,
      changeYear: true
    });
});
function edit_dataTable()
{
    $(".edit").attr('disabled', 'disabled');
    $(".delete").attr('disabled', 'disabled'); 
        $('.table-admin').dataTable( {
        "ajax": "/doctor",
        "columns": [
            { "data": "fullname" },
            { "data": "department" },
            { "data": "birthday" },
            { "data": "gender" },
            { "data": "address" },
            { "data": "certificate" },
            { "data": "experience" },
            {"data":"email"},
            { "data": "createdate" },
        ]
    } );
    $(".edit").click(function(){
        console.log(selected);
        $.ajax({
            type:"GET",
            dataType:"json",
            url:"/doctor/"+selected,
            success:function(r){
                console.log("ok");
                $.each(r.data, function(i, e){
                    $("input[name='edit-fullname']").val(e.fullname);
                    $("input[name='edit-department']").val(e.department);
                     $("input[name='edit-birthday']").val(e.birthday);
                    $("select[name='edit-gender']").val(e.gender);
                    $("input[name='edit-address']").val(e.address);
                    $("input[name='edit-email']").val(e.email);
                    $("textarea[name='edit-certificate']").val(e.certificate);
                    $("textarea[name='edit-experience']").val(e.experience);
                });
                
            }
        });
    }); 
    $('#edit-admin').click(function(){
        var data={}
        var fullname=$("input[name='edit-fullname']").val();
        var department=$("input[name='edit-department']").val();
        var gender=$("select[name='edit-gender']").val();
        var address=$("input[name='edit-address']").val();
        var email= $("input[name='edit-email']").val();
        var certificate=$("textarea[name='edit-certificate']").val();
        var experience=$("textarea[name='edit-experience']").val();
        if(!($("input[name='edit-birthday']").val()==null))
        {
            birthday=$("input[name='edit-birthday']").val();
            data={email:email,fullname:fullname,department:department,birthday:birthday,gender:gender,address:address,certificate:certificate,experience:experience};

        }
        else
        {
            data={fullname:fullname,department:department,gender:gender,address:address,certificate:certificate,experience:experience};
        }
        var level="admin";
        $.ajax({
            type:"PUT",
            datatype:"json",
            data:data,
            url:"/doctor/"+selected,
            success:function(r){
                $("#edit").modal("hide");
                 table.ajax.reload( null, false );
                 selected.shift();
            }
        });
    });
    $('#add').on('submit',function(e){
        e.preventDefault();
        var fullname=$("input[name='fullname']").val();
        var department=$("input[name='department']").val();
        var birthday=$("input[name='birthday']").val();
        var gender=$("select[name='gender']").val();
        var address=$("input[name='address']").val();
        var certificate=$("textarea[name='certificate']").val();
        var experience=$("textarea[name='experience']").val();
        var email=$("textarea[name='email']").val();
        var password=$("textarea[name='password']").val();
        $.ajax({
            type:"POST",
            dataType:"json",
            data:{fullname:fullname,email:email,password:password,department:department,birthday:birthday,gender:gender,address:address,certificate:certificate,experience:experience},
            url:"/doctor",
            success:function(r){
                $("#myModal").modal("hide");
                 table.ajax.reload( null, false );
                    $("input[name='fullname']").val("");
                    $("input[name='department']").val("");
                    $("input[name='birthday']").val("");
                    $("select[name='gender']").val("");
                    $("input[name='address']").val("");
                    $("textarea[name='certificate']").val("");
                    $("textarea[name='experience']").val("");
            }
        });
    });
    var table = $('.table-admin').DataTable();
    var selected=[];
    $('.table-admin').on( 'click', 'tr', function () {
        var id = this.id;
        var index = $.inArray(id, selected);
 
        if ( index === -1 ) {
            selected.push( id );
        } else {
            selected.splice( index, 1 );
        }
        $(this).toggleClass('selected');
        if(table.rows('.selected').data().length>=1)
        {
             $(".delete").removeAttr('disabled'); 
        }
        else{ $(".delete").attr('disabled', 'disabled'); }
        if(table.rows('.selected').data().length==1)
        {
            $(".edit").removeAttr('disabled'); 
        }
        if(table.rows('.selected').data().length>=2 || table.rows('.selected').data().length==0)
        {
             $(".edit").attr('disabled', 'disabled'); 
        }
    } );
 
    $('#button').click( function () {
       swal({
            title:"Xóa bác sĩ",
            text:"Bạn có chắc muốn xóa Bác sỉ",
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