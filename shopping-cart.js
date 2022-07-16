//TODO create a shopping cart class that will take in an item then increment and decrement those items based on user input
//TODO get relevant items

const cartIcon = document.querySelector('.cart');
const cartWindow = document.querySelector('.shopping__cart_window');
const cartNumber = document.querySelector('.item_number');


const cartEmptyHTML = '<p class="empty-cart">Your Cart Is Empty</p>'
const cartWithItemHTML = ({itemName, number})=>`<div>${itemName}</div>`;
const handleShow=(e)=>{
    cartWindow.classList.toggle('shopping_cart_window--show')
}
cartIcon.addEventListener('click', handleShow);