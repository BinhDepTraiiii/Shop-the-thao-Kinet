const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Fake database (tạm thời)
let cart = [];

// API lấy giỏ hàng
app.get("/api/cart", (req, res) => {
    res.json(cart);
});

// API thêm vào giỏ hàng
app.post("/api/cart", (req, res) => {
    const { product, quantity } = req.body;

    const existing = cart.find(item => item.product.id === product.id);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    res.json({ message: "Đã thêm vào giỏ hàng", cart });
});

// API xóa
app.delete("/api/cart/:id", (req, res) => {
    const id = parseInt(req.params.id);
    cart = cart.filter(item => item.product.id !== id);
    res.json(cart);
});

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});