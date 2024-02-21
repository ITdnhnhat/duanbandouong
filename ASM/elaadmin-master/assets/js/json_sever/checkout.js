const renderOrderCart = (products) => {
    const listCartBlock = document.querySelector('.list');
    const totalPriceInput = document.querySelector('.totalPrice')
    let checkoutHTML = "";
    let totalPrice = 0;
  
    products.forEach((product) => {
      const subtotal = product.price * product.quantity;
      totalPrice += subtotal;
  
      checkoutHTML += `
        <div class="item">
          <img src="/upload/images/${product.images}">
          <div class="info">
            <div class="name">${product.name}</div>
            <div class="price">$${product.price} / ${product.quantity} sản phẩm</div>
          </div>
          <div class="quantity">${product.quantity}</div>
          <div class="subtotal">$${subtotal}</div>
        </div>
      `;
    });
  
    listCartBlock.innerHTML = checkoutHTML;
  
      const totalElement = document.createElement('div');
      totalElement.classList.add('total');
      totalElement.textContent = `Tổng Tiền: $${totalPrice}`;
      listCartBlock.appendChild(totalElement);
      totalPriceInput.textContent = `$${totalPrice}`;
  };
  
  const handleEmptyCart = () => {
    const listCartBlock = document.querySelector('.list');
    listCartBlock.innerHTML = "Giỏ hàng trống";
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const orderCart = localStorage.getItem('orderCart');
  
    if (orderCart) {
      const products = JSON.parse(orderCart);
      renderOrderCart(products);
    } else {
      handleEmptyCart();
    }
});

const checkout = document.querySelector('.buttonCheckout');

const handleCheckout = () => {
    localStorage.removeItem('orderCart');  
    setTimeout(() => {
      alert("Đặt hàng thành công ! Cảm ơn quý khách")
      window.location.href = '/site/thucuong.html';
    }, 1000);
};

checkout.addEventListener('click', handleCheckout);
