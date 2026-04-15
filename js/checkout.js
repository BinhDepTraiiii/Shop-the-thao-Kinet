const list = document.getElementById("checkout-list");
const totalEl = document.getElementById("checkout-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCheckout() {
    let total = 0;

    cart.forEach(item => {
        const { product, quantity } = item;

        total += product.price * quantity;

        const div = document.createElement("div");

        div.innerHTML = `
            <p>${product.name} x ${quantity}</p>
        `;

        list.appendChild(div);
    });

    totalEl.innerText = "Tổng: " + total.toLocaleString() + "₫";
}

function placeOrder() {
    alert("Đặt hàng thành công!");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}

renderCheckout();