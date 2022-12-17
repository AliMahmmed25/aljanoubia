$(document).ready(function () {
    get_table();
    document.getElementById('username').innerHTML = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
    document.getElementById('jobtital').innerHTML = "مستخدم";

});
tableData = null;

function get_table() {
    $.ajax({

        "url": localStorage.getItem("urllocal").concat("NewsType/GetAll"),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token"),
            "active": 0

        },
        success: function (response) {
            Accounts = response;
            for (var i = 0; i < response.length; i++) {
                var id = response[i]['id'];
                var name = response[i]['name'];
                $("#NewsTypesID").append("<option value='" + id + "'>" + name + "</option>");
                $("#NewsTypesID2").append("<option value='" + id + "'>" + name + "</option>");
            }


        },
        error: function (response) {
            alert(response.responseText);
        }
    });

    var data_response;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    myHeaders.append("active", "-1")
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(localStorage.getItem("urllocal").concat("News/GetAll"), requestOptions)
        .then(response => response.json())

        .then(response => {
            data_response = { data: response };
            tableData = $("#exportexample").dataTable({
                "retrieve": true,
                "data": response,
                "columns": [
                    { "data": "id" },
                    { "data": "title" },
                    { "data": "news_types" },
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
function EditView(id) {
    var index;
    document.getElementById("txtID").value = id;
    document.getElementById("NewsTypesID2").value = users[1].first_name;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            index = i;
        }
    }
    console.log(users[index]);
    document.getElementById("txtFirstName2").value = users[index].first_name;
    document.getElementById("txtLastName2").value = users[index].last_name;
    document.getElementById("txtUserName2").value = users[index].user_name;
    document.getElementById("txtPassword2").value = users[index].password;
    document.getElementById("active2").value = users[index].is_active == true ? 0 : 1;
    console.log(numToString(parseInt(users[index].user_permissions, 10), 2, 8));
    var strPermission = numToString(parseInt(users[index].user_permissions, 10), 2, 8);

    while (strPermission.Length < 8) { strPermission = "0" + strPermission; }
    console.log(strPermission[7]);
    var permassion2 = "";
    if (strPermission[7] == 1) {
        permassion2 += 'الاعدادت';
        permassion2 += ',';
    }
    if (strPermission[6] == 1) {
        permassion2 += 'تعديل معلومات برنامج معين';
        permassion2 += ',';
    }
    if (strPermission[5] == 1) {
        permassion2 += 'اضافة برنامج';
        permassion2 += ',';
    }
    document.getElementById("justAnInputBox2").value = permassion2;
    $('#modalEdit').modal('show');
}
function add_new_news1() {
    // Assume you have a file input with the ID 'file-input'
    console.log("begin");
    var fileInput = $('#thefiles');

        var file = fileInput.prop('files')[0];
        var data = new FormData();
        data.append('file', file);
        console.log(data.get('file'));
        var settings = {
            "url": localStorage.getItem("urllocal").concat("News/UploadImage"),
            "method": "POST",
            "headers": {
                "Authorization": localStorage.getItem("token")
            },
            "data": data,
            processData: false, // Tell jQuery not to process the data
            contentType: false,
            success: function (response) {
                console.log(response);
            },
            error: function (response) {
                alert(response.responseText);
            } // Tell jQuery not to set the content type of the data
        };  
        $.ajax(settings).done(function (response) {
            console.log(response);
    
        });
        


}
function add_new_news() {
    if (document.getElementById("NewsTypesID").value == 0) {
        alert("يرجى اختيار نوع الخبر ! ");
    }
    if (document.getElementById("title").value.length == 0) {
        alert("يرجى كتابة عنوان الخبر! ");
    }
    if (document.getElementById("description").value.length == 0) {
        alert("يرجى كتابة تفاصيل الخبر! ");
    }
    var data = {

        "news_type_id": document.getElementById("NewsTypesID").value,
        "title": document.getElementById("title").value,
        "description": document.getElementById("description").value,
        "news_images": [
            {
                "path": "string"
            }
        ]
    };
    console.log(data);
    var settings = {
        "url": localStorage.getItem("urllocal").concat("News/Create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(data),
    };

    $.ajax(settings).done(function (response) {
        $('#modalSave').modal('hide');
        reload();

    });


}
function edit_cat() {
    var txtid = document.getElementById("txtID").value;
    var txtName = document.getElementById("txtName2").value;
    var active = document.getElementById("active2").value;

    if (document.getElementById("txtName2").value.length == 0) {
        alert("حقل الاسم فارغ ! ");
    }
    if (document.getElementById("active2").value.length == 0) {
        alert("يرجى اختيار حالة التصنيف ! ");
    }
    if (active == 0) {
        active = true;
    }
    else if (active == 1) {
        active = false;
    }

    var settings = {
        "url": localStorage.getItem("urllocal").concat("NewsType/Create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "id": txtid,
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