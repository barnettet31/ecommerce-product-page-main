//TODO create a shopping cart class that will take in an item then increment and decrement those items based on user input
//TODO get relevant items

const cartIcon = document.querySelector(".cart");
const cartWindow = document.querySelector(".shopping__cart_window");
const cartNumber = document.querySelector(".item_number");
const cartContents = document.querySelector(".cart-contents");
const countContainer = document.querySelector('.count-container');
const cartContainer = document.querySelector('.cart-container');
const pCurrentCount = document.querySelector('.current-count');
const setCartContents = (string) => cartContents.innerHTML = string;

const cartEmptyHTML = '<p class="empty-cart">Your Cart Is Empty</p>';

const cartWithItemHTML = ({ itemName, numberOfItems, price }) => {
    const dollarFormatter = new Intl.NumberFormat("en-US", {
        maximumSignificantDigits: 2,
    });
    const totalPrice = dollarFormatter.format(numberOfItems * price);
    return `<div class="item_container">
<img src="./images/image-product-1-thumbnail.jpg" alt="Item Thumbnail" class="cart_thumb"/>
<div class="cart_item_details">
  <p class="cart_item_name">${itemName}</p>
  <p class="cart_price_information">${price} x ${numberOfItems} <span class='cart_item_price_total'>$${totalPrice}</span></p>
</div>
<img class="cart-trash" src="./images/icon-delete.svg"/>
</div>
<button class="checkout_button">Checkout</button>
</div>`;
};
class ShoppingCart {
    constructor(itemName, price, numberOfItems) {
        this.itemName = itemName;
        this.price = price;
        this.numberOfItems = numberOfItems;
    }
    setCartItems() {
        if (this.numberOfItems == 0) return setCartContents(cartEmptyHTML);
        const params = {
            itemName: this.itemName,
            price: this.price,
            numberOfItems: this.numberOfItems
        }
        const newHTML = cartWithItemHTML(params);
        setCartContents(newHTML);
        localStorage.setItem('shoppingCart', JSON.stringify(params));
    }
    changeAttrs({itemName, price, numberOfItems}){
        this.itemName = itemName;
        this.price = price;
        this.numberOfItems = numberOfItems;
       this.setCartItems()
    }
    incrementItems(number){
        this.numberOfItems += number;
        this.setCartItems();
    }
    decrementItems(){
        if(this.numberOfItems == 0) return
        this.numberOfItems -= 1;
        this.setCartItems();
    }
    resetCart(){
        this.numberOfItems = 0;
        this.setCartItems();
        handleShowCartWindow();
        localStorage.removeItem('shoppingCart')
    }
}
const currentCart = new ShoppingCart('Fall Limited Edition Sneakers', 125.00, 0);
const handleInit = () => {
    const shoppingCart = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : { itemName: 'Fall Limited Edition Sneakers', price: 125.00, numberOfItems: 0 };
    currentCart.changeAttrs(shoppingCart);
}


window.addEventListener('load', handleInit);

const handleShowCartWindow = (e) => {
    cartWindow.classList.toggle("shopping_cart_window--show");
};
cartIcon.addEventListener("click", handleShowCartWindow);



const updateItemCount = ()=>{
   pCurrentCount.innerHTML = countContainer.getAttribute('data-count');
}
const handleCountInc = ()=>{
    
   const currentCount =  Number(countContainer.getAttribute('data-count'));
   countContainer.setAttribute('data-count', (currentCount + 1).toString()) 
   updateItemCount();
}
const handleCountDec = ()=>{
    const currentCount =  Number(countContainer.getAttribute('data-count'));
    if(currentCount == 0) return;
    countContainer.setAttribute('data-count', (currentCount - 1).toString()) 
    updateItemCount();
 }
 const resetCount=()=>{
    countContainer.setAttribute('data-count', '0')
    updateItemCount();
 }
const handleAddToCart =()=>{
    const currentCount = Number(countContainer.getAttribute('data-count'));
    if(currentCount == 0) return;
    currentCart.incrementItems(currentCount);
    handleShowCartWindow();
    resetCount();
}
cartContainer.addEventListener('click', ({target})=>{
    
    if(target.classList.contains('plus')) return handleCountInc();
    if(target.classList.contains('minus')) return handleCountDec();
    if(target.classList.contains('add-to-cart')) return handleAddToCart();
})

cartContents.addEventListener('click', ({target})=>{
    if(target.classList.contains('cart-trash')) currentCart.resetCart();
}
)