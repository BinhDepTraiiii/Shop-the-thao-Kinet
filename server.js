const express = require("express");
const cors = require("cors");
// Sửa dòng require để dùng chế độ không cần mật khẩu
const sql = require("mssql/msnodesqlv8"); 

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
    connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=localhost;Database=KinetShop;Trusted_Connection=Yes;"
}; 

// Test kết nối ngay khi khởi động
sql.connect(dbConfig).then(() => {
    console.log("🟢 Đã kết nối thành công với SQL Server không cần mật khẩu!");
}).catch(err => console.log("🔴 Lỗi kết nối SQL Server:", err));

// Giỏ hàng tạm thời
let cart = [];


app.get("/api/cart", (req, res) => res.json(cart));

app.post("/api/cart", (req, res) => {
    const { product, quantity, size } = req.body;
    const existing = cart.find(item => item.product.id === product.id && item.size === size);

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ product, quantity, size });
    }
    res.json({ message: "Thêm thành công", cart });
});

app.put("/api/cart/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < cart.length) cart[index].quantity = req.body.quantity;
    res.json(cart);
});

app.delete("/api/cart/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < cart.length) cart.splice(index, 1);
    res.json(cart);
});

app.post("/api/order", async (req, res) => {
    try {
        const { customer, items, total } = req.body;
        const orderId = "KINET-" + Date.now();

        let pool = await sql.connect(dbConfig);

        // 1. Lưu khách hàng vào bảng Orders
        await pool.request()
            .input('OrderId', sql.VarChar, orderId)
            .input('CustomerName', sql.NVarChar, customer.name)
            .input('CustomerPhone', sql.VarChar, customer.phone)
            .input('CustomerAddress', sql.NVarChar, customer.address)
            .input('PaymentType', sql.VarChar, customer.paymentType || 'COD')
            .input('TotalAmount', sql.Decimal(18,2), total)
            .query(`
                INSERT INTO Orders (OrderId, CustomerName, CustomerPhone, CustomerAddress, PaymentType, TotalAmount)
                VALUES (@OrderId, @CustomerName, @CustomerPhone, @CustomerAddress, @PaymentType, @TotalAmount)
            `);

        // 2. Lưu từng sản phẩm vào bảng OrderItems
        for (let item of items) {
            await pool.request()
                .input('OrderId', sql.VarChar, orderId)
                .input('ProductId', sql.Int, item.product.id)
                .input('ProductName', sql.NVarChar, item.product.name)
                .input('Quantity', sql.Int, item.quantity)
                .input('Size', sql.VarChar, item.size)
                .input('Price', sql.Decimal(18,2), item.product.price)
                .query(`
                    INSERT INTO OrderItems (OrderId, ProductId, ProductName, Quantity, Size, Price)
                    VALUES (@OrderId, @ProductId, @ProductName, @Quantity, @Size, @Price)
                `);
        }

        console.log("🛒 ĐÃ LƯU ĐƠN HÀNG VÀO DATABASE:", orderId);
        
        cart = []; // Làm trống giỏ
        res.json({ message: "Đặt hàng thành công!", orderId: orderId });

    } catch (error) {
        console.log("🔴 Lỗi lưu đơn:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
});

app.listen(3000, () => {
    console.log("🚀 Kinet Server đang chạy tại http://localhost:3000");
});