function sub(){
    var a = document.getElementById('uid').value;
    var b = document.getElementById('mob').value;
    var c = document.getElementById('pass').value;
    var d = document.getElementById('cnfm').value;
    if(a=="" || b=="" || c=="" || d==""){
        alert("All fields are mandotary");
        return false;
    }
    else if(b.length<10 || b.length>10){
        alert("Mobile number must be of 10 digits");
        return false;
    }
    else if(isNaN(b)){
        alert("Mobile number must contain digits only");
        return false;
    }
    else if(c != d){
        alert("Please enter the same password");
        return false;
    }
    else{
        return true;
    }
}