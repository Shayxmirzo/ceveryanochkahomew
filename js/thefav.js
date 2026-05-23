let loading = document.getElementById("loading");

window.addEventListener("load", () => {
  loading.style.display = "none";
});

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
if(searchProducts.length === 0){
  searchcards.innerHTML = `<p class="text-center py-1 font-bold">Sorry! Product not found</p>`
}else{
  
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
            <h1 class="text-[20px] font-bold">${el.name}</h1>
            <p class="line-clamp-1 text-[16px]">${el.description}</p>
            <p class="text-gray-600 text-[14px] font-bold">${el.rating} ⭐</p>
        </div>
    </a>
</div>
`;
})
})
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let favcontainer = document.getElementById("favcontainer")
let thefavor = document.getElementById("thefavor")
let thefavtext = document.getElementById("thefavtext")
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let isExist = false;
let mainn = document.getElementById("mainn")
let favoriteProducts = products.filter(p =>
  favorites.includes(p.id)
);
function renderFavourite(content, data){
  content.innerHTML = ""
  if(favoriteProducts.length === 0){
    thefavtext.classList.add("hidden")
    mainn.innerHTML = `
      <div class="text-center mt-20 text-[28px] font-bold text-gray-500">
        You don't have favourite product, but you can see them here!
      </div>
    `;

  }else{
    thefavtext.classList.remove("hidden")
data.forEach((el) =>{
    let isFavorite = favorites.includes(el.id);
  content.innerHTML += `
        <div class="s_one w-full bg-white flex flex-col justify-between gap-4 h-[360px] overflow-hidden ">
          <a href="../Single_pages/singlep.html?id=${el.id}" class="sale_imgc w-full h-[160px] relative">
            <img class="object-cover w-full h-[160px]" src="${el.images[0]}" alt="png">

            ${el.discount > 0
              ? `<div class="absolute bottom-0 w-[60px] flex text-white font-bold justify-center items-center m-2.5 rounded-[5px] h-[40px] bg-[#FF6633]">${el.discount} %</div>`
              : ''
            }
             <div 
 onclick="toggleFavorite(event, ${el.id})"
 class="absolute top-2 right-2 w-[34px] h-[34px]
${isFavorite ? 'bg-red-500' : 'bg-white/90'}
backdrop-blur shadow-md rounded-[6px]
flex items-center justify-center hover:scale-110 transition"
  data-fav="${el.id}"
  >
    <img 
  class="fav-icon duration-300 ${isFavorite ? '' : 'grayscale'}"
  src="../assets/images/favourites.svg"
  alt="png"
>

  </div>
          </a>

          <div class="m-2.5">
            <div class="cost mx-auto h-[28px] flex items-end justify-between font-[Rubik]">
              <h1 class="font-bold text-[18px]">${el.price} $</h1>
            </div>

            <p class="mt-[8px] line-clamp-2 text-[17px]">
              ${el.description}
            </p>

            <div class="lastforone mt-[15px] flex flex-col w-full mx-auto gap-[8px]">
              <p class="text-gray-600 font-bold">${el.rating} rating ⭐</p>

              ${
                isExist = cart.find(item => item.id == el.id)
                  ? `
                  <div class="grid grid-cols-3 gap-2 items-center">
                    <button onclick="decreaseQuantity(${el.id})"
                      class="bg-[#FF6633] text-white rounded-[4px] h-[40px]">-</button>

                    <span id="quantity-${el.id}"
                      class="bg-gray-100 rounded-[4px] h-[40px] flex items-center justify-center font-bold">
                      ${cart.find(item => item.id == el.id).quantity}
                    </span>

                    <button onclick="increaseQuantity(${el.id})"
                      class="bg-[#FF6633] text-white rounded-[4px] h-[40px]">+</button>
                  </div>
                  `
                  : `
                  <button onclick="addToCart(${el.id})"
                    class="w-full h-[40px] border duration-500 border-[#70C05B] text-[#70C05B] rounded-[4px] hover:bg-[#FF6633] hover:text-white hover:border-none">
                    Buy
                  </button>
                  `
              }

            </div>
          </div>
        </div>
      `;
})
  }


}
function updatefav() {
  if (!thefavor) return;

  thefavor.textContent = favorites.length;

  if (favorites.length === 0) {
    thefavor.style.display = "none";
  } else {
    thefavor.style.display = "flex";
  }
}
function updateBadge() {
  badge.textContent = cart.length;

  if (cart.length === 0) {
    badge.style.display = "none";
  } else {
    badge.style.display = "flex";
  }
}
updateBadge()
updatefav();
renderFavourite(favcontainer, favoriteProducts)
function toggleFavorite(event, id) {
  event.preventDefault();
  event.stopPropagation();

  let btn = event.currentTarget;
  let icon = btn.querySelector(".fav-icon");

  let exists = favorites.find(item => item == id);

  if (exists) {

    favorites = favorites.filter(item => item != id);

    btn.classList.remove("bg-red-500");
    btn.classList.add("bg-white/90");

    icon.classList.add("grayscale");

  } else {

    favorites.push(id);

    btn.classList.remove("bg-white/90");
    btn.classList.add("bg-red-500");

    icon.classList.remove("grayscale");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));

  updatefav()
}
function addToCart(id) {
  let item = cart.find(el => el.id == id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({
      id: id,
      quantity: 1
    });
  }


  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadge();
  renderFavourite(favcontainer, favoriteProducts)
}
function increaseQuantity(id) {
  let item = cart.find(el => el.id == id);

  if (item) {
    item.quantity++;
  }


  localStorage.setItem("cart", JSON.stringify(cart));
  updateBadge();
  renderFavourite(favcontainer, favoriteProducts)
}
function decreaseQuantity(id) {
  let item = cart.find(el => el.id == id);

  if (item) {
    item.quantity--;

    if (item.quantity <= 0) {
      cart = cart.filter(el => el.id != id);
    }
  }


  localStorage.setItem("cart", JSON.stringify(cart));
updateBadge();
  renderFavourite(favcontainer, favoriteProducts)
}
