// Simple authentication handling (for demo purposes)
// In a real application, you would connect to a backend server

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
    
    if (!loggedInUser && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
    }
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // In a real app, you would validate and send to server
            // For demo, we'll just store in localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'dashboard.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }
    
    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // In a real app, you would validate and send to server
            // For demo, we'll just store in localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if user already exists
            if (users.some(u => u.email === email)) {
                alert('Email already registered');
                return;
            }
            
            const newUser = {
                name,
                email,
                password, // In a real app, you would hash this
                joinDate: new Date().toLocaleDateString()
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            
            window.location.href = 'dashboard.html';
        });
    }
    
    // Logout handling
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    }
    
    // Display user info on dashboard
    if (loggedInUser && window.location.pathname.includes('dashboard.html')) {
        const user = JSON.parse(loggedInUser);
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('joinDate').textContent = user.joinDate;
    }
    
    // Update navigation based on login status
    updateNavigation();
    
    function updateNavigation() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;
        
        const loggedInUser = localStorage.getItem('loggedInUser');
        const loginItem = document.querySelector('.nav-item .login-btn');
        
        if (loggedInUser && loginItem) {
            const user = JSON.parse(loggedInUser);
            
            // Create user dropdown
            const userDropdown = document.createElement('li');
            userDropdown.className = 'nav-item dropdown';
            userDropdown.innerHTML = `
                <a href="javascript:void(0)" class="nav-links dropbtn">
                    ${user.name} <i class="fas fa-chevron-down"></i>
                </a>
                <div class="dropdown-content">
                    <a href="dashboard.html">Dashboard</a>
                    <a href="#" id="navLogout">Logout</a>
                </div>
            `;
            
            // Replace login button with user dropdown
            loginItem.parentElement.replaceWith(userDropdown);
            
            // Add logout handler
            document.getElementById('navLogout').addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.removeItem('loggedInUser');
                window.location.href = 'login.html';
            });
        }
    }
});