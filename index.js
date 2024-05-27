import axios from "axios"
import Chart from 'chart.js/auto'
import { createHeader, createSidebar, reloadWallets, reloadMiniTransactions } from "./modules/ui.js"

let baseURL = import.meta.env.VITE_BASE_URL
let user = JSON.parse(localStorage.getItem('user'))

let header = document.querySelector('header')
let sidebar = document.querySelector('.sidebar')
let walletsPlace = document.querySelector('.wallets')
let transactionsPlace = document.querySelector('.transactions')
let canvasStat = document.querySelector("#transaction-stat")
let canvasBalance = document.querySelector('#total-balance')
let canvasSpending = document.querySelector('#total-spending')
let balanceView = document.querySelector('.fund')
let spendingView = document.querySelector('.spending')

createHeader(header)
createSidebar(sidebar)

axios.get(baseURL + "/wallets?userId=" + user.id)
    .then(res => reloadWallets(res.data.splice(0, 4), walletsPlace))

axios.get(baseURL + "/transactions?userId=" + user.id)
    .then(res => reloadMiniTransactions(res.data.splice(0, 9), transactionsPlace))



// Counting - Total Ballance & Total Spending
axios.get(baseURL + "/wallets?userId=" + user.id)
    .then(res => {
        let totalBalance = 0
        for (let item of res.data) {
            totalBalance += Number(item.balance)
            balanceView.innerHTML = "$" + totalBalance
        }
    })
axios.get(baseURL + "/transactions?userId=" + user.id)
    .then(res => {
        let totalSpending = 0
        for (let item of res.data) {
            totalSpending += Number(item.amount)
            spendingView.innerHTML = "$" + totalSpending
        }
    })



// Canvas
axios.get(baseURL + "/wallets?userId=" + user.id)
    .then((res) => {
        let balances = []
        for (let item of res.data) {
            balances.push(item.balance)
        }

        const data = {
            datasets: [
                {
                    data: balances,
                    borderWidth: 0
                }
            ],

            labels: [
                'Red',
                'Yellow',
                'Blue'
            ]
        }

        const config = {
            type: 'doughnut',
            data: data,

            options: {
                cutout: '70%',
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        }

        new Chart(canvasBalance, config)
    })
axios.get(baseURL + "/transactions?userId=" + user.id)
    .then((res) => {
        let amounts = []
        for (let item of res.data) {
            amounts.push(item.amount)
        }

        const data = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            datasets: [
                {
                    data: amounts,
                    borderWidth: 1
                }
            ]
        }

        const config = {
            type: 'line',
            data: data,

            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 0.6,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: "#54669C"
                        }
                    }
                }
            }
        };

        new Chart(canvasSpending, config)
    })
axios.get(baseURL + "/transactions?userId=" + user.id)
    .then((res) => {
        let times = []
        let amounts = []
        for (let item of res.data) {
            times.push(item.date)
            amounts.push(item.amount)
        }
        const data = {
            labels: times,
            datasets: [
                {
                    label: "Stats of Transactions",
                    data: amounts,
                    backgroundColor: ["#1288E8"],
                    borderColor: ["#1288E8"],
                    borderWidth: 3,
                    tension: 0.4
                }
            ]
        }

        const config = {
            type: "line",
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: 0.6,

                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#2D317A',
                            lineWidth: 1
                        },
                        ticks: {
                            color: "#54669C"
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: "#54669C"
                        }
                    }
                },

                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }
        }

        new Chart(canvasStat, config)
    })