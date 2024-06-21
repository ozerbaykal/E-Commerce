export function saveToLocalStorage(cart) {
    //local storage a veri ekledik eklerken string e çevirdik
    localStorage.setItem("cart",JSON.stringify(cart));
}

export function getCartFromLocalStorage(){
    //local storage da cart adında bir key varsa onları json formatında getir yoksa da boş bir dizi döndür
    return JSON.parse(localStorage.getItem("cart")) || [] ;
}

//sepetteki ürün miktarını hesaplar
export function updateCartIcon(cart){
   const cartIcon =document.getElementById("cart-icon");
   const i = document.querySelector(".bx-shopping-bag");

   

   let totalQuantity = cart.reduce((sum,item)=> sum + item.quantity,0);
 
   i.setAttribute("data-quantity",totalQuantity);
   cartIcon.setAttribute("data-quantity",totalQuantity);





}

export function calculateCartTotal(cart){
   return cart.reduce((sum,item)=> sum + item.price * item.quantity,0);
}
