// Lấy thẻ chứa nội dung
const detailContainer = document.getElementById("product-detail-container");

// Hàm để lấy tham số ID từ URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

function renderProductDetail() {
    const productId = getProductIdFromUrl();
    
    // Tìm sản phẩm trong mảng products (từ file products.js) có id trùng khớp
    const product = products.find(p => p.id === productId);

    if (product) {
        // Nếu tìm thấy, hiển thị layout chia 2 cột: Ảnh bên trái, Thông tin bên phải
        detailContainer.innerHTML = `
            <div class="detail-layout">
                <div class="detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <p class="price">${product.price.toLocaleString('vi-VN')}₫</p>
                    
                    <div class="description">
                        <p><strong>Đặc điểm nổi bật:</strong></p>
                        <ul>
                            <li>Chất liệu thể thao cao cấp, co giãn 4 chiều.</li>
                            <li>Thấm hút mồ hôi cực tốt, phù hợp tập luyện cường độ cao.</li>
                            <li>Thiết kế hiện đại, form dáng chuẩn theo phong cách Kinet.</li>
                        </ul>
                    </div>

                    <div class="size-selection">
                        <label for="size-choose"><strong>Chọn Size:</strong></label>
                        <select id="size-choose">
                            <option value="S">Size S (45-55kg)</option>
                            <option value="L">Size L (55-65kg)</option>
                            <option value="XL">Size XL (65-75kg)</option>
                        </select>
                    </div>

                    <button class="btn-buy-large" id="btn-add-cart">Thêm Vào Giỏ Hàng</button>
                </div>
            </div>
        `;

        // Thêm sự kiện cho nút Mua ở trang chi tiết
        document.getElementById('btn-add-cart').addEventListener('click', () => {
            const selectedSize = document.getElementById('size-choose').value;
            alert(`Đã thêm "${product.name}" (Size: ${selectedSize}) vào giỏ hàng!`);
        });

    } else {
        // Nếu nhập sai ID hoặc không có sản phẩm
        detailContainer.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>Sản phẩm không tồn tại!</h2>
                <a href="index.html" style="color: #007bff; text-decoration: none;">&larr; Quay về trang chủ</a>
            </div>
        `;
    }
}

// Chạy hàm khi load trang
renderProductDetail();