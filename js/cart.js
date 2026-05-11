const cartContainer = document.getElementById('cart-container');
const totalPrice = document.getElementById('total-price');
let cart = [];

// Tải giỏ hàng từ Server
async function loadCart() {
    try {
        const res = await fetch("http://localhost:3000/api/cart");
        cart = await res.json();
        renderCart();
    } catch (error) {
        cartContainer.innerHTML = "<p>Lỗi kết nối máy chủ.</p>";
    }
}

function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p style='text-align:center; padding: 20px;'>Giỏ hàng trống.</p>";
        totalPrice.innerText = "Tổng: 0₫";
        return;
    }

    cart.forEach((item, index) => {
        const { product, quantity, size } = item;
        total += product.price * quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <h3>${product.name} (Size: ${size})</h3>
            <p>${product.price.toLocaleString()}₫</p>

            <div class="qty">
                <button onclick="decrease(${index})">-</button>
                <span>${quantity}</span>
                <button onclick="increase(${index})">+</button>
            </div>

            <button onclick="removeItem(${index})" style="background:red; color:white; border:none; padding:5px 10px; cursor:pointer;"> Xóa </button>
        `;
        cartContainer.appendChild(div);
    }); 
    
    totalPrice.innerText = "Tổng: " + total.toLocaleString() + "₫";
}

// Cập nhật số lượng lên Server
async function updateQuantityOnServer(index, newQuantity) {
    const res = await fetch(`http://localhost:3000/api/cart/${index}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity })
    });
    cart = await res.json();
    renderCart();
}

function increase(index) {
    updateQuantityOnServer(index, cart[index].quantity + 1);
}

function decrease(index) {
    if (cart[index].quantity > 1) {
        updateQuantityOnServer(index, cart[index].quantity - 1);
    } else {
        removeItem(index); // Xóa luôn nếu giảm về 0
    }
}

async function removeItem(index) {
    const res = await fetch(`http://localhost:3000/api/cart/${index}`, { method: "DELETE" });
    cart = await res.json();
    renderCart();
}

function goToCheckout() {
    if (cart.length === 0) return alert("Giỏ hàng trống, hãy chọn mua đồ trước!");
    window.location.href = "checkout.html";
}

loadCart();