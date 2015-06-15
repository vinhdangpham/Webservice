
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
        "ajax": "/user",
        "columns": [
            { "data": "fullname" },
            { "data": "email" },
            { "data": "address" },
            { "data": "phone" },
            {"data":"birthday"},
            { "data": "gender" },
            { "data": "indentification" },
            { "data": "country" },
            { "data": "createdate" },
        ]
    } );
    $(".edit").click(function(){
        $.ajax({
            type:"GET",
            datatype:"json",
            url:"/user/"+selected,
            success:function(r){
                $.each(r.data, function(i, e){
                    $("input[name='edit-fullname']").val(e.fullname);
                    $("input[name='edit_email']").val(e.email);
                    $("textarea[name='edit-address']").val(e.address);
                    $("input[name='edit-phone']").val(e.phone);
                    $("input[name='edit-birthday']").val(e.birthday);
                    $("input[name='edit-indentification']").val(e.indentification);
                    $("input[name='edit-country']").val(e.country);
                    $("select[name='edit-gender']").val(e.gender);
                });
                
            }
        });
    }); 
    $('#edit-admin').click(function(){
        var data={}
        var fullname=$("input[name='edit-fullname']").val();
        var email=$("input[name='edit_email']").val();
        var address=$("textarea[name='edit-address']").val();
        var phone=$("input[name='edit-phone']").val();
        var birthday= $("input[name='edit-birthday']").val();
        var indentification=$("input[name='edit-indentification']").val();
        var country=$("input[name='edit-country']").val();
        var gender=$("select[name='edit-gender']").val();
        data={email:email,fullname:fullname,gender:gender,birthday:birthday,address:address,phone:phone,indentification:indentification,country:country};
        var level="admin";
        $.ajax({
            type:"PUT",
            datatype:"json",
            data:data,
            url:"/user/"+selected,
            success:function(r){
                $("#edit").modal("hide");
                 table.ajax.reload( null, false );
                 console.log("ok");
                 selected.shift();
            }
        });
    });
    $('#add-admin').click(function(){
        var fullname=$("input[name='fullname']").val();
        var email=$("input[name='email']").val();
        var password=$("input[name='password']").val();
        var address=$("textarea[name='address']").val();
        var phone=$("input[name='phone']").val();
        var indentification=$("input[name='indentification']").val();
        var country=$("input[name='country']").val();
        var gender=$("select[name='gender']").val();
        var birthday= $("input[name='birthday']").val();
        $.ajax({
            type:"POST",
            datatype:"json",
            data:{email:email,birthday:birthday,fullname:fullname,gender:gender,password:password,address:address,phone:phone,indentification:indentification,country:country},
            url:"/user",
            success:function(r){
                $("#myModal").modal("hide");
                 table.ajax.reload( null, false );
                    $("input[name='fullname']").val("");
                    $("input[name='email']").val("");
                    $("input[name='password']").val("");
                    $("textarea[name='address']").val("");
                    $("input[name='phone']").val("");
                    $("input[name='indentification']").val("");
                    $("input[name='country']").val("");
                    $("select[name='gender']").val("");
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
            title:"Xóa người bệnh nhân",
            text:"Bạn có chắc muốn xóa bệnh nhân",
            type:"warning",
            showCancelButton: true,
            cancelButtonText: 'Hủy bỏ', 
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Đồng ý",   
            closeOnConfirm: false 
        },function(){
            $.ajax({
            type:"DELETE",
            url:"/user/"+selected,
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