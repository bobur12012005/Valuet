import axios from "axios"
import { createHeader, createSidebar, reloadWallets, reloadMiniTransactions } from "../../modules/ui.js"

let header = document.querySelector('header')
let sidebar = document.querySelector('.sidebar')
let form = document.forms.namedItem('exchange')
let moneyView = document.querySelector('#answer')
let from = document.querySelector('#from')
let to = document.querySelector('#to')
let fromView = document.querySelector('.exchange-view-from')
let toView = document.querySelector('.exchange-view-to')

createHeader(header)
createSidebar(sidebar)

form.onsubmit = (event) => {
    event.preventDefault()

    let fm = new FormData(event.target)

    let exchanged = {
        from: fm.get('from'),
        to: fm.get('to'),
        amount: fm.get('from-money'),
    }

    let { from, to, amount } = exchanged

    if (amount <= 0 || from === "currency" || to === "currency") return

    axios.get(`https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`, {
        headers: {
            apikey: import.meta.env.VITE_API_KEY
        }
    })
        .then(res => {
            moneyView.value = res.data.result
            fromView.innerHTML = amount
            toView.innerHTML = res.data.result
        })
}

axios.get('https://api.apilayer.com/fixer/symbols', {
    headers: {
        apikey: import.meta.env.VITE_API_KEY
    }
})
    .then(res => {
        let symbols = res.data.symbols
        for (let key in symbols) {
            let opt = new Option(`${key} (${symbols[key]})`, key)
            from.append(opt)
        }
    })

axios.get('https://api.apilayer.com/fixer/symbols', {
    headers: {
        apikey: import.meta.env.VITE_API_KEY
    }
})
    .then(res => {
        let symbols = res.data.symbols
        for (let key in symbols) {
            let opt = new Option(`${key} (${symbols[key]})`, key)
            to.append(opt)
        }
    })