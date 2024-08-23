document.querySelector(".find-doctor").addEventListener("click", function(){
    location.replace("../homePage/index.html"); 
})

document.querySelector(".medicines").addEventListener("click", function(){
    location.replace("../medicineDelivery/index.html"); 
})

document.querySelector(".virtual-nurse").addEventListener("click", function(){
    location.replace("../virtualNurse/index.html"); 
})

document.querySelector(".dropdown-section").addEventListener("mouseover", function(){
    document.querySelector(".dropdown-content").classList.add("show");
    document.querySelector(".services").classList.add("dropdown");
})

document.querySelector(".dropdown-section").addEventListener("mouseout", function(){
    document.querySelector(".dropdown-content").classList.remove("show");
    document.querySelector(".services").classList.remove("dropdown");
})
