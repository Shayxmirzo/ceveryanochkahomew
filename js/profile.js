let modal = document.getElementById("modal");
let modalContent = document.getElementById("modalContent");
let formmodal = document.getElementById("formModal");
let profileClick = document.getElementById("profileClick");
let profileimg = document.getElementById("profileimg");
let profilename = document.getElementById("profilename");


function showProfile(){
    let info = JSON.parse(localStorage.getItem("profileInfo") || "{}")
    profileimg.src = info.imgURL || "./img/avatar.png";
    profilename.textContent = info.name || "Log in";
}

profileClick.addEventListener("click", function(){
    modal.classList.remove("hidden")
})
modal.addEventListener("click", function(){
    modal.classList.add("hidden")
})
modalContent.addEventListener("click", function(e){
    e.stopPropagation();
})
formmodal.addEventListener("submit", function(e){
    e.preventDefault();
    let infos = {};
    infos.name = e.target[0].value;
    infos.imgURL = e.target[1].value;
    infos.number = e.target[2].value;
    localStorage.setItem("profileInfo", JSON.stringify(infos));
    showProfile()
    modal.classList.add("hidden")
})