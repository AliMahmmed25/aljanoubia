async function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    localStorage.setItem("urllocal", "http://www.aljanubiachannel.somee.com/api/v1/");
    var myHeaders = new Headers();
    myHeaders.append("Access-Control-Request-Method", "*/*");
    myHeaders.append("Content-Type", "application/json");


    try {
        const response = await fetch(localStorage.getItem("urllocal").concat("User/Login"), {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result);
            localStorage.setItem("first_name", result["first_name"]);
            localStorage.setItem("last_name", result["last_name"]);
            localStorage.setItem("user_permissions", result["user_permissions"]);
            localStorage.setItem("token","Bearer ".concat(result["token"]));
            window.open("index.html", "_self")
        }
    } catch (err) {
        console.error(err);
    }
}



