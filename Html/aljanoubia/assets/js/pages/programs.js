$(document).ready(function () {
    get_all_programs();
    get_Categorie();

});
var allprogrames;
function get_all_programs() {
    var form = new FormData();
    var settings = {

        "url": localStorage.getItem("urllocal").concat("Program/GetAll"),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token")
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };

    $.ajax(settings).done(function (response) {
        allprogrames = response;
        print_programs(response);
    });
}
function get_Categorie() {
    $.ajax({

        "url": localStorage.getItem("urllocal").concat("Categorie/GetAll"),
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": localStorage.getItem("token"),
            "active": 0

        },
        success: function (response) {
            $("#select-Categorie").append("<option value='" + -1 + "'>" + "الكل" + "</option>");
            for (var i = 0; i < response.length; i++) {
                var id = response[i]['id'];
                var name = response[i]['name'];
                $("#select-Categorie").append("<option value='" + id + "'>" + name + "</option>");
            }


        },
        error: function (response) {
            alert(response.responseText);
        }
    });

}

function print_programs(data) {
    data = JSON.parse(data);
    data.forEach(function (item, index) {
        var program = '';
        program += '<div class="col-md-6 col-lg-6 col-xl-4 col-sm-6"><div class="card custom-card"><div class="p-0 ht-100p">';
        program += '<div class="product-grid"><div class="product-image"><a onclick="edit_program(' + item["id"] + ')" class="image">';
        program += '<img class="pic-1" alt="product-image-1" src="../assets/img/programmes/p1.jpg">';
        program += '<img class="pic-2" alt="product-image-2" src="../assets/img/programmes/p11.jpg">';
        program += ' </a><div class="product-link"><a href="AddProgrameEpisodes.html"><i class="fa fa-plus-circle"></i>';
        program += '<span>اضافة حلقة جديدة</span> </a> <a onclick="edit_program(' + item["id"] + ')">';
        program += '<i class = "fas fa-pencil-square" > </i> <span> تعديل معلومات البرنامج </span> </a> </div > </div> ';
        program += '<div class = "product-content" ><h3 id = "programeName"class = "title" > <a href = "#" > ' + item["title"] + '</a>';
        program += '</h3><div class = "price" > <span id = "programmeCategorie" > ' + item["description"] + ' </span></div></div> </div> </div> </div > </div> ';
        document.getElementById("programs_container").innerHTML += program;

    });

}
function print_programs2(data, cat_id) {
    document.getElementById("programs_container").innerHTML = "";
    data = JSON.parse(data);
    data.forEach(function (item, index) {
        if(cat_id!=-1){
        if (item["categorie_id"] == cat_id) {
            var program = '';

            program += '<div class="col-md-6 col-lg-6 col-xl-4 col-sm-6"><div class="card custom-card"><div class="p-0 ht-100p">';
            program += '<div class="product-grid"><div class="product-image"><a onclick="edit_program(' + item["id"] + ')" class="image">';
            program += '<img class="pic-1" alt="product-image-1" src="../assets/img/programmes/p1.jpg">';
            program += '<img class="pic-2" alt="product-image-2" src="../assets/img/programmes/p11.jpg">';
            program += ' </a><div class="product-link"><a href="AddProgrameEpisodes.html"><i class="fa fa-plus-circle"></i>';
            program += '<span>اضافة حلقة جديدة</span> </a> <a onclick="edit_program(' + item["id"] + ')">';
            program += '<i class = "fas fa-pencil-square" > </i> <span> تعديل معلومات البرنامج </span> </a> </div > </div> ';
            program += '<div class = "product-content" ><h3 id = "programeName"class = "title" > <a href = "#" > ' + item["title"] + '</a>';
            program += '</h3><div class = "price" > <span id = "programmeCategorie" > ' + item["description"] + ' </span></div></div> </div> </div> </div > </div> ';
            document.getElementById("programs_container").innerHTML += program;
        }
    }
        else {
            var program = '';

            program += '<div class="col-md-6 col-lg-6 col-xl-4 col-sm-6"><div class="card custom-card"><div class="p-0 ht-100p">';
            program += '<div class="product-grid"><div class="product-image"><a onclick="edit_program(' + item["id"] + ')" class="image">';
            program += '<img class="pic-1" alt="product-image-1" src="../assets/img/programmes/p1.jpg">';
            program += '<img class="pic-2" alt="product-image-2" src="../assets/img/programmes/p11.jpg">';
            program += ' </a><div class="product-link"><a href="AddProgrameEpisodes.html"><i class="fa fa-plus-circle"></i>';
            program += '<span>اضافة حلقة جديدة</span> </a> <a onclick="edit_program(' + item["id"] + ')">';
            program += '<i class = "fas fa-pencil-square" > </i> <span> تعديل معلومات البرنامج </span> </a> </div > </div> ';
            program += '<div class = "product-content" ><h3 id = "programeName"class = "title" > <a href = "#" > ' + item["title"] + '</a>';
            program += '</h3><div class = "price" > <span id = "programmeCategorie" > ' + item["description"] + ' </span></div></div> </div> </div> </div > </div> ';
            document.getElementById("programs_container").innerHTML += program;
        }


    });

}
function print_programs3(data, str) {
    document.getElementById("programs_container").innerHTML = "";
    data = JSON.parse(data);
    data.forEach(function (item, index) {
        if(item["title"].includes(str)){
            
        
        var program = '';
        program += '<div class="col-md-6 col-lg-6 col-xl-4 col-sm-6"><div class="card custom-card"><div class="p-0 ht-100p">';
        program += '<div class="product-grid"><div class="product-image"><a onclick="edit_program(' + item["id"] + ')" class="image">';
        program += '<img class="pic-1" alt="product-image-1" src="../assets/img/programmes/p1.jpg">';
        program += '<img class="pic-2" alt="product-image-2" src="../assets/img/programmes/p11.jpg">';
        program += ' </a><div class="product-link"><a href="AddProgrameEpisodes.html"><i class="fa fa-plus-circle"></i>';
        program += '<span>اضافة حلقة جديدة</span> </a> <a onclick="edit_program(' + item["id"] + ')">';
        program += '<i class = "fas fa-pencil-square" > </i> <span> تعديل معلومات البرنامج </span> </a> </div > </div> ';
        program += '<div class = "product-content" ><h3 id = "programeName"class = "title" > <a href = "#" > ' + item["title"] + '</a>';
        program += '</h3><div class = "price" > <span id = "programmeCategorie" > ' + item["description"] + ' </span></div></div> </div> </div> </div > </div> ';
        document.getElementById("programs_container").innerHTML += program;
    }
   

    });

}
function applyFillter() {
    var catid = document.getElementById('select-Categorie').value;
    if (catid != 0) {
        print_programs2(allprogrames, catid);
    }
}
function applyFillter2() {
    var str = document.getElementById('search').value;
    if (str.length!=0) {
        print_programs3(allprogrames, str);
    }
    else 
    {
        print_programs(allprogrames);
    }
}
function edit_program(id) {
    //EditPrograme.html
    var program_id = id;
    sessionStorage.setItem("program_id", program_id);
    window.location.href = 'EditPrograme.html';

}