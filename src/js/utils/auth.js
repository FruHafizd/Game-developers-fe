import axios from 'axios'
import router from '../../router/index.js'

export async function logoutUser() {
  try {
    const token = localStorage.getItem('token')

    if (token) {
      await axios.post('http://localhost:8000/api/v1/auth/signout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    }
  } catch (error) {
    console.error('Gagal logout di backend:', error)
    // bisa abaikan error ini kalau tidak kritis
  } finally {
    // Bersihkan localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // Redirect ke halaman login
    router.push('/login')
  }
}