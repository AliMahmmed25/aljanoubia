
var model;
var SampleJSONData = [
    {
        id: 1,
        title: 'الاعدادت'
    },
    {
        id: 2,
        title: 'تعديل معلومات برنامج معين'
    }
    ,
    {
        id: 3,
        title: 'اضافة برنامج'
    }
];

var comboTree1
var comboTree2
jQuery(document).ready(function ($) {

    comboTree1 = $('#justAnInputBox').comboTree({
        source: SampleJSONData,
        isMultiple: true,
        cascadeSelect: false,
        collapse: true,
        selectableLastNode: true,
        withSelectAll: true
    });
    comboTree2 = $('#justAnInputBox2').comboTree({
        source: SampleJSONData,
        isMultiple: true,
        cascadeSelect: false,
        collapse: true,
        selectableLastNode: true,
        withSelectAll: true
    });

});
function padStart(string, length, char) {
    //  can be done via loop too:
    //    while (length-- > 0) {
    //      string = char + string;
    //    }
    //  return string;
    return length > 0 ?
        padStart(char + string, --length, char) :
        string;
}

function numToString(num, radix, length = num.length) {
    const numString = num.toString(radix);
    return numString.length === length ?
        numString :
        padStart(numString, length - numString.length, "0")
}
function dec2bin(dec) {

    var bin = (dec >>> 0).toString(2).toString();
    console.log(bin.length);
    while (bin.length < 4) { bin += '0' + bin; }
    console.log(bin);
    return bin
}
$(document).ready(function () {
    get_table();
    document.getElementById('username').innerHTML = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");
    document.getElementById('jobtital').innerHTML = "مستخدم";




});
tableData = null;
var data_response;
function get_table() {


    var myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("token"));
    myHeaders.append("active", "-1")
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(localStorage.getItem("urllocal").concat("User/GetAll"), requestOptions)
        .then(response => response.json())

        .then(response => {
            data_response = { data: response };
            users =  response;
            tableData = $("#exportexample").dataTable({
                "retrieve": true,
                "data": response,
                "columns": [
                    { "data": "id" },
                    { "data": "first_name" },
                    { "data": "last_name" },
                    { "data": "user_name" },
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
                    }, {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return `<div class="btn-group" role="group" aria-label="Basic example">
                              <button class="btn btn-light" onclick="EditView(${row.id})"><i class="fe fe-edit-2"></i></button>
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

String.prototype.replaceAt = function (index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}
function add_new_user() {
    var txtFirstName = document.getElementById("txtFirstName").value;
    var txtLastName = document.getElementById("txtLastName").value;
    var txtUserName = document.getElementById("txtUserName").value;
    var active = document.getElementById("active").value;
    var txtPassword = document.getElementById("txtPassword").value;
    var justAnInputBox = document.getElementById("justAnInputBox").value;
    const myArray = justAnInputBox.split(",");
    var strPermission = "00000000";

    myArray.forEach(element => {
        if (element.toString().trim() == 'اضافة برنامج') {
            strPermission = strPermission.toString().replaceAt(5, '1');
        }
        else if (element.toString().trim() == 'تعديل معلومات برنامج معين') {
            strPermission = strPermission.toString().replaceAt(6, '1');
        }
        else if (element.toString().trim() == 'الاعدادت') {
            strPermission = strPermission.toString().replaceAt(7, '1');
        }

    });
    var permassion = parseInt(strPermission, 2);
    if (document.getElementById("txtFirstName").value.length == 0 || document.getElementById("txtLastName").value.length == 0) {
        alert("حقل الاسم فارغ ! ");
    }
    if (document.getElementById("txtUserName").value.length == 0) {
        alert("حقل اسم المستخدم فارغ ! ");
    }
    if (document.getElementById("txtPassword").value.length == 0) {
        alert("حقل كلمة المرور  فارغ ! ");
    }

    if (document.getElementById("active").value.length == 0) {
        alert("حقل التفيل فارغ ! ");
    }
    if (active == 0) {
        active = true;
    } else if (active == 1) {
        active = false;
    }
    var settings = {
        "url": localStorage.getItem("urllocal").concat("User/Create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({

            "id": 0,
            "first_name": txtFirstName,
            "last_name": txtLastName,
            "user_name": txtUserName,
            "password": txtPassword,
            "user_permissions": permassion,
            "is_active": active
        }),
    };

    $.ajax(settings).done(function (response) {
        $('#modalSave').modal('hide');
        reload();

    });

}
function EditView(id) {

    var index;
    document.getElementById("txtID").value = id;
    document.getElementById("txtFirstName2").value = users[1].first_name;
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            index=i;
        }
    }
    console.log(users[index]);
    document.getElementById("txtFirstName2").value = users[index].first_name;
    document.getElementById("txtLastName2").value = users[index].last_name;
    document.getElementById("txtUserName2").value = users[index].user_name;
    document.getElementById("txtPassword2").value = users[index].password;
    document.getElementById("active2").value = users[index].is_active==true?0:1;
    console.log(numToString(parseInt(users[index].user_permissions, 10), 2, 8));
    var strPermission = numToString(parseInt(users[index].user_permissions, 10), 2, 8);
   
    while (strPermission.Length < 8) { strPermission = "0" + strPermission; }
    console.log(strPermission[7]);
    var permassion2="";
    if(strPermission[7]==1)
    {
        permassion2+='الاعدادت'; 
        permassion2+=',';
    }
    if(strPermission[6]==1)
    {
        permassion2+='تعديل معلومات برنامج معين'; 
        permassion2+=',';
    }
    if(strPermission[5]==1)
    {
        permassion2+='اضافة برنامج'; 
        permassion2+=',';
    }
    document.getElementById("justAnInputBox2").value=permassion2;
    $('#modalEdit').modal('show');
    
}

function edit_user() {

    var txtid = document.getElementById("txtID").value;
    var txtFirstName = document.getElementById("txtFirstName2").value;
    var txtLastName = document.getElementById("txtLastName2").value;
    var txtUserName = document.getElementById("txtUserName2").value;
    var active = document.getElementById("active2").value;
    var txtPassword = document.getElementById("txtPassword2").value;
    var justAnInputBox = document.getElementById("justAnInputBox2").value;
    const myArray = justAnInputBox.split(",");
    var strPermission = "00000000";

    myArray.forEach(element => {
        if (element.toString().trim() == 'اضافة برنامج') {
            strPermission = strPermission.toString().replaceAt(5, '1');
        }
        else if (element.toString().trim() == 'تعديل معلومات برنامج معين') {
            strPermission = strPermission.toString().replaceAt(6, '1');
        }
        else if (element.toString().trim() == 'الاعدادت') {
            strPermission = strPermission.toString().replaceAt(7, '1');
        }

    });
    var permassion = parseInt(strPermission, 2);
    if (document.getElementById("txtFirstName2").value.length == 0 || document.getElementById("txtLastName2").value.length == 0) {
        alert("حقل الاسم فارغ ! ");
    }
    if (document.getElementById("txtUserName2").value.length == 0) {
        alert("حقل اسم المستخدم فارغ ! ");
    }
    if (document.getElementById("txtPassword2").value.length == 0) {
        alert("حقل كلمة المرور  فارغ ! ");
    }

    if (document.getElementById("active2").value.length == 0) {
        alert("حقل التفيل فارغ ! ");
    }
    if (active == 0) {
        active = true;
    } else if (active == 1) {
        active = false;
    }
    var settings = {
        "url": localStorage.getItem("urllocal").concat("User/Create"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({

            "id": txtid,
            "first_name": txtFirstName,
            "last_name": txtLastName,
            "user_name": txtUserName,
            "password": txtPassword,
            "user_permissions": permassion,
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
