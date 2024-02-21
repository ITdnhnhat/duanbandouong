
const productApi = 'http://localhost:4000/product';
let getProducts = [];

// start cart
const getCart = (callback) =>{
    fetch(cartApi)
    .then(response => response.json())
    .then(callback)
}
const orderCart = (id) =>{
    const product = getProducts.find((product) => product.id === id);
    let orderCart = localStorage.getItem('orderCart');
    if (orderCart) {
        orderCart = JSON.parse(orderCart);
        const nowProduct = orderCart.find((item) => item.id === product.id);
        if (nowProduct) {
        nowProduct.quantity += 1;
        } else {
        orderCart.push({ ...product, quantity: 1 });
        }
    } else {
        orderCart = [{ ...product, quantity: 1 }];
    }

    localStorage.setItem('orderCart', JSON.stringify(orderCart));
    renderCart();
}
const renderCart = () => {
    const listCartBlock = document.querySelector('#list-cart');
    const orderCart = localStorage.getItem('orderCart');
    if (orderCart) {
      const products = JSON.parse(orderCart);
      let cartHTML = "";
      products.forEach((product) => {
        cartHTML += `
            <div class="item">
                <img src="/../upload/images/${product.images}">
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price} / 1 ly</div>
                </div>
                <div class="quantity">
                <button onclick="changeQuantity(${product.id}, '-')">-</button>
                <span class="value" id="quantity-${product.id}">${product.quantity}</span>
                <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>
            </div>
        `;
      });
      listCartBlock.innerHTML = cartHTML;
    } else {
      listCartBlock.innerHTML = "Giỏ hàng trống";
    }
  };
  
renderCart();

const changeQuantity = (productId, operation) => {
    let orderCart = localStorage.getItem('orderCart');
    if (orderCart) {
      orderCart = JSON.parse(orderCart);
      const productIndex = orderCart.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        const product = orderCart[productIndex];
        if (operation === '-') {
          if (product.quantity > 1) {
            product.quantity -= 1;
          } else {
            orderCart.splice(productIndex, 1);
          }
        } else if (operation === '+') {
          product.quantity += 1;
        }
        localStorage.setItem('orderCart', JSON.stringify(orderCart));
  
        const quantityElement = document.getElementById(`quantity-${productId}`);
        if (quantityElement) {
          quantityElement.textContent = product.quantity;
        }
      }
    }
    renderCart();
};

// end cart

const renderProduct = (products) => {
      let productListHTML = "";
      getProducts = products
      const listProductBlock = document.querySelector('#list-product');
      const htmls = products.map((product) => {
          productListHTML += `
          <div class="col-sm-3 col-xs-6 sticky product-item item-product-${product.id}" style="background-image: none;" data-key="${product.id}">
              <a href="" class="item-warpper">
                  <span class="badge new">món mới</span>
                  <img src="/upload/images/${product.images}" alt="" class="item-img item-img-${product.id} img-responsive">                    
              </a>
              <div class="item-info">
                  <div class="item-name item-name-${product.id}">${product.name}</div>
                  <div class="item-des item-des-${product.id}">${product.description}</div>
                  <div class="item-price item-price-${product.id}">${product.price}</div>
                  <button class="btn btn-primary" style="text-decoration: none;" onclick="orderCart(${product.id})">Đặt hàng</button>
              </div>
          </div>`;
      });
      listProductBlock.innerHTML = productListHTML;
};


//function
const getProduct = (callback) => {
    fetch(productApi)
        .then(response => response.json())
        .then(callback);
};


const start = () => {
    getProduct(renderProduct);
};

start();
