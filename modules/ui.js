export function createSidebar(place) {
    place.innerHTML = `        
        <div class="sidebarTop">
            <img src="/logotype/valuet.svg"/>
            <div></div>
        </div>
        <div class="sidebarMiddle">
            <div class="menu-option overview">
                <img src="/icons/overview.svg"/>
                <span>Overview</span>
            </div>
            <div class="menu-option wallets">
                <img src="/icons/wallets.svg"/>
                <span>Wallets</span>
            </div>
            <div class="menu-option transactions">
                <img src="/icons/transactions.svg"/>
                <span>Transactions</span>
            </div>
            <div class="menu-option exchange">
                <img src="/icons/exchange.svg"/>
                <span>Exchange</span>
            </div>
        </div>
        <div class="sidebarBottom">
            <div class="sidebarBottomLine"></div>
            <div class="otherStaff">
                <div class="fullname">
                    <div></div>
                    <span>Bobur Makhmadkulov</span>
                </div>
                <div class="logout">
                    <img src="/icons/logout.svg"/>
                    <span>Log Out</span>
                </div>
            </div>
        </div>
        `

    let overview = document.querySelector('.overview')
    let wallets = document.querySelector('.wallets')
    let transactions = document.querySelector('.transactions')
    let exchange = document.querySelector('.exchange')
    let logout = document.querySelector('.logout')

    overview.onclick = () => {
        location.assign('/')
    }

    wallets.onclick = () => {
        location.assign('/pages/wallets/')
    }

    transactions.onclick = () => {
        location.assign('/pages/transactions/')
    }

    exchange.onclick = () => {
        location.assign('/pages/exchange/')
    }

    logout.onclick = () => {
        let result = confirm("Вы уверены что хотите выйти из аккаунта?")

        if (result !== true) return

        localStorage.removeItem("user")
        location.assign('/pages/sign-in/')
    }

    let curr_page = location.pathname.split('/').at(-2) || "home"

    switch (curr_page) {
        case "wallets":
            wallets.classList.add('active')
            break
        case "transactions":
            transactions.classList.add('active')
            break
        case "exchange":
            exchange.classList.add('active')
            break
        case "home":
            overview.classList.add('active')
            break
    }
}

export function createHeader(place) {
    place.innerHTML = `
    <div class="search">
        <input type="text" placeholder="Search">
        <img src="/icons/search.svg">
    </div>
    <div class="notification">
        <button>
            <img src="/icons/message.svg">
        </button>
        <button>
            <img src="/icons/notification.svg">
        </button>
    </div>
    `
}

export function reloadWallets(arr, place) {
    place.innerHTML = ""

    for (let item of arr) {
        let wallet = document.createElement('div')
        let wallet_top = document.createElement('div')
        let wallet_bottom = document.createElement('div')
        let wallet_title = document.createElement('span')
        let wallet_bottom_left = document.createElement('div')
        let wallet_bottom_right = document.createElement('div')
        let moneyIcon_place_round = document.createElement('div')
        let moneyIcon_place = document.createElement('div')
        let moneyIcon = document.createElement('img')
        let moneyAmount_place = document.createElement('div')
        let currency = document.createElement('span')
        let amount = document.createElement('span')
        let flactuation_1 = document.createElement('div')
        let line_1 = document.createElement('div')
        let flactuation_2 = document.createElement('div')
        let line_2 = document.createElement('div')
        let flactuation_3 = document.createElement('div')
        let fl1_icon = document.createElement('img')
        let fl1_stats = document.createElement('span')
        let fl2_icon = document.createElement('img')
        let fl2_stats = document.createElement('span')
        let fl3_icon = document.createElement('img')
        let fl3_stats = document.createElement('span')

        wallet.classList.add('wallet')
        wallet_top.classList.add('wallet_top')
        wallet_bottom.classList.add('wallet_bottom')
        wallet_bottom_left.classList.add('wallet_bottom_left')
        wallet_bottom_right.classList.add('wallet_bottom_right')
        moneyIcon_place_round.classList.add('moneyIcon_place_round')
        moneyIcon_place.classList.add('moneyIcon_place')
        moneyAmount_place.classList.add('moneyAmount_place')
        currency.classList.add('currency')
        amount.classList.add('amount')
        flactuation_1.classList.add('flactuation')
        line_1.classList.add('line')
        flactuation_2.classList.add('flactuation')
        line_2.classList.add('line')
        flactuation_3.classList.add('flactuation')

        wallet.style.background = `linear-gradient(90deg,${geneateRGB()}, ${geneateRGB()})`

        moneyIcon.src = '/icons/money.svg'
        fl1_icon.src = '/icons/goingup.svg'
        fl2_icon.src = '/icons/goingdown.svg'
        fl3_icon.src = '/icons/goingdown.svg'

        wallet_title.innerHTML = item.title
        currency.innerHTML = item.currency
        amount.innerHTML = item.balance

        fl1_stats.innerHTML = `${item.balance} = ${Math.random().toFixed(4)} btc`
        fl2_stats.innerHTML = `${item.balance} = ${Math.random().toFixed(4)} grc`
        fl3_stats.innerHTML = `${item.balance} = ${Math.random().toFixed(4)} eth`

        place.append(wallet)
        wallet.append(wallet_top, wallet_bottom)
        wallet_top.append(wallet_title)
        wallet_bottom.append(wallet_bottom_left, wallet_bottom_right)
        wallet_bottom_left.append(moneyIcon_place_round, moneyAmount_place)
        moneyIcon_place_round.append(moneyIcon_place)
        moneyIcon_place.append(moneyIcon)
        moneyAmount_place.append(currency, amount)
        wallet_bottom_right.append(flactuation_1, line_1, flactuation_2, line_2, flactuation_3)
        flactuation_1.append(fl1_icon, fl1_stats)
        flactuation_2.append(fl2_icon, fl2_stats)
        flactuation_3.append(fl3_icon, fl3_stats)
    }

    function geneateRGB() {
        function random(max) {
            return Math.ceil(Math.random() * max)
        }

        let r = random(255)
        let g = random(255)
        let b = random(255)

        return `rgb(${r}, ${g}, ${b})`
    }
}

export function reloadMiniTransactions(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let transaction = document.createElement('div')
        let category = document.createElement('span')
        let date = document.createElement('span')
        let amount = document.createElement('span')

        transaction.classList.add('transaction')
        date.classList.add('date')
        category.classList.add('category')
        amount.classList.add('amount')

        date.innerHTML = item.date
        category.innerHTML = item.category
        amount.innerHTML = item.amount

        place.append(transaction)
        transaction.append(date, category, amount)
    }
}

export function reloadTransactions(arr, place) {
    place.innerHTML = ''
    let nmr = 1

    for (let item of arr) {
        let transaction = document.createElement('div')
        let number = document.createElement('span')
        let time = document.createElement('span')
        let date = document.createElement('span')
        let walletTitle = document.createElement('span')
        let idNumber = document.createElement('span')
        let category = document.createElement('span')
        let amount = document.createElement('span')

        transaction.classList.add('transaction')
        number.classList.add('number')
        time.classList.add('time')
        date.classList.add('date')
        walletTitle.classList.add('wallet-title')
        idNumber.classList.add('id-number')
        category.classList.add('category')
        amount.classList.add('amount')

        number.innerHTML = nmr++
        time.innerHTML = item.time
        date.innerHTML = item.date
        walletTitle.innerHTML = item.wallet.title
        idNumber.innerHTML = item.id
        category.innerHTML = item.category
        amount.innerHTML = item.amount

        place.append(transaction)
        transaction.append(number, time, date, walletTitle, idNumber, category, amount)
    }
}