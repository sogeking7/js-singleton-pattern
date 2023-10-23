class UserAuthentication {
  constructor() {
    if (!UserAuthentication.instance) {
      this.currentUser = null;
      this.users = [];
      UserAuthentication.instance = this;
    }
    return UserAuthentication.instance;
  }

  login(username, password) {
    // Simulated user data (replace with actual authentication logic)
    const users = this.users;

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.currentUser = username;
      console.log(`Welcome, ${username}!`);
    } else {
      console.log("Invalid username or password.");
    }
    return Boolean(user);
  }

  logout() {
    this.currentUser = null;
    console.log("Logged out successfully.");
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  registerNewUser(username, password) {
    this.users = [...this.users, { username, password }];
  }
}

const authService = new UserAuthentication();

document.getElementById("signin-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;
  const user = authService.login(username, password);
  if (user) {
    console.log("TRUE");
    const signInForm = document.getElementById("form");
    signInForm.style.display = "none";
    const profile = document.getElementById("profile");
    profile.style.display = "block";
    const profileUsename = document.getElementById("profile-username");
    profileUsename.innerText = authService.getCurrentUser();
  }
});

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  // Simulated user registration (replace with actual registration logic)
  authService.registerNewUser(username, password);
  console.log(`User ${username} registered.`);
});
