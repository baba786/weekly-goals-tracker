// DOM Elements
const modal = document.getElementById('authModal');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const authButton = document.getElementById('authButton');
const authForm = document.getElementById('authForm');
const passwordInput = document.getElementById('password');

// State
let isLoginMode = true;

// Show authentication modal
function showAuth(mode) {
    isLoginMode = mode === 'login';
    updateAuthUI();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle authentication mode
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    updateAuthUI();
}

// Update authentication UI based on mode
function updateAuthUI() {
    if (isLoginMode) {
        authTitle.textContent = 'Welcome back';
        authSubtitle.textContent = 'Continue your journey of mindful achievement';
        authButton.textContent = 'Sign in';
    } else {
        authTitle.textContent = 'Create account';
        authSubtitle.textContent = 'Start your journey to mindful achievement';
        authButton.textContent = 'Sign up';
    }
}

// Toggle password visibility
function togglePassword() {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}

// Handle form submission
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Here you would typically handle authentication with your backend
    console.log('Form submitted:', { email, password, isLoginMode });
    
    // Show success message
    const message = isLoginMode ? 'Successfully signed in!' : 'Account created successfully!';
    showNotification(message, 'success');
    
    // Close modal
    closeModal();
});

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle demo mode
function startDemo() {
    // Add some sample goals
    const goals = [
        { title: 'Launch new product feature', progress: 75, tag: 'Work', due: 'Friday' },
        { title: 'Exercise 3 times this week', progress: 66, tag: 'Health', due: '2/3 completed' },
        { title: 'Write blog post about mindfulness', progress: 90, tag: 'Personal', due: 'Today' },
    ];
    
    // Animate goals appearing
    const container = document.querySelector('.goals-container');
    container.innerHTML = '';
    
    goals.forEach((goal, index) => {
        setTimeout(() => {
            const goalElement = createGoalElement(goal);
            container.appendChild(goalElement);
            goalElement.style.animation = 'slideIn 0.3s ease forwards';
        }, index * 200);
    });
}

// Create goal element
function createGoalElement(goal) {
    const div = document.createElement('div');
    div.className = 'goal-card';
    div.innerHTML = `
        <div class="checkbox">
            <input type="checkbox" id="goal-${Math.random()}">
            <label></label>
        </div>
        <div class="goal-content">
            <h4>${goal.title}</h4>
            <div class="goal-meta">
                <span class="tag">${goal.tag}</span>
                <span class="due-date">${goal.due}</span>
            </div>
            <div class="progress-bar">
                <div class="progress" style="width: ${goal.progress}%"></div>
            </div>
        </div>
    `;
    return div;
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Handle keyboard events
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Add styles for notifications
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: var(--primary-color);
        color: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
        z-index: 2000;
    }
    
    .notification.error {
        background: #EF4444;
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.feature-card, .goal-card').forEach(el => {
        observer.observe(el);
    });
});