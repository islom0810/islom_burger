const products = {
    plainBurger: {
        name: 'Gamburger',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Gamburger Fresh',
        price: 20500,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        kcall: 1100,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receipt__window = document.querySelector('.receipt__window'),
    receipt__window_out = document.querySelector('.receipt__window-out'),
    receipt__window_btn = document.querySelector('.receipt__window-btn');
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    const el = btnPlusOrMinus[i];
    el.addEventListener('click', function (e) {
        plusOrMinus(this)
    })

}
function plusOrMinus(element) {
    const parent = element.closest('.main__product'), /* closest() o'rab turgan elementga ulanamiz */
        parentId = parent.getAttribute('id'), /* O'rab turgan element attributini "ID" olamiz */
        out = parent.querySelector('.main__product-num'), /* O'rab turgan elementdan miqdorga ulanamiz */
        price = parent.querySelector('.main__product-price span'), /* O'rab turgan elementdan narxga ulanamiz */
        kcall = parent.querySelector('.main__product-kcall span'),/* O'rab turgan elementdan kaloriyaga ulanamiz */
        elData = element.getAttribute('data-symbol'); /* bosilgan knopkani attributini qiymatini olamiz */
    if (elData == '+' && products[parentId].amount < 10) {
        products[parentId].amount++
    } else if (elData == '-' && products[parentId].amount > 0) {
        products[parentId].amount--
    }
    out.innerHTML = products[parentId].amount
    price.innerHTML = products[parentId].Summ
    kcall.innerHTML = products[parentId].Kcall
}

// ===================================================================================

let arrayProduct = [],
    totalPrice = 0,
    totalName = '',
    totalKcall = 0;


addCart.addEventListener('click', function () {
    for (const key in products) {
        const po = products[key]
        
        if (po.amount > 0) {
            arrayProduct.push(po)
            
        }
        po.price = po.Summ;
        po.kcall = po.Kcall;
    }
    for (let i = 0; i < arrayProduct.length; i++) {
        const el = arrayProduct[i];
        totalPrice = totalPrice + el.price;
        totalKcall = totalKcall + el.kcall;
        totalName += '\n' + el.name + '\n';
    }
    receipt__window_out.innerHTML = `Purchased : \n ${totalName} \n Calory:${totalKcall} \n Total price: ${totalPrice} sum`;
    receipt.style.display = 'flex'
    setTimeout(() => {
        receipt.style.opacity = '1'
    }, 100);
    setTimeout(() => {
        receipt__window.style.top = '30%'
    }, 200);
    document.body.style.overflow = 'hidden'
    const outPrice = document.querySelectorAll('.main__product-price span')
    const outKcall = document.querySelectorAll('.main__product-kcall span')
    const outAmount = document.querySelectorAll('.main__product-num')
    for (let i = 0; i < outPrice.length; i++) {
        const el = outPrice[i];
        el.innerHTML = '0'
        outAmount[i].innerHTML = '0'
        outKcall[i].innerHTML = '0'
    }
    for (const key in products) {
        products[key].amount = 0
    }
    
})

receipt__window_btn.addEventListener('click', function () {
    location.reload()
})
function updateClock() {
    const timer = document.querySelector('.header__timer-extra');
    let i = timer.innerHTML++;
    if (i <= 70) {
        setTimeout(() => {
            updateClock()
        }, 50)
    } else if (i <= 90) {
        var clear = setTimeout(() => {
            updateClock()
        }, 100)
    } else if (i < 99) {
        var clear = setTimeout(() => {
            updateClock()
        }, 300)
    } else {
        clearTimeout(clear)
    }
}

updateClock()



let minCard = document.querySelectorAll('.main__product-info');
let view = document.querySelector('.view');
let viewClose = view.querySelector('.view__close');
let img = view.querySelector('img')
for (let i = 0; i < minCard.length; i++) {
    minCard[i].addEventListener('dblclick', function () {
        view.classList.add('active');
        img.src = minCard[i].querySelector('img').src;
        minCard[i].style.transition = '.5s'
    })
    viewClose.addEventListener('click', function () {
        view.classList.remove('active')
    })
    view.addEventListener('dblclick', function (re) {
        if (re.currentTarget == re.target) {
            setTimeout(() => {
                view.classList.remove('active')
            }, 250);
        }
    })
}