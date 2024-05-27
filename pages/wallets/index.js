import axios from "axios"
import { createHeader, createSidebar, reloadWallets } from "../../modules/ui.js"

let baseURL = import.meta.env.VITE_BASE_URL
let user = JSON.parse(localStorage.getItem('user'))

let header = document.querySelector('header')
let sidebar = document.querySelector('.sidebar')
let addWallet = document.querySelector('#add-wallet')
let modal = document.querySelector('#modal')
let form = document.forms.namedItem('add-wallet')
let walletPlace = document.querySelector('.wallets')

createHeader(header)
createSidebar(sidebar)

addWallet.onclick = () => {
    modal.style.display = 'flex'
}

modal.onclick = (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
}

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let wallet = {
        id: String(Math.random()),
        userId: user.id,
        title: fm.get('title'),
        currency: fm.get('currency'),
        balance: fm.get('balance')
    }

    let { title, currency } = wallet

    if (title === "" || currency === 'currency') {
        alert('Error! Fill all the fields!')
        return
    }

    axios.post(baseURL + '/wallets', wallet)
        .then(res => {
            if (res.status == 200 || res.status === 201) {
                modal.style.display = 'none'
                updateData()
            }
        })
}

updateData()

function updateData() {
    axios.get(baseURL + "/wallets?userId=" + user.id)
        .then(res => {
            reloadWallets(res.data, walletPlace)
        })
}