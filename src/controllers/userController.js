import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/users', //api/users
    headers: {
        'Content-Type': 'application/json',
    },
})

export const userController = {
    async createUser(user) {
        const response = await api.post('/create', user)
        return response.data
    },

    async login(username, password) {
        user = {
            username: username,
            password: password,
        }

        const response = await api.post('login', user)
        return response.data
    },
}
