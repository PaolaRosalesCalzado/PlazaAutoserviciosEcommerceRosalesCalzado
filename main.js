let productsList = [
    {
        id: 1,
        name: "Cereales",
        price: 3.20,
        category: "Abarrotes",
        image: "images/product1.png"
    },
    {
        id: 2,
        name: "Galleta",
        price: 3.80,
        category: "Abarrotes",
        image: "https://peruvianboxofficial.com/cdn/shop/products/image_8c4050e0-733a-47f4-96a4-634d47946af5_grande.jpg?v=1642184517"
    },
    {
        id: 3,
        name: "Yogurt griego",
        price: 5,
        category: "Abarrotes",
        image: "images/product2.png"
    },
    {
        id: 4,
        name: "Casaca con peluche interior marron",
        price: 250,
        category: "Ropa",
        image: "https://hmperu.vtexassets.com/arquivos/ids/3915775-483-725?v=638313210693030000&width=483&height=725&aspect=true"
    },
    {
        id: 5,
        name: "Casaca jeans para dama classic",
        price: 80,
        category: "Ropa",
        image: "https://www.myoutfie.com/historias/wp-content/uploads/2019/10/ropa-mujer-casual-1.jpg"
    },
    {
        id: 6,
        name: "Saco de vestir para dama color acero",
        price: 180,
        category: "Ropa",
        image: "https://static3.mujerhoy.com/www/multimedia/202304/04/media/cortadas/tendencias-en-sandalias-299669437_1840749409650256_6961635765513902748_n-kP4B-U1901075829917TLB-1248x1248@MujerHoy.jpg"
    },
    {
        id: 7,
        name: "Casaca/Jacket de cuero",
        price: 300,
        category: "Ropa",
        image: "https://cueroperu.com/wp-content/uploads/2023/07/Sc740e5da14304b0891b2450821a4fadae.jpg_960x960.png"
    },
    {
        id: 8,
        name: "Pantalon para dama jeans azul",
        price: 80,
        category: "Ropa",
        image: "https://topitop.vteximg.com.br/arquivos/ids/320419-1000-1248/1754709_1.jpg?v=638357515928330000"
    },
    {
        id: 9,
        name: "Sandalias flop para dama",
        price: 150,
        category: "Calzado",
        image: "https://m.media-amazon.com/images/I/71cCNIc4acL._AC_SX679_.jpg"
    }
];

function init() {
}
init()

main(productsList)

function main(products) {
    let cart = []
    if (localStorage.getItem("cart") != null) {
        console.log("gololo")
        cart = JSON.stringify(localStorage.getItem("cart"))
    }
    let search = document.getElementById("look-up")
    search.addEventListener("click", () => searchProduct(products, cart))
    showProducts(products, cart)
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
        btnAddToCart.addEventListener("click", (btn) => addToCart (btn, products, cart))
    });
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
    sumTotal(cart)
    localStorage.setItem("cart", JSON.stringify(cart))
}

function showProductsCart(cart) {
    let cartContainer = document.getElementById("cartContainer")
    cartContainer.innerHTML = ""

    cart.forEach(product => {
        let cartProductCard = document.createElement("div")
        cartProductCard.className = "cartProductCard"
        cartProductCard.innerHTML = `
        <img src=${product.image} alt="" height="50"/>
        <div>
            <h6>${product.name} </h6>
            <span>Precio Unitario: S/.${product.unitPrice} </span>
            <span>x ${product.quantity} </span>
            <p>Subtotal: S/.${product.subtotal} </p> 
        </div>
        <i class='bx bxs-trash-alt'></i>
        `
        cartContainer.append(cartProductCard)
    });
}

function sumTotal(cart){
    let total = 0;
    cart.forEach(product => {
        total += product.subtotal
    })
    let total_cart = document.getElementById("total_cart")
    total_cart.innerHTML = total
}
