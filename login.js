function sub(event) {
  if (event) event.preventDefault();

  var a = document.getElementById('uid').value.trim();
  var email = document.getElementById('email').value.trim();
  var b = document.getElementById('mob').value.trim();
  var c = document.getElementById('pass').value;
  var d = document.getElementById('cnfm').value;

  if (a === "" || email === "" || b === "" || c === "" || d === "") {
    alert("Please fill in all mandatory fields.");
    return false;
  }
  
  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (b.length !== 10 || isNaN(b)) {
    alert("Mobile number must be exactly 10 digits.");
    return false;
  }

  if (c.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }

  if (c !== d) {
    alert("Passwords do not match. Please re-confirm.");
    return false;
  }

  // Save session
  localStorage.setItem('realestate_user', a);
  alert("Registration successful! Welcome, " + a + ".");
  window.location.href = "index.html";
  return true;
}