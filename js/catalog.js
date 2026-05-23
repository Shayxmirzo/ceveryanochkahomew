let catalogren = document.getElementById("catalogrender")
categoriesData.map((el) =>{
    catalogren.innerHTML += `
    <a href="../Single_pages/catalogPages.html?name=${el.name}" class="relative w-[310px] h-[270px] rounded-2xl overflow-hidden cursor-pointer">

  <img
    src="${el.imageUrl}"
    alt="category"
    class="w-full h-full object-cover group-hover:scale-105 duration-300"
  >

  <!-- Dark overlay -->
  <div class="absolute inset-0 bg-black/30"></div>

  <!-- Green effect -->
  <div class="absolute inset-0 bg-gradient-to-t from-green-500/60 via-transparent to-green-400/40"></div>

  <!-- Text -->
  <h2 class="absolute bottom-4 left-4 text-white text-[24px] font-bold leading-tight z-10">
    ${el.name}
  </h2>

</a>
    `
})

// === CATALOG PART === //

let catalogBtn = document.getElementById("catalogBtn");
let catalogPopup = document.getElementById("catalogPopup")
let categories = document.getElementById("categories")

categoriesData.map((el) =>{
  categories.innerHTML += `
  <a href="../Single_pages/catalogPages.html?name=${el.name}" class="flex items-center gap-2 hover:text-[orangered] duration-300 hover:text-[18px] font-bold">
          <div class="w-[55px] h-[55px] rounded-full overflow-hidden duration-300 ">
            <img class="w-full h-full object-cover" src="${el.imageUrl}" alt="">
          </div>
          ${el.name}
        </a>
  `
})

catalogBtn.addEventListener("click", function(){
  catalogPopup.classList.toggle("-translate-y-[100%]")
})
// === Search part === //
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
