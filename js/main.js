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
            addToCart(product);
        });
        productList.appendChild(productItem);
    });
}
createProductList();
/* Lấy dữ liệu từ dạng mảng */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart.forEach(item => {
        total += item.quantity; 
    });
    document.getElementById("cart-count").innerText = total;
}

async function addToCart(product) {
   await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            product: product,
            quantity: 1
        })
    });
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}


updateCartCount();
