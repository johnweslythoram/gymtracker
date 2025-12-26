import axios from 'axios'

const api = axios.create({
    baseURL: 'https://stackblitz-starters-6pdneq7d-2.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
        'DoctorSecreatKey': 'Dummy'
    }
})

export default api
