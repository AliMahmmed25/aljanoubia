$(document).ready(function () {
    get_table();
    document.getElementById('username').innerHTML = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
    document.getElementById('jobtital').innerHTML = "مستخدم";

});
tableData = null;
function get_table() {

    var data_response;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    myHeaders.append("active", "-1")
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(localStorage.getItem("urllocal").concat("Categorie/GetAll"), requestOptions)
        .then(response => response.json())

        .then(response => {
            data_response = { data: response };
            tableData = $("#exportexample").dataTable({
                "retrieve": true,
                "data": response,
                "columns": [
                    { "data": "id" },
                    { "data": "name" },
                    {
                        "data": "is_active",
                        render: function (data, type, row, meta) {

                            if (data == true) {
                                data = " فعال";
                                return data;

                            } else {
                                data = "غير فعال";
                                return data;
                            }
                            data;
                        }
                    },
                    {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return `<div class="btn-group" role="group" aria-label="Basic example">
								  <button class="btn btn-light" onclick="EditView(${row.id},'${row.name}',${row.is_active})"><i class="fe fe-edit-2"></i></button>
								</div>`
                            data;
                        }
                    }
                ],
                "lengthChange": true,
                "language": {
                    "searchPlaceholder": 'ابحث هنا ...',
                    "sSearch": '',
                    "lengthMenu": '_MENU_ عناصر/صفحة',
                },
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'copy',
                        text: 'نسخ'
                    },
                    {
                        extend: 'print',
                        text: 'طباعة'
                    },
                    {
                        extend: 'excel',
                        text: 'تحميل بصيغة Excel'
                    },
                    {
                        extend: 'pdfHtml5',
                        text: 'تحميل بصيغة PDF'
                    },
                    {
                        extend: 'colvis',
                        text: 'عرض الحقول'
                    },

                ],
                "ordering": false,
                "paging": true,
                "searching": true,
                "pagingType": "simple_numbers",
                "pageLength": 10,
                "destroy": true,
            });
        })
        .catch(err => console.log("ERROR!: ", err));

}
function EditView(id, name, is_active) {
    document.getElementById("txtID").value = id;
    document.getElementById("txtName2").value = name;
    if (is_active == true) {
        document.getElementById('active2').value = 0;
    } else if (is_active == false) {
        document.getElementById('active2').value = 1;
    }

    $('#modalEdit').modal('show');
}

function add_new_cat() {
    

    if (document.getElementById("txtName").value.length == 0) {
        alert("حقل الاسم فارغ ! ");
    }
    if (document.getElementById("active").value.length == 0) {
        alert("يرجى اختيار حالة التصنيف ! ");
    }
    if (active == 0) {
        active = true;
    }
    else if (active == 1) {
        active = false;
    }
    var txtName = document.getElementById("txtName").value;
    var active = document.getElementById("active").value;
    var settings = {
        "url": localStorage.getItem("urllocal").concat("Categorie/Create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "name": txtName,
            "is_active": active
        }),
    };

    $.ajax(settings).done(function (response) {
        $('#modalSave').modal('hide');
        reload();

    });


}
function edit_cat() {
  

    if (document.getElementById("txtName2").value.length == 0) {
        alert("حقل الاسم فارغ ! ");
    }
    if (document.getElementById("active2").value.length == 0) {
        alert("يرجى اختيار حالة التصنيف ! ");
    }
    var txtid = document.getElementById("txtID").value;
    var txtName = document.getElementById("txtName2").value;
    var active = document.getElementById("active2").value;
    if (active == 0) {
        active = true;
    }
    else if (active == 1) {
        active = false;
    }
    
    var settings = {
        "url": localStorage.getItem("urllocal").concat("Categorie/Create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "id":txtid,
            "name": txtName,
            "is_active": active
        }),
    };

    $.ajax(settings).done(function (response) {
        
        $('#modalEdit').modal('hide');
        reload();

    });


}
function reload() {
    location.reload();
}