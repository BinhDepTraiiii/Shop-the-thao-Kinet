const productList = document.getElementById("product-List");
function createProductList() {
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");
        productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price.toLocaleString()}₫</p>`
        productList.appendChild(productItem);
    });
}
createProductList();
