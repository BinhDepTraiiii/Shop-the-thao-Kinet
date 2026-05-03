const itemsContainer = document.getElementById("checkout-items");
const totalElement = document.getElementById("checkout-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCheckout() {
    let total = 0;
    itemsContainer.innerHTML = "";

    cart.forEach(item => {
        const { product, quantity, size } = item;

        total += product.price * quantity;

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${product.name} (Size: ${size}) x${quantity}</p>
            <p>${(product.price * quantity).toLocaleString()}₫</p>
        `;

        itemsContainer.appendChild(div);
    });

    totalElement.innerText = "Tổng: " + total.toLocaleString() + "₫";
}


document.getElementById("btn-order").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !phone || !address) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    alert("🎉 Đặt hàng thành công!");

    // Xóa giỏ hàng
    localStorage.removeItem("cart");

    // Chuyển về trang chủ
    window.location.href = "index.html";
});

renderCheckout();

