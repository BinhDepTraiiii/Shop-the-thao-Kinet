const productList = document.getElementById("product-List");

function createProductList() {
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()}₫</p>
            <button class="btn-buy" data-id="${product.id}">Thêm vào giỏ hàng</button>
        `;
        productItem.querySelector("h3").addEventListener('click', () => {
            window.location.href = `productDetail.html?id=${product.id}`;
        });
        const btnBuy = productItem.querySelector('.btn-buy');
        btnBuy.addEventListener('click', (e) => {
            e.stopPropagation(); /* Ngăn chặn event click lan ra ngoài */ 
            addToCart(product.id);
        });
        productList.appendChild(productItem);
    });
}
createProductList();
/* Lấy dữ liệu từ dạng mảng */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const product = products.find(p => p.id === id);
    
    const existing = cart.find(item => item.product && item.product.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ product: product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}


