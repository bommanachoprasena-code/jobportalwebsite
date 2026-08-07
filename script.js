// =========================================
// HIREHUB SCRIPT.JS
// =========================================

// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const fullname = document.getElementById("fullName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Create user in Supabase Authentication
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
            return;
        }

        // Save user profile
        const { error: profileError } = await supabase
            .from("profiles")
            .insert([
                {
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    role: "jobseeker"
                }
            ]);

        if (profileError) {
            alert(profileError.message);
            return;
        }

        alert("Registration Successful!");

        window.location.href = "login.html";

    });

}
// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            alert(error.message);
            return;
        }

        // Save login status
        localStorage.setItem("loggedIn", "true");

        // Save user details
        localStorage.setItem("username", data.user.email);

        alert("Login Successful!");

        window.location.href = "index.html";

    });

}
// ================= LOGOUT =================

async function logout() {

    // Sign out from Supabase
    await supabase.auth.signOut();

    // Clear local storage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";

}

// ================= PAGE PROTECTION =================

(async () => {

    const currentPage = window.location.pathname;

    // Skip protection for login and register pages
    if (
        currentPage.includes("login.html") ||
        currentPage.includes("register.html")
    ) {
        return;
    }

    // Check if user is logged in
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        window.location.href = "login.html";
    }

})();
// ================= PROFILE =================

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");

async function loadProfile() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", user.email)
        .single();

    if (error) {
        console.log(error);
        return;
    }

    if (profileName) {
        profileName.innerHTML = data.fullname;
    }

    if (profileEmail) {
        profileEmail.innerHTML = data.email;
    }

    if (profilePhone) {
        profilePhone.innerHTML = data.phone;
    }

}

if (profileName || profileEmail || profilePhone) {
    loadProfile();
}
// ================= APPLY FORM =================

const applyForm = document.getElementById("applyForm");

if (applyForm) {

    applyForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Application Submitted Successfully!");

        applyForm.reset();

    });

}

// ================= EMPLOYER =================

const jobForm = document.getElementById("jobForm");

if (jobForm) {

    jobForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Job Posted Successfully!");

        jobForm.reset();

    });

}

// ================= ADMIN =================

document.querySelectorAll(".verify-btn").forEach(button => {

    button.addEventListener("click", function () {

        alert("Verification Successful!");

    });

});

document.querySelectorAll(".delete-btn").forEach(button => {

    button.addEventListener("click", function () {

        if (confirm("Delete this record?")) {

            alert("Deleted Successfully!");

        }

    });

});