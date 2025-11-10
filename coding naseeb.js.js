// Handle tab switching
document.querySelectorAll(".btn-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      document.querySelectorAll(".tab-content").forEach((c) => (c.style.display = "none"));
      document.querySelectorAll(".btn-tab").forEach((b) => b.classList.remove("active"));
  
      const target = e.target.getAttribute("data-target");
      document.getElementById(target).style.display = "block";
      e.target.classList.add("active");
    });
  });
  
  // Password show/hide
  function toggleVisibility(id, el) {
    const input = document.getElementById(id);
    const icon = el.querySelector("i");
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    icon.className = isHidden ? "fa fa-eye" : "fa fa-eye-slash";
  }
  
  // Password strength check
  const validPassword = (pw) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(pw);
  
  // Local storage helpers
  const KEY = "credentials";
  const saveCreds = (n, p) => localStorage.setItem(KEY, JSON.stringify({ n, p }));
  const getCreds = () => JSON.parse(localStorage.getItem(KEY) || "null");
  
  // Sign up handler
  document.getElementById("signupForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = signupUser.value.trim();
    const pass = signupPwd.value;
    const msg = signupStatus;
  
    if (!name) {
      msg.textContent = "Name is required.";
      msg.className = "status error";
      return;
    }
    if (!validPassword(pass)) {
      msg.textContent =
        "Password must be ≥8 chars, include uppercase, lowercase, digit & symbol.";
      msg.className = "status error";
      return;
    }
    saveCreds(name, pass);
    msg.textContent = "Account created successfully!";
    msg.className = "status success";
    e.target.reset();
    setTimeout(() => (msg.textContent = ""), 3000);
  });
  
  // Login handler
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = loginUser.value.trim();
    const pass = loginPwd.value;
    const msg = loginStatus;
    const creds = getCreds();
  
    if (!creds) {
      msg.textContent = "No account found. Please sign up first.";
      msg.className = "status error";
      return;
    }
  
    if (creds.n === name && creds.p === pass) {
      msg.textContent = "Login successful!";
      msg.className = "status success";
    } else {
      msg.textContent = "Invalid name or password.";
      msg.className = "status error";
    }
    setTimeout(() => (msg.textContent = ""), 4000);
  });