// =========================================
// HIREHUB SCRIPT.JS
// =========================================


// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const fullname = document.getElementById("fullName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Check passwords
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {

            // Create authentication user
            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                console.error("Registration error:", error);
                alert(error.message);
                return;
            }

            // Check that user was created
            if (!data.user) {
                alert("Registration failed. Please try again.");
                return;
            }

            // Save profile
            const { error: profileError } = await supabaseClient
                .from("profiles")
                .insert([
                    {
                        id: data.user.id,
                        fullname: fullname,
                        email: email,
                        phone: phone,
                        role: "jobseeker"
                    }
                ]);

            if (profileError) {
                console.error("Profile error:", profileError);
                alert("Account created, but profile could not be saved: " + profileError.message);
                return;
            }

            alert("Registration Successful!");

            // Go to login page
            window.location.href = "login.html";

        } catch (error) {

    console.error("FULL REGISTRATION ERROR:", error);

    alert(
        "Registration Error:\n\n" +
        (error.message || error)
    );

}

    });

}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {

            const { data, error } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });

            if (error) {
                console.error("Login error:", error);
                alert(error.message);
                return;
            }

            // Save login status
            localStorage.setItem("loggedIn", "true");

            // Save email
            localStorage.setItem("username", data.user.email);
            localStorage.setItem("email", data.user.email);

            alert("Login Successful!");

            window.location.href = "index.html";

        } catch (error) {

            console.error("Unexpected login error:", error);
            alert("Something went wrong. Please try again.");

        }

    });

}


// ================= LOGOUT =================

async function logout() {

    try {

        const { error } = await supabaseClient.auth.signOut();

        if (error) {
            console.error("Logout error:", error);
        }

    } catch (error) {

        console.error("Logout error:", error);

    }

    // Clear local storage
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    alert("Logged Out Successfully!");

    // Force navigation to login
    window.location.replace("login.html");
}


// ================= PAGE PROTECTION =================

(async function protectPages() {

    const currentPage = window.location.pathname;

    // Pages that do NOT require login
    const publicPages = [
        "login.html",
        "register.html"
    ];

    const isPublicPage = publicPages.some(function (page) {
        return currentPage.includes(page);
    });

    if (isPublicPage) {
        return;
    }

    try {

        const {
            data: { session },
            error
        } = await supabaseClient.auth.getSession();

        if (error) {
            console.error("Session error:", error);
            return;
        }

        // No session = send to login
        if (!session) {
            window.location.replace("login.html");
        }

    } catch (error) {

        console.error("Page protection error:", error);

    }

})();


// ================= PROFILE =================

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");

async function loadProfile() {

    try {

        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();

        if (userError) {
            console.error(userError);
            return;
        }

        if (!user) {
            return;
        }

        const { data, error } = await supabaseClient
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        if (error) {
            console.error("Profile loading error:", error);
            return;
        }

        if (profileName) {
            profileName.textContent = data.fullname || "";
        }

        if (profileEmail) {
            profileEmail.textContent = data.email || "";
        }

        if (profilePhone) {
            profilePhone.textContent = data.phone || "";
        }

    } catch (error) {

        console.error("Unexpected profile error:", error);

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

        alert("🎉 Application Submitted Successfully!");

        applyForm.reset();

    });

}


// ================= EMPLOYER JOB FORM =================

const jobForm = document.getElementById("jobForm");

if (jobForm) {

    jobForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Job Posted Successfully!");

        jobForm.reset();

    });

}


// ================= ADMIN =================

document.querySelectorAll(".verify-btn").forEach(function (button) {

    button.addEventListener("click", function () {

        alert("Verification Successful!");

    });

});


document.querySelectorAll(".delete-btn").forEach(function (button) {

    button.addEventListener("click", function () {

        if (confirm("Are you sure you want to delete?")) {

            alert("Deleted Successfully!");

        }

    });

});