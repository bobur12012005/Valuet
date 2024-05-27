import axios from "axios"

let baseURL = import.meta.env.VITE_BASE_URL
let form = document.forms.namedItem('sign-up')
let signIn = document.querySelector('#sign-in')
let regexes = {
    name: /^[A-Za-z]{1,30}$/,
    surname: /^[A-Za-z]{1,30}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

signIn.onclick = () => {
    location.assign('/pages/sign-in/')
}


form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(form)

    let user = {
        id: String(Math.random()),
        name: fm.get('name'),
        surname: fm.get('surname'),
        email: fm.get('email'),
        password: fm.get('password')
    }

    if (user.name === "" || user.surname === "" || user.email === "" || !regexes.name.test(user.name) || !regexes.surname.test(user.surname) || !regexes.email.test(user.email) || user.password.length < 4) return

    axios.get(baseURL + "/users?email=" + user.email)
        .then(res => {
            if (res.data.length > 0) {
                alert('User already exists!')
                return
            }

            axios.post(baseURL + '/users', user)
                .then(res => {
                    if (res.status == 200 || res.status === 201) {
                        location.assign('/pages/sign-in/')
                    }
                })
        })
}