let user = localStorage.getItem('user')

if (!user) {
    location.assign('/pages/sign-in/')
}