import axios from "axios"

let baseURL = import.meta.env.VITE_BASE_URL
let form = document.forms.namedItem('sign-in')
let signUp = document.querySelector('#sign-up')
let regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

signUp.onclick = () => {
    location.assign('/pages/sign-up/')
}


form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(form)

    let user = {
        email: fm.get('email'),
        password: fm.get('password')
    }

    if (!user.email || !regex.email.test(user.email) || user.password.length < 4) {
        alert('Fill both of the fields correctly!')
        return
    }

    axios.get(baseURL + "/users?email=" + user.email)
        .then(res => {
            if (res.data.length === 0) {
                alert('User is not found!')
                return
            }

            let [data] = res.data

            if (data.password === user.password) {
                delete data.password
                localStorage.setItem('user', JSON.stringify(data))
                location.assign('/')
            } else {
                alert('Wrong password!')
            }
        })
}