document.addEventListener("DOMContentLoaded", function(event) {
    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
        const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)

        if(toggle && nav && bodypd && headerpd){
            toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
            toggle.classList.toggle('bx-x')
            bodypd.classList.toggle('body-pd')

            headerpd.classList.toggle('body-pd')
        })
    }
}

showNavbar('header-toggle','nav-bar','body-pd','header')

const linkColor = document.querySelectorAll('.nav_link')

function colorLink(){
    if(linkColor){
        linkColor.forEach(l=> l.classList.remove('active'))
        this.classList.add('active')
        }
    }
    linkColor.forEach(l=> l.addEventListener('click', colorLink))
});

const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})


var pwd = document.getElementById('pwd');
var eye = document.getElementById('eye');

eye.addEventListener('click',togglePass);

function togglePass(){

   eye.classList.toggle('active');

   (pwd.type == 'password') ? pwd.type = 'text' : pwd.type = 'password';
}

// Form Validation

function checkStuff() {
  var email = document.form1.email;
  var password = document.form1.password;
  var msg = document.getElementById('msg');
  
  if (email.value == "") {
    msg.style.display = 'block';
    msg.innerHTML = "Please enter your email";
    email.focus();
    return false;
  } else {
    msg.innerHTML = "";
  }
  
   if (password.value == "") {
    msg.innerHTML = "Please enter your password";
    password.focus();
    return false;
  } else {
    msg.innerHTML = "";
  }
   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value)) {
    msg.innerHTML = "Please enter a valid email";
    email.focus();
    return false;
  } else {
    msg.innerHTML = "";
  }
}
