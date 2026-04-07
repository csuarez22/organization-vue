<template>
    <div class="login-wrap">
        <div class="login-card">
            <p class="login-title">Welcome to ORGANIZER.</p>
            <p class="login-sub">Sign in to your account to continue.</p>

            <div v-if="errorMessage" class="error-msg">
                {{ errorMessage }}
            </div>

            <div class="field">
                <label for="username">Username</label>
                <input
                    id="username"
                    v-model="username"
                    type="username"
                    placeholder="you@example.com"
                />
            </div>

            <div class="field">
                <label for="password">Password</label>
                <input id="password" v-model="password" type="password" placeholder="••••••••" />
            </div>

            <span class="forgot">Forgot password?</span>

            <button class="btn-login" :disabled="isLoading" @click="handleLogin">
                {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>

            <p class="signup">
                Don't have an account?
                <RouterLink to="/register">Sign up</RouterLink>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginView',

    data() {
        return {
            username: '',
            password: '',
            isLoading: false,
            errorMessage: '',
        }
    },

    methods: {
        async handleLogin() {
            this.errorMessage = ''

            if (!this.username || !this.password) {
                this.errorMessage = 'Please fill in all fields.'
                return
            }

            this.isLoading = true

            try {
                // Replace this with your actual API call
                // e.g. await authService.login(this.email, this.password)
                await new Promise((resolve) => setTimeout(resolve, 1000))

                this.$router.push('/dashboard')
            } catch (error) {
                this.errorMessage = 'Invalid email or password. Please try again.'
            } finally {
                this.isLoading = false
            }
        },
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap');

.login-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
}

.login-card {
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 380px;
}

.login-title {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    font-weight: 400;
    margin: 0 0 4px;
    color: #111;
}

.login-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #888;
    margin: 0 0 2rem;
}

.error-msg {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #a32d2d;
    background: #fcebeb;
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 1rem;
}

.field {
    margin-bottom: 1rem;
}

.field label {
    display: block;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #555;
    margin-bottom: 6px;
}

.field input {
    width: 100%;
    box-sizing: border-box;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fafafa;
    color: #111;
    outline: none;
    transition:
        border-color 0.15s,
        box-shadow 0.15s;
}

.field input:focus {
    border-color: #aaa;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
}

.forgot {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #888;
    display: block;
    text-align: right;
    margin-top: -8px;
    margin-bottom: 1.5rem;
    cursor: pointer;
}

.forgot:hover {
    color: #111;
}

.btn-login {
    width: 100%;
    padding: 11px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    background: #111;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition:
        opacity 0.15s,
        transform 0.1s;
}

.btn-login:hover:not(:disabled) {
    opacity: 0.85;
}

.btn-login:active:not(:disabled) {
    transform: scale(0.98);
}

.btn-login:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 1.25rem 0;
}

.divider span {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px;
    color: #bbb;
}

.divider::before,
.divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #eee;
}

.btn-sso {
    width: 100%;
    padding: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #555;
    background: transparent;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    transition:
        background 0.15s,
        color 0.15s;
}

.btn-sso:hover {
    background: #f5f5f5;
    color: #111;
}

.signup {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #888;
    text-align: center;
    margin-top: 1.5rem;
}

.signup a {
    color: #111;
    font-weight: 500;
    text-decoration: none;
}

.signup a:hover {
    text-decoration: underline;
}
</style>
