<template>
    <div class="register-wrap">
        <div class="register-card">
            <p class="register-title">Create an account.</p>
            <p class="register-sub">Fill in your details to get started.</p>

            <div v-if="errorMessage" class="error-msg">
                {{ errorMessage }}
            </div>

            <div class="section-label">Account details</div>

            <div class="field">
                <label for="username">Username</label>
                <input id="username" v-model="form.username" type="text" placeholder="johndoe" />
            </div>

            <div class="field">
                <label for="email">Email</label>
                <input id="email" v-model="form.email" type="email" placeholder="you@example.com" />
            </div>

            <div class="field">
                <label for="password">Password</label>
                <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    placeholder="••••••••"
                />
            </div>

            <div class="section-label">Personal details</div>

            <div class="field-row">
                <div class="field">
                    <label for="firstName">First name</label>
                    <input id="firstName" v-model="form.firstName" type="text" placeholder="John" />
                </div>

                <div class="field">
                    <label for="lastName">Last name</label>
                    <input id="lastName" v-model="form.lastName" type="text" placeholder="Doe" />
                </div>
            </div>

            <div class="field">
                <label for="dob">Date of birth</label>
                <input id="dob" v-model="form.dateOfBirth" type="date" />
            </div>

            <div class="section-label">Address</div>

            <div class="field">
                <label for="street">Street</label>
                <input
                    id="street"
                    v-model="form.address.street"
                    type="text"
                    placeholder="123 Main St"
                />
            </div>

            <div class="field-row">
                <div class="field">
                    <label for="city">City</label>
                    <input
                        id="city"
                        v-model="form.address.city"
                        type="text"
                        placeholder="New York"
                    />
                </div>

                <div class="field">
                    <label for="state">State</label>
                    <input id="state" v-model="form.address.state" type="text" placeholder="NY" />
                </div>
            </div>

            <div class="field-row">
                <div class="field">
                    <label for="postcode">Postcode</label>
                    <input
                        id="postcode"
                        v-model="form.address.postcode"
                        type="text"
                        placeholder="10001"
                    />
                </div>

                <div class="field">
                    <label for="country">Country</label>
                    <input
                        id="country"
                        v-model="form.address.country"
                        type="text"
                        placeholder="United States"
                    />
                </div>
            </div>

            <button class="btn-register" :disabled="isLoading" @click="handleRegister">
                {{ isLoading ? 'Creating account...' : 'Create account' }}
            </button>

            <p class="login-link">
                Already have an account?
                <RouterLink to="/login">Sign in</RouterLink>
            </p>
        </div>
    </div>
</template>

<script>
import { userController } from '@/controllers/userController'

export default {
    name: 'RegisterView',

    data() {
        return {
            form: {
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                dateOfBirth: '',
                address: {
                    street: '',
                    city: '',
                    state: '',
                    postcode: '',
                    country: '',
                },
            },
            isLoading: false,
            errorMessage: '',
        }
    },

    methods: {
        validate() {
            const { username, email, password, firstName, lastName, dateOfBirth, address } =
                this.form

            if (!username || !email || !password || !firstName || !lastName || !dateOfBirth) {
                return 'Please fill in all required fields.'
            }

            if (!address.street || !address.city || !address.postcode || !address.country) {
                return 'Please fill in your full address.'
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return 'Please enter a valid email address.'
            }

            if (password.length < 8) {
                return 'Password must be at least 8 characters.'
            }

            return null
        },

        async handleRegister() {
            this.errorMessage = this.validate() ?? ''

            if (this.errorMessage) return

            this.isLoading = true

            try {
                await userController.createUser(this.form)
                this.$router.push('/dashboard')
            } catch (error) {
                this.errorMessage =
                    error.response?.data?.message ?? 'Something went wrong. Please try again.'
            } finally {
                this.isLoading = false
            }
        },
    },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap');

.register-wrap {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1rem;
}

.register-card {
    background: white;
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    width: 100%;
    max-width: 480px;
}

.register-title {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    font-weight: 400;
    margin: 0 0 4px;
    color: #111;
}

.register-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #888;
    margin: 0 0 2rem;
}

.section-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #bbb;
    margin: 1.5rem 0 1rem;
    padding-bottom: 8px;
    border-bottom: 1px solid #f0f0f0;
}

.section-label:first-of-type {
    margin-top: 0;
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
    flex: 1;
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

.field input[type='date'] {
    color: #111;
}

.field-row {
    display: flex;
    gap: 12px;
}

.btn-register {
    width: 100%;
    margin-top: 0.5rem;
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

.btn-register:hover:not(:disabled) {
    opacity: 0.85;
}

.btn-register:active:not(:disabled) {
    transform: scale(0.98);
}

.btn-register:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.login-link {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #888;
    text-align: center;
    margin-top: 1.5rem;
}

.login-link a {
    color: #111;
    font-weight: 500;
    text-decoration: none;
}

.login-link a:hover {
    text-decoration: underline;
}
</style>
