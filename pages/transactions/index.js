import axios from "axios"
import { createHeader, createSidebar, reloadTransactions } from "../../modules/ui.js"

let baseURL = import.meta.env.VITE_BASE_URL
let user = JSON.parse(localStorage.getItem('user'))

let header = document.querySelector('header')
let sidebar = document.querySelector('.sidebar')
let addTransaction = document.querySelector('#add-transaction')
let modal = document.querySelector('#modal')
let form = document.forms.namedItem('add-transaction')
let transactionPlace = document.querySelector('.transactions')
let select = document.querySelector('select')

let wallets_all = []
axios.get(baseURL + '/wallets?userId=' + user.id)
    .then(res => {
        for (let item of res.data) {
            let opt = new Option(item.title, item.id)
            select.append(opt)
            wallets_all.push(item)
        }
    })

createHeader(header)
createSidebar(sidebar)

addTransaction.onclick = () => {
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

    let transaction = {
        id: String(Math.floor(Math.random() * 1000000000000)),
        userId: user.id,
        walletId: fm.get('wallet'),
        amount: fm.get('amount'),
        category: fm.get('category'),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        wallet: {}
    }

    let { amount, category } = transaction

    if (amount === "" || category === "") {
        alert('Error! Fill all the fields!')
        return
    }

    let wallet_current = wallets_all.find(wallet => wallet.id === transaction.walletId)
    delete wallet_current.id
    delete wallet_current.userId

    transaction.wallet = wallet_current

    axios.patch(baseURL + '/wallets/' + transaction.walletId, {
        balance: String(Number(wallet_current.balance) - Number(transaction.amount))
    })
        .then(() => {
            axios.post(baseURL + '/transactions/', transaction)
            modal.style.display = 'none'

            updateData()
        })
}

updateData()

function updateData() {
    axios.get(baseURL + "/transactions?userId=" + user.id)
        .then(res => {
            reloadTransactions(res.data, transactionPlace)
        })
}