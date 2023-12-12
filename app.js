const cartIcon = document.querySelector("#ShopingIcon");
const cart = document.querySelector(".cartMenu");
const cartClose = document.querySelector("#cartClose");
let removeCartBtn = document.getElementsByClassName("cartDelete");
let totalPrice = document.getElementsByClassName("totalPrice")[0];
let addCart = document.getElementsByClassName("addCart");
let cartItems = document.getElementsByClassName("cartContentMenu")[0];
const buyBtn = document.getElementsByClassName("buyBtn")[0];

cartIcon.onclick = () => {
  cart.classList.add("active");
};

cartClose.onclick = () => {
  cart.classList.remove("active");
};

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  for (let i = 0; i < removeCartBtn.length; i++) {
    let btn = removeCartBtn[i];
    btn.addEventListener("click", removeCartItem);
  }
  let quantityInput = document.getElementsByClassName("cartQuantityProduct");
  for (let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }

  for (let i = 0; i < addCart.length; i++) {
    let btn = addCart[i];
    btn.addEventListener("click", addCartClicked);
  }

  buyBtn.addEventListener("click", buyBtnClicked);
}

function buyBtnClicked() {
  alert("Buyurtmangiz joylandi!");
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  updateTotal();
}

function removeCartItem(event) {
  let btnClicked = event.target;
  btnClicked.parentElement.remove();
  updateTotal();
  totalPrice = 0;
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

function addCartClicked(event) {
  let btn = event.target;
  let shopPrdcts = btn.parentElement;
  let title = shopPrdcts.getElementsByClassName("productTitle")[0].innerText;
  let price = shopPrdcts.getElementsByClassName("productPrice")[0].innerText;
  let image = shopPrdcts.getElementsByClassName("productImg")[0].src;
  addPrdctsCart(title, price, image);
  updateTotal();
}

function addPrdctsCart(title, price, image) {
  let cartItemsNames = cartItems.getElementsByClassName("cartTitleProduct");
  for (let i = 0; i < cartItemsNames.length; i++) {
    let cartItemTitle = cartItemsNames[i].innerText;
    if (cartItemTitle === title) {
      alert("Siz allaqachon ushbu mahsulotni sotib oldingiz!");
      return;
    }
  }

  let cartWrapContent = `
      <div class="cartWrap">
          <img src="${image}" class="cartImg">
          <div class="cartInfoWrap">
              <div class="cartTitleProduct">${title}</div>
              <div class="cartPriceProduct">${price}</div>
              <input type="number" value="1" class="cartQuantityProduct">
          </div>
          <!-- Savat elementini o'chirish -->
          <i class="fa-sharp fa-solid fa-trash cartDelete"></i>
      </div>
    `;

  let cartsShopWrap = document.createElement("div");
  cartsShopWrap.innerHTML = cartWrapContent;

  cartItems.appendChild(cartsShopWrap);

  let deleteButton = cartsShopWrap.getElementsByClassName("cartDelete")[0];
  let quantityInput = cartsShopWrap.getElementsByClassName(
    "cartQuantityProduct"
  )[0];

  deleteButton.addEventListener("click", removeCartItem);
  quantityInput.addEventListener("change", quantityChanged);

  updateTotal();
}

function updateTotal() {
  let cartContentMenu = document.getElementsByClassName("cartContentMenu")[0];
  let cartWrap = document.getElementsByClassName("cartWrap");
  let total = 0;
  for (let i = 0; i < cartWrap.length; i++) {
    let cartBox = cartWrap[i];
    let priceEl = cartBox.getElementsByClassName("cartPriceProduct")[0];
    let quantityEl = cartBox.getElementsByClassName("cartQuantityProduct")[0];
    let price = parseFloat(priceEl.innerText.replace("$", ""));
    let quantity = quantityEl.value;
    total = total + price * quantity;
  }

  totalPrice.innerText = total + " $";
}
