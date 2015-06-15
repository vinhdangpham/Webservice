
$(document).ready(function(){
    edit_dataTable();
    validate();
});
function validate()
{
    $('#add').validate({
        errorClass: "my-error-class",
        rules: {
            email:{
                email:true,
            },

        },
        messages: {
            email:{
                email:"Đề nghị bạn nhập đúng chuẩn email",
            },
        }
    });
     $('#edit-validate').validate({
        errorClass: "my-error-class",
        rules: {
            edit_email:{
                email:true,
            },

        },
        messages: {
            edit_email:{
                email:"Đề nghị bạn nhập đúng chuẩn email"
            }
        }
    });
}
function edit_dataTable()
{
    $(".edit").attr('disabled', 'disabled');
    $(".delete").attr('disabled', 'disabled'); 
        $('.table-admin').dataTable( {
        "ajax": "/admin",
        "columns": [
            { "data": "fullname" },
            { "data": "email" },
            { "data": "username" },
            { "data": "createdate" },
        ]
    } );
    $(".edit").click(function(){
        $.ajax({
            type:"GET",
            datatype:"json",
            url:"/admin/"+selected,
            success:function(r){
                $.each(r.data, function(i, e){
                     $("input[name='edit-username']").val(e.username);
                    $("input[name='edit-fullname']").val(e.fullname);
                    $("input[name='edit_email']").val(e.email);
                    $("input[name='edit-department']").val(e.department);
                });
                
            }
        });
    }); 
    $('#edit-admin').click(function(){
        var data={}
        var fullname=$("input[name='edit-fullname']").val();
        var email=$("input[name='edit_email']").val();
        var username=$("input[name='edit-username']").val();
        data={email:email,fullname:fullname,username:username};
        var level="admin";
        $.ajax({
            type:"PUT",
            datatype:"json",
            data:data,
            url:"/admin/"+selected,
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
        var username=$("input[name='username']").val();
        $.ajax({
            type:"POST",
            datatype:"json",
            data:{email:email,fullname:fullname,password:password,username:username},
            url:"/admin",
            success:function(r){
                $("#myModal").modal("hide");
                 table.ajax.reload( null, false );
                    $("input[name='fullname']").val("");
                    $("input[name='email']").val("");
                    $("input[name='password']").val("");
                    $("input[name='username']").val("");
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
            title:"Xóa Admin",
            text:"Bạn có chắc muốn xóa admin",
            type:"warning",
            showCancelButton: true,
            cancelButtonText: 'Hủy bỏ', 
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Đồng ý",   
            closeOnConfirm: false 
        },function(){
            $.ajax({
            type:"DELETE",
            url:"/admin/"+selected,
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