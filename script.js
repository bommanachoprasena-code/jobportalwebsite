function addJob() {
    let title = document.getElementById("jobTitle").value;
    let company = document.getElementById("company").value;

    if (title === "" || company === "") {
        alert("Please fill all fields");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML =
        title + " - " + company +
        ' <button onclick="this.parentElement.remove()">Delete</button>';

    document.getElementById("jobList").appendChild(li);

    document.getElementById("jobTitle").value = "";
    document.getElementById("company").value = "";
}
function loadJobs() {

    let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

    let list = document.getElementById("jobList");

    list.innerHTML = "";

    jobs.forEach(job => {

        let li = document.createElement("li");

        li.textContent = job.title + " - " + job.company;

        list.appendChild(li);

    });
}
function searchJob() {

    let searchText = document.getElementById("searchBox").value.toLowerCase();

    let jobs = document.querySelectorAll("#jobList li");

    jobs.forEach(job => {

        if(job.textContent.toLowerCase().includes(searchText)) {
            job.style.display = "block";
        } else {
            job.style.display = "none";
        }
        function registerUser() {

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;

            if(name === "" || email === "") {
                alert("Fill all fields");
                return;
            }

            let li = document.createElement("li");
            li.textContent = name + " - " + email;

            document.getElementById("userList").appendChild(li);

            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
        }
        function applyJob() {

            let name = document.getElementById("applicantName").value;
            let job = document.getElementById("jobApplied").value;

            if(name === "" || job === "") {
                alert("Fill all fields");
                return;
            }

            let li = document.createElement("li");
            li.textContent = name + " applied for " + job;

            document.getElementById("applicationList").appendChild(li);

            document.getElementById("applicantName").value = "";
            document.getElementById("jobApplied").value = "";
        }
        window.onload = loadJobs;

    });
}
function login(){

    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;

    if(email==="" || password===""){
        alert("Please fill all fields");
        return;
    }

    alert("Login Successful!");

    window.location.href="index.html";

}
function logout(){

    alert("Logged Out Successfully!");

    window.location.href="login.html";

}
function registerUser(){

let name=document.getElementById("name").value;

let email=document.getElementById("email").value;

let password=document.getElementById("password").value;

let confirm=document.getElementById("confirmPassword").value;

let phone=document.getElementById("phone").value;

let role=document.getElementById("role").value;

if(name==""||email==""||password==""||confirm==""||phone==""||role==""){

alert("Please fill all fields");

return;

}

if(password!=confirm){

alert("Passwords do not match");

return;

}

localStorage.setItem("userName",name);

localStorage.setItem("userEmail",email);

localStorage.setItem("userPassword",password);

localStorage.setItem("userRole",role);

alert("Registration Successful!\nPlease Login.");

window.location.href="login.html";

}



function loginUser(){

let email=document.getElementById("loginEmail").value;

let password=document.getElementById("loginPassword").value;

let savedEmail=localStorage.getItem("userEmail");

let savedPassword=localStorage.getItem("userPassword");

if(email==savedEmail && password==savedPassword){

alert("Login Successful!");

window.location.href="index.html";

}

else{

alert("Invalid Email or Password");

}

}