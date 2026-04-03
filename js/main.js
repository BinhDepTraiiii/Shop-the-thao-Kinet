const productList = document.getElementById("product-List");

function createProductList() {
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
        <data-id="${product.id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price.toLocaleString()}₫</p>
        <button class="btn-buy" data-id="${product.id}">Mua</button>`;
        productItem.addEventListener('click', () => {
            window.location.href = `productDetail.html?id=${product.id}`;
        });
        productList.appendChild(productItem);
    });
}
createProductList();
document.querySelectorAll(".product-item").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        const id = btn.getAttribute('data-id');
    });
});
