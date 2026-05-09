let loading = document.getElementById("loading")
window.addEventListener("load", function(){
  loading.classList.add("hidden")
})

let search = document.getElementById("search")
let searchcards = document.getElementById("searchcards")
let searchExist = false;
searchExist ? searchcards : searchcards.classList.add("hidden")
search.addEventListener("input", function(e) {
  let searchValue = e.target.value;
  if(searchValue){
    searchExist = true;
    searchcards.classList.remove("hidden")
  }else{
    searchExist = false;
    searchcards.classList.add("hidden")
  }
let searchProducts = products.filter((el) => el.name.toLowerCase().includes(searchValue.toLowerCase()))
searchcards.innerHTML = "";
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
            <h1 class="text-[20px] font-bold">${el.name}</h1>
            <p class="line-clamp-1 text-[16px]">${el.description}</p>
            <p class="text-gray-600 text-[14px] font-bold">${el.rating} ⭐</p>
        </div>
    </a>
</div>
`;
})
})



let main = document.querySelector(".mainn");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderCart();

function renderCart() {
  main.innerHTML = "";

  if (cart.length === 0) {
    main.innerHTML = `
      <div class="text-center mt-20 text-[28px] font-bold text-gray-500">
        Cart is empty 🛒
      </div>
    `;
    return;
  }

  cart.forEach(item => {
    let product = products.find(el => el.id == item.id);

    if (product) {
      main.innerHTML += `
        <div class="max-w-[1300px] w-full mx-auto bg-white p-5 rounded-xl shadow flex gap-5 items-center overflow-hidden">

          <!-- Image -->
          <div class="w-[180px] h-[180px] shrink-0 rounded-lg overflow-hidden bg-gray-100">
            <img 
              src="${product.images[0]}" 
              class="w-full h-full object-cover"
            >
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <h1 class="text-[24px] font-bold line-clamp-1">
              ${product.name}
            </h1>

            <p class="text-gray-500 line-clamp-2 mt-2 text-[16px]">
              ${product.description}
            </p>

            <p class="text-orange-500 font-bold text-[24px] mt-3">
              ${product.price} $
            </p>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-3 shrink-0">
            <button onclick="minus(${product.id})"
              class="w-[45px] h-[45px] bg-orange-500 text-white rounded-lg text-[22px]">
              -
            </button>

            <span class="font-bold text-[24px] min-w-[30px] text-center">
              ${item.quantity}
            </span>

            <button onclick="plus(${product.id})"
              class="w-[45px] h-[45px] bg-green-500 text-white rounded-lg text-[22px]">
              +
            </button>
          </div>

        </div>
      `;
    }
  });
}
function plus(id) {
  let item = cart.find(el => el.id == id);
  item.quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function minus(id) {
  let item = cart.find(el => el.id == id);

  item.quantity--;

  if (item.quantity <= 0) {
    cart = cart.filter(el => el.id != id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}