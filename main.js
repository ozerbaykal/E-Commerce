
import { fetchProducts,renderProducts} from "./js/products.js";
import { addToCart, displayCartTotal, renderCartItems } from "./js/cart.js";

let menu=document.querySelector(".navbar")
let menuIcon=document.querySelector("#menu-icon");

menuIcon.addEventListener("click",()=>menu.classList.toggle("open-menu"));







document.addEventListener("DOMContentLoaded",async()=>{
   
   if(window.location.pathname.includes("cart.html")){
      renderCartItems();
      displayCartTotal();
     

   
      

   }else{
    //eğer sayfa cart html sayfasında değilse ürünleri al.
    const products = await fetchProducts();
    //ürünleri render et ve addToCartCallback fonksiyonunu tanımla
    renderProducts(products ,(event)=>addToCart(event,products));


    
    
    

   }


});

