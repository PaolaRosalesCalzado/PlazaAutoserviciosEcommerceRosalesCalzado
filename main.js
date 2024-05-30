main()

function main() {
    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            let cart = []
            if (localStorage.getItem("cart") != null) {
                cart = JSON.parse(localStorage.getItem("cart"))
                showProductsCart(cart)
            }
            let search = document.getElementById("look-up")
            search.addEventListener("click", () => searchProduct(products, cart))
            showProducts(products, cart)
            let showSideBar = document.getElementById("cart-icon")
            showSideBar.addEventListener("click", showHideSideBar)
        })
}

function searchProduct(products, cart) {
    let filteredProducts = filterProducts(products)
    showProducts(filteredProducts, cart)
}

function filterProducts(products) {
    let inputSearch = document.getElementById("inputSearch")
    return products.filter(product => product.name.toLowerCase().includes(inputSearch.value.toLowerCase()) || product.category.toLowerCase().includes(inputSearch.value.toLowerCase()))
}

function showProducts(products, cart) {
    let productsContainer = document.getElementById("productsContainer")
    productsContainer.innerHTML = ""

    products.forEach(product => {
        let productCard = document.createElement("div")
        productCard.innerHTML = `
        <img src=${product.image} alt="" height="350"/>
        <div>
            <h5> ${product.name} </h5>
            <h5>Precio: S/.${product.price} </h5>
            <button id=${product.id} href="#">Añadir al carrito</button>
        </div>
        `
        productsContainer.append(productCard)

        let btnAddToCart = document.getElementById(product.id)
        btnAddToCart.addEventListener("click", (btn) => addToCart(btn, products, cart))
    })
}

function addToCart(btn, products, cart) {
    let idProduct = Number(btn.target.id)

    let positionProductCart = cart.findIndex(product => product.id === idProduct)

    let productLookedup = products.find(product => product.id === idProduct)

    if (positionProductCart !== -1) {
        cart[positionProductCart].quantity++
        cart[positionProductCart].subtotal = Number((cart[positionProductCart].unitPrice * cart[positionProductCart].quantity).toFixed(2))
    } else {
        cart.push({
            id: productLookedup.id,
            name: productLookedup.name,
            unitPrice: productLookedup.price,
            quantity: 1,
            subtotal: productLookedup.price,
            image: productLookedup.image
        })
    }
    showProductsCart(cart)
    localStorage.setItem("cart", JSON.stringify(cart))
    Toastify({
        text: "Producto agregado exitosamente",
        className: "info",
        gravity: "bottom",
        position: "left",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
}

function showProductsCart(cart) {
    let cartContainer = document.getElementById("cartContainer")
    let counterCart = document.getElementById("counter-cart")
    let total_cart = document.getElementById("total_cart")
    let quantity = 0
    let total = 0
    cartContainer.innerHTML = ""

    cart.forEach(product => {
        let cartProductCard = document.createElement("div")
        cartProductCard.className = "cartProductCard"
        cartProductCard.innerHTML = `
        <img src=${product.image} alt=""/>
        <div>
            <h5>${product.name} </h5>
            <h5>Precio Unit.: S/${product.unitPrice} x ${product.quantity} </h5>
            <h5>Subtotal: S/${product.subtotal} </h5>
            <i class='bx bxs-trash-alt' id=delete${product.id} data="${product.id}" class="deleteProduct"></i> 
        </div>
        
        `
        cartContainer.append(cartProductCard)
        quantity += product.quantity
        let btnAddToCart = document.getElementById("delete" + product.id)
        btnAddToCart.addEventListener("click", (btn) => removeFromCart(btn, cart))
        total += product.subtotal
    })
    counterCart.innerHTML = quantity
    total_cart.innerHTML = "S/" + total.toFixed(2)
}

function removeFromCart(btn, cart) {
    let idProduct = Number(btn.target.id.replace("delete", ""))
    let positionProductCart = cart.findIndex(product => product.id === idProduct)
    cart.splice(positionProductCart, 1)
    showProductsCart(cart)

    localStorage.setItem("cart", JSON.stringify(cart))
    Toastify({
        text: "Producto removido exitosamente",
        className: "info",
        gravity: "bottom",
        position: "left",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast()
}

function showHideSideBar (event) {
    event.preventDefault()
    event.stopPropagation()
    let showDiv = document.querySelector(".cart")
    console.log(showDiv)
    if (showDiv.classList.contains("showCart")) {
        console.log(showDiv)
        showDiv.classList.remove("showCart")

    } else {
        showDiv.classList.add("showCart")
    }
    console.log(showDiv)
}


