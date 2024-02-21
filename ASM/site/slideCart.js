const iconCart = document.querySelector('.cart-text');
const cart = document.querySelector('.cartt');
const container = document.querySelector('.container');
const close = document.querySelector('.close');
iconCart.addEventListener('click', function(){
    if(cart.style.right == '-100%'){
        cart.style.right = '0';
        container.style.transform = 'translateX(-400px)';
    }else{
        cart.style.right = '-100%';
        container.style.transform = 'translateX(0)';
    }
})
close.addEventListener('click', function (){
    cart.style.right = '-100%';
    container.style.transform = 'translateX(0)';
})
