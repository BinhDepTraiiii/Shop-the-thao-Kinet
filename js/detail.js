const detailContainer = document.getElementById("product-detail-container");

function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

function renderProductDetail() {
    const productId = getProductIdFromUrl();
    const product = products.find(p => p.id === productId);

    if (product) {
        detailContainer.innerHTML = `
            <div class="detail-layout">
                <div class="detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <p class="price" style="color:red; font-size:24px; font-weight:bold">${product.price.toLocaleString('vi-VN')}₫</p>
                    
                    <div class="description">
                        <p><strong>Đặc điểm nổi bật:</strong></p>
                        <ul>
                            <li>Chất liệu thể thao cao cấp, co giãn 4 chiều.</li>
                            <li>Thấm hút mồ hôi cực tốt, phù hợp tập luyện cường độ cao.</li>
                            <li>Thiết kế hiện đại, form dáng chuẩn Kinet.</li>
                        </ul>
                    </div>

                    <div class="size-selection" style="margin: 15px 0;">
                        <label for="size-choose"><strong>Chọn Size:</strong></label>
                        <select id="size-choose" style="padding: 5px; margin-left: 10px;">
                            <option value="S">Size S (45-55kg)</option>
                            <option value="M" selected>Size M (50-60kg)</option>
                            <option value="L">Size L (55-65kg)</option>
                            <option value="XL">Size XL (65-75kg)</option>
                        </select>
                    </div>

                    <button class="btn-buy" id="btn-add-cart" style="padding:15px 30px; font-size:16px;">Thêm Vào Giỏ Hàng</button>
                </div>
            </div>
        `;

        document.getElementById('btn-add-cart').addEventListener('click', async () => {
            const selectedSize = document.getElementById('size-choose').value;
            try {
                const res = await fetch("http://localhost:3000/api/cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        product: product,
                        quantity: 1,
                        size: selectedSize
                    })
                });
                
                if (res.ok) {
                    alert(`✅ Đã thêm "${product.name}" (Size: ${selectedSize}) vào giỏ hàng!`);
                }
            } catch (error) {
                alert("Lỗi: Không thể kết nối tới server.");
            }
        });

    } else {
        detailContainer.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <h2>Sản phẩm không tồn tại!</h2>
                <a href="index.html" style="color: #007bff;">&larr; Quay về trang chủ</a>
            </div>
        `;
    }
}

renderProductDetail();