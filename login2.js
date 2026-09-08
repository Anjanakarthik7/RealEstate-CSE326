function sub(event) {
  if (event) event.preventDefault();

  var a = document.getElementById('uid').value.trim();
  var c = document.getElementById('pass').value;

  if (a === "" || c === "") {
    alert("Please enter both UserID and Password.");
    return false;
  }

  if (c.length < 6) {
    alert("Password must be at least 6 characters.");
    return false;
  }

  // Store user session in localStorage
  localStorage.setItem('realestate_user', a);
  alert("Welcome back, " + a + "! Login successful.");
  window.location.href = "index.html";
  return true;
}