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
        
        // Click vào tên để xem chi tiết
        productItem.querySelector("h3").addEventListener('click', () => {
            window.location.href = `productDetail.html?id=${product.id}`;
        });
        
        // Nút thêm giỏ hàng ở ngoài trang chủ (Mặc định cho size M)
        const btnBuy = productItem.querySelector('.btn-buy');
        btnBuy.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product);
        });
        
        productList.appendChild(productItem);
    });
}

// Lấy tổng số lượng để hiện lên icon giỏ hàng (nếu có)
async function updateCartCount() {
    try {
        const res = await fetch("http://localhost:3000/api/cart");
        const cart = await res.json();
        let total = 0;
        cart.forEach(item => total += item.quantity);
        
        const countEl = document.getElementById("cart-count");
        if (countEl) countEl.innerText = total;
    } catch (error) {
        console.error("Chưa bật server Backend:", error);
    }
}

async function addToCart(product) {
    try {
        const res = await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                product: product,
                quantity: 1,
                size: "M" // Mặc định size M nếu mua nhanh ở trang chủ
            })
        });
        
        if (res.ok) {
            alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
            updateCartCount();
        }
    } catch (error) {
        alert("Lỗi: Không thể kết nối đến máy chủ. Bạn đã chạy node server.js chưa?");
    }
}

createProductList();
updateCartCount();
