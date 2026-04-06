const productList = document.getElementById("product-List");

function createProductList() {
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price.toLocaleString()}₫</p>
            <button class="btn-buy" data-id="${product.id}">Mua</button>
        `;
        productItem.addEventListener('click', () => {
            window.location.href = `productDetail.html?id=${product.id}`;
        });
        const btnBuy = productItem.querySelector('.btn-buy');
        btnBuy.addEventListener('click', (e) => {
            e.stopPropagation(); /* Ngăn chặn event click lan ra ngoài */ 
            aalert(`Sản phẩm ${product.name} (ID: ${product.id}) đã được thêm vào giỏ hàng!`);
        });
        productList.appendChild(productItem);
    });
}
createProductList();
