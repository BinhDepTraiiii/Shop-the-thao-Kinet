const itemsContainer = document.getElementById("checkout-items");
const totalElement = document.getElementById("checkout-total");
let cart = [];

async function loadCheckoutCart() {
    const res = await fetch("http://localhost:3000/api/cart");
    cart = await res.json();
    renderCheckout();
}

function renderCheckout() {
    let total = 0;
    itemsContainer.innerHTML = "";

    if(cart.length === 0) {
        itemsContainer.innerHTML = "<p>Bạn chưa có sản phẩm nào để thanh toán.</p>";
    }

    cart.forEach(item => {
        const { product, quantity, size } = item;
        total += product.price * quantity;

        const div = document.createElement("div");
        div.innerHTML = `
            <p><strong>${product.name}</strong> (Size: ${size}) x${quantity}</p>
            <p style="margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">${(product.price * quantity).toLocaleString()}₫</p>
        `;
        itemsContainer.appendChild(div);
    });

    totalElement.innerText = "Tổng thanh toán: " + total.toLocaleString() + "₫";
}

document.getElementById("btn-order").addEventListener("click", async () => {
    if (cart.length === 0) {
        return alert("Giỏ hàng trống, không thể đặt hàng!");
    }

    const customer = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        paymentType: document.getElementById("payment").value
    };

    if (!customer.name || !customer.phone || !customer.address) {
        alert("Vui lòng điền đầy đủ thông tin nhận hàng!");
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    try {
        const res = await fetch("http://localhost:3000/api/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customer, items: cart, total })
        });

        if (res.ok) {
            alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã ủng hộ Kinet Shop.");
            window.location.href = "index.html"; // Trở về trang chủ
        }
    } catch (error) {
        alert("Lỗi mạng: Không thể gửi đơn hàng về máy chủ.");
    }
});

loadCheckoutCart();