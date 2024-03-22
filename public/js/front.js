const signupbtn=document.querySelector(".signup-btn");
const loginbtn=document.querySelector(".login-btn");

signupbtn.addEventListener("click",(event)=>{
    event.preventDefault();
    window.location.href="http://localhost:3000/signup";
})


loginbtn.addEventListener("click",(event)=>{
    event.preventDefault();
    window.location.href="http://localhost:3000/login";
})