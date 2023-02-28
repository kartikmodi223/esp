
function validate() {
    var firstname = document.getElementById("name").value;
    var lastname = document.getElementById("email").value;
    var email = document.getElementById("password").value;
    var department = document.getElementById("sub").value;
    {

        if (name == "" || name.length > 20) {
            document.getElementById("name1").innerHTML = "**not valid**";
            return false;

        }

        var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
        if (email == "" || !regEmail.test(email)) {
            document.getElementById("email1").innerHTML = "**not valid**";
            return false;
        }
    }


    if (password == "" || password.legnth < 6) {
        document.getElementById("password1").innerHTML = "**not valid**";
        return false;
    }
    if ((form.gender[0].checked == false) && (form.gender[1].checked == false)) {
        document.getElementById("password1").innerHTML = "**not valid**";
        return false;

        if (department == "") {
            document.getElementById("sub1").innerHTML = "**not valid**";
            return false;
        }
        return true;
    }
}
