const cartContainer = document.getElementById('cart-container');
const totalPrice = document.getElementById('total-price');

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartContainer.innerHTML ="";

    let total = 0;

    cart.forEach((item, index) => {
        const {product,quantity} = item;

        total += product.price * quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.price.toLocaleString()}₫</p>

        <div class="qty">
            <button onclick="decrease(${index})">-</button>
            <span>${quantity}</span>
            <button onclick="increase(${index})">+</button>
        </div>

        <button onclick= "removeItem(${index})"> Xóa </button>
        `;
        cartContainer.appendChild(div);
    }); 
    
    totalPrice.innerText = "Tổng: " + total.toLocaleString() + "₫";
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
function increase(index) {
    cart[index].quantity++;
    saveCart();
}

function decrease(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function goToCheckout() {
    window.location.href = "checkout.html";
}

renderCart();
