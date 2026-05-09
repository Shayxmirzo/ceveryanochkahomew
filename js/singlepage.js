let params = new URLSearchParams(window.location.search);
let prId = params.get('id');

let onep = document.getElementById("one_page");

// DEBUG (you can remove later)
console.log("ID:", prId);
console.log("Products:", products);

// find product
let product = products.find(el => el.id == prId);

if (product) {
  onep.innerHTML = `
<div class="flex gap-6 w-full">

  <div class="flex flex-col gap-2">
    <img src="../img/${product.images[0]}" class="w-[70px] h-[70px] object-cover border rounded cursor-pointer transition duration-300 hover:scale-130" />
    <img src="../img/${product.images[1]}" class="w-[70px] h-[70px] object-cover border rounded cursor-pointer transition duration-300 hover:scale-130" />
    <img src="../img/${product.images[2]}" class="w-[70px] h-[70px] object-cover border rounded cursor-pointer transition duration-300 hover:scale-130" />
    <img src="../img/${product.images[3]}" class="w-[70px] h-[70px] object-cover border rounded cursor-pointer transition duration-300 hover:scale-130" />
  </div>

  <!-- Main Image -->
  <div class="flex-1 relative h-[500px] border rounded-lg overflow-hidden">
    <img src="../img/${product.images[0]}" 
         class="w-full h-full object-cover" />
         <div class="absolute bottom-0 w-[60px]  flex text-white font-bold justify-center items-center m-2.5 rounded-[5px] h-[40px] bg-[#FF6633]">${product.discount} %</div>
  </div>

</div>

      <div class="flex flex-col  justify-center">
        <h1 class="text-2xl font-semibold mb-4">
          ${product.name}
        </h1>

        <p class="text-gray-600 mb-6">
          ${product.description}
        </p>

        <p class="text-gray-600 font-bold mb-2">
          ${product.rating} rating ⭐
        </p>

        <div class="text-3xl font-bold mb-6">
          ${product.price} $
        </div>

        <button class="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg">
          Buy
        </button>
      </div>

    </div>
  `;
} else {
  onep.innerHTML = `<h1>Product not found</h1>`;
}


let 