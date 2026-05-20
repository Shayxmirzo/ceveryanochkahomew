let loading = document.getElementById("loading")

window.addEventListener("load", function () {
  loading.classList.add("hidden")
})

let search = document.getElementById("search")
let searchcards = document.getElementById("searchcards")
let searchExist = false;

searchExist ? searchcards : searchcards.classList.add("hidden")

search.addEventListener("input", function (e) {

  let searchValue = e.target.value;

  if (searchValue) {
    searchExist = true;
    searchcards.classList.remove("hidden")
  } else {
    searchExist = false;
    searchcards.classList.add("hidden")
  }

  let searchProducts = products.filter((el) =>
    el.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  searchcards.innerHTML = "";

  if (searchProducts.length === 0) {

    searchcards.innerHTML = `
      <p class="text-center py-1 font-bold">
        Sorry! Product not found
      </p>
    `
  }

  searchProducts.map((el) => {

    searchcards.innerHTML += `
<div class="w-full shrink-0 h-[80px] border rounded-[15px] overflow-hidden">

    <a href="../Single_pages/singlep.html?id=${el.id}" class="w-full flex items-center gap-5 block">

        <div class="w-[80px] h-[80px] flex-shrink-0 overflow-hidden rounded-[12px] bg-gray-100">

            <img
                class="w-full h-full object-cover object-center"
                src="${el.images[0]}"
                alt=""
            >

        </div>

        <div class="">

            <h1 class="text-[20px] font-bold">
              ${el.name}
            </h1>

            <p class="line-clamp-1 text-[16px]">
              ${el.description}
            </p>

            <p class="text-gray-600 text-[14px] font-bold">
              ${el.rating} ⭐
            </p>

        </div>

    </a>

</div>
`;
  })
})

let carTitle = document.getElementById("carTitle")
let main = document.querySelector(".mainn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let budge = document.getElementById("budge");
let bige = document.getElementById("bige");
let selectAll = document.getElementById("selectAll");
let deleteBtn = document.getElementById("deleteSelected");


let totalp = document.getElementById("Totalprice");
let discountnum = document.getElementById("Discountnum");
let totalElement = document.getElementById("Total");
let thePricesh = document.getElementById("thePricesh")
let promoDiscount = 0;
let promo = document.getElementById("promo")
let promocheck = document.getElementById("promo-check")
function updatePriceBlock() {

  if (cart.length === 0) {
    thePricesh.classList.add("hidden")
  } else {
    thePricesh.classList.remove("hidden")
  }

}

cart = cart.map(item => ({
  ...item,
  quantity: item.quantity || 1,
  selected: item.selected ?? false
}));


window.addEventListener("DOMContentLoaded", () => {

  updateBadge()
  updateBige()
  updatePriceBlock()

  setTimeout(() => {
    renderCart()
    calculatePrices()
  }, 0)

})


function updateBadge() {

  budge.textContent = cart.length;

  if (cart.length === 0) {
    budge.style.display = "none";
  } else {
    budge.style.display = "flex";
  }
}


function updateBige() {

  bige.textContent = cart.length;

  if (cart.length === 0) {
    bige.style.display = "none";
  } else {
    bige.style.display = "flex";
  }
}

if (selectAll) {

  selectAll.addEventListener("change", function () {

    let isChecked = this.checked;

    cart = cart.map(item => ({
      ...item,
      selected: isChecked
    }));

    saveCart();
    renderCart();
    calculatePrices();
  });
}


if (deleteBtn) {

  deleteBtn.addEventListener("click", function () {

    cart = cart.filter(item => !item.selected);

    saveCart();
    renderCart();
    updateBadge();
    updateBige();
    updatePriceBlock()
    calculatePrices();
  });
}


function renderCart() {

  main.innerHTML = "";

  if (cart.length === 0) {

    carTitle.classList.add("hidden");

    main.innerHTML = `
      <div class="text-center mt-20 text-[28px] font-bold text-gray-500">
        Cart is empty 🛒
      </div>
    `;

    return;
  }

  carTitle.classList.remove("hidden");

  cart.forEach(item => {

    let product = products.find(el => el.id == item.id);

    if (product) {

      let finalPrice =
        product.price *
        ((100 - product.discount) / 100) *
        item.quantity;

      main.innerHTML += `

        <div class="max-w-[900px] w-full max-h-[140px] bg-white p-5 rounded-xl shadow flex gap-3 items-center overflow-hidden">

          <div class="w-[140px] h-[140px] shrink-0 rounded-lg relative overflow-hidden bg-gray-100">

            <img 
              src="${product.images[0]}" 
              class="w-full h-full object-cover"
            >

            <div class="checks absolute top-0 left-0 m-2.5">

              <input
                type="checkbox"
                ${item.selected ? "checked" : ""}
                onchange="toggleSelect(${product.id})"
                class="appearance-none w-6 h-6 rounded border-2 border-white bg-transparent cursor-pointer
                checked:bg-green-500 checked:border-green-500
                checked:before:content-['✓']
                checked:before:text-white
                checked:before:text-sm
                checked:before:flex
                checked:before:items-center
                checked:before:justify-center"
              >

            </div>

          </div>

          <div class="flex-1 min-w-0">

            <h1 class="text-[20px] font-bold">
              ${product.name}
            </h1>

            <p class="text-gray-500">
              ${product.description}
            </p>

           <div class="mt-3 flex items-center gap-3 flex-wrap">

  ${product.discount > 0 ? `
       <p class="text-gray-400 line-through text-[18px]">
          ${product.price} $
        </p>

        <p class="text-orange-500 font-bold text-[24px]">
         ${product.price * (100 - product.discount)/100} $
        </p>
     `: `
        <p class="text-orange-500 font-bold text-[24px]">
          ${product.price} $
        </p>
      `

  }

</div>
          </div>

          <div class="flex ml-[0px] items-center gap-1 min-w-[100px] justify-center">

            <button 
              onclick="minus(${product.id})"
              class="w-[38px] h-[38px] bg-orange-500 text-white rounded-lg cursor-pointer"
            >
              -
            </button>

            <span class="font-bold text-[24px] w-[40px] text-center">
              ${item.quantity}
            </span>

            <button 
              onclick="plus(${product.id})"
              class="w-[38px] h-[38px] bg-green-500 text-white cursor-pointer rounded-lg"
            >
              +
            </button>

          </div>

          <div class="w-[100px] text-right">

            <h1 class="text-[24px] font-bold max-w-[200px] w-full">
              ${finalPrice.toFixed(1)} $
            </h1>

          </div>

        </div>
      `;
    }
  });

  if (selectAll) {

    selectAll.checked =
      cart.length > 0 &&
      cart.every(item => item.selected);
  }
}


function plus(id) {

  let item = cart.find(el => el.id == id);

  if (item) {
    item.quantity++;
  }

  saveCart();
  renderCart();
  updateBadge();
  updateBige();
  updatePriceBlock()
  calculatePrices();
}


function minus(id) {

  let item = cart.find(el => el.id == id);

  if (item) {

    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(el => el.id != id);
    }
  }

  saveCart();
  renderCart();
  updateBadge();
  updateBige();
  updatePriceBlock()
  calculatePrices();
}


function toggleSelect(id) {

  cart = cart.map(item => {

    if (item.id == id) {
      item.selected = !item.selected;
    }

    return item;
  });

  saveCart();
  renderCart();
  updateBadge();
  updateBige();
  calculatePrices();
}


function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


function calculatePrices() {

  let sum = 0;
  let discount = 0;

  cart.forEach(item => {

    let product = products.find(el => el.id == item.id);

    if (product) {

      let quantity = Number(item.quantity) || 1;
      let price = Number(product.price) || 0;
      let productDiscount = Number(product.discount) || 0;

      sum += price * quantity;

      discount +=
        (price * quantity * productDiscount) / 100;
    }
  });

  discount += promoDiscount;

  totalp.textContent = sum.toFixed(1) + " $";
  discountnum.textContent = discount.toFixed(1) + " $";
  totalElement.textContent = (sum - discount).toFixed(1) + " $";
}
promocheck.addEventListener("click", function(){
if(promo.value === "hello" || "12345"){
  promoDiscount = 200;
}else{
  promoDiscount = 0;
}
calculatePrices(0, 0)
})

