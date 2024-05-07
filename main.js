var productsList = [
    {
        "name": "Detergente",
        "price": 3,
        "image": "https://wongfood.vtexassets.com/arquivos/ids/593101-800-auto?v=638030290103500000&width=800&height=auto&aspect=true"
    },
    {
        "name": "Galleta",
        "price": 3,
        "image": "https://peruvianboxofficial.com/cdn/shop/products/image_8c4050e0-733a-47f4-96a4-634d47946af5_grande.jpg?v=1642184517"
    }
];

function init() {
    localStorage.setItem("productsList", JSON.stringify(productsList));
}
init()

function loadProducts(search) {
    var list = document.getElementById("products");
    var products = JSON.parse(localStorage.getItem("productsList"))
    
    list.innerHTML = "";
    productsFiltered = [];
    if (search == null || search == ""){
        productsFiltered = products;
    }
    else {
        productsFiltered = products.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));
    }
    productsFiltered.forEach(p => {
        var div = document.createElement('div');
        div.setAttribute("class", "card col-4")
        div.setAttribute("style", "width: 18rem;")
        div.innerHTML = `<img src="${p.image}" class="card-img-top" alt="" height="350">
                        <div class="card-body">
                            <h5 class="card-title">${p.name} S/${p.price}</h5>
                            <a href="#" class="btn btn-primary">Añadir</a>
                        </div>`
        list.append(div);
    });

}
loadProducts(null)

var search = document.getElementById("search");
search.addEventListener("keyup", (e) => searchProduct(e))

function searchProduct(e){
    var value = document.getElementById("search").value;
    loadProducts(value)
}
