
$(document).ready(function(){
    edit_dataTable();
});
function selectdoctor(id)
{
    var inArray;
    console.log(id)
    $.ajax({
        type:'GET',
        datatype:'json',
        url:'/doctor/'+id,
        async: !1,
        success:function(r)
        {
            inArray=r.data;
        }
    })
    console.log(inArray);
    return inArray;
}
function edit_dataTable()
{
    $(".edit").attr('disabled', 'disabled');
    $(".delete").attr('disabled', 'disabled'); 
        $('.table-admin').DataTable({
        dom:"Tfrtip",
        ajax:"/exam",
            columns:[
            { data:"nameuser"},
            { data :"namedoctor"},
            { data: "date"},
            { data: "detail" },
            { data: "fullname" },
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
                    $("input[name='edit-email']").val(e.email);
                    $("input[name='edit-department']").val(e.department);
                });
                
            }
        });
    }); 
    $('#edit-admin').click(function(){
        var data={}
        var fullname=$("input[name='edit-fullname']").val();
        var email=$("input[name='edit-email']").val();
        var username=$("input[name='edit-username']").val();
        if(!($("input[name='edit-password']").val()==null))
        {
            password=$("input[name='edit-password']").val();
            data={email:email,fullname:fullname,password:password,username:username};
        }
        else
        {
            data={email:email,fullname:fullname,username:username};
        }
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
            title:"Xóa Lịch khám",
            text:"Bạn có chắc muốn xóa Lịch khám",
            type:"warning",
            showCancelButton: true,
            cancelButtonText: 'Hủy bỏ', 
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Đồng ý",   
            closeOnConfirm: false 
        },function(){
            $.ajax({
            type:"DELETE",
            url:"/exam/"+selected,
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