import { saveToLocalStorage, getCartFromLocalStorage, updateCartIcon, calculateCartTotal } from "./utils.js";

let cart = getCartFromLocalStorage();
//sepete ürün ekleyrecek fonksiyon
export function addToCart(event, products) {
    const productID = parseInt(event.target.dataset.id); //tıkladığımız ürüne eriştik ve idsini number tipine çevirdik
    //products dizisi içerisinden idsine ulaştığımız ürünü bulabilmek için find methodunu kullandık
    const product = products.find((product) => product.id === productID);

    //ürün bulursak bu if çalısacak
    if (product) {
        //sepette önceden ekledğimiz elemanı bulduk
        const exitingItem = cart.find((item) => item.id === productID);


        if (exitingItem) {
            //miktarını bir artırır
            exitingItem.quantity++;

        }
        else {
            //sepette bu ürünler daha önce yoksa sepete bir ürün ekleyeceğiz.
            //sepet dizisine ekleyeceğimiz ürünün miktar özelliğini  ekledik.
            const cartItem = {

                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1,

            };
            cart.push(cartItem);//cart dizisine oluşturduğumuz objeyi gönderdik

            event.target.textContent = "Added";//ekleme butonunun içeriğini değiştirdik
            updateCartIcon(cart);
            saveToLocalStorage(cart);

            renderCartItems();
            displayCartTotal();
        }

    }

}
//sepetten ürün siler
function removeFromCart(event) {
    const productID = parseInt(event.target.dataset.id);
    //tıkladığımız  elemanı sepetten kaldırır.
    cart = cart.filter((item) => item.id !== productID);
    //local storage güncelle
    saveToLocalStorage(cart);
    //sayfayı güncelle
    renderCartItems();

    displayCartTotal();
    updateCartIcon(cart);

}
function changeQuantity(event) {
    const quantity = parseInt(event.target.value);
    //değişim olan ürünün  idsine eriştik
    const productID = parseInt(event.target.dataset.id);

    if (quantity > 0) {

        const cartItem = cart.find((item) => item.id === productID);
        if (cartItem) {
            cartItem.quantity = quantity;
            saveToLocalStorage(cart);
            displayCartTotal();
            updateCartIcon(cart);
        }
    }
}

//sepetteki ürünleri ekrana renderler
export function renderCartItems() {
    //idsine göre HTML etiketini aldık
    const cartItemsElement = document.getElementById("cartItems");
    //sepetteki herbir ürün için ekrana bir tane cart-item bileşeni aktardık.
    cartItemsElement.innerHTML = cart
        .map(
            (item) => `
    <div class="cart-item">
    <img 
    src="${item.image}" alt=""
    
    />
    <div class="cart-item-info">
        <h2 class="cart-item-title">${item.title}</h2>
        <input type="number" 
        min="1" 
        value="${item.quantity}" 
        class="cart-item-quantity"
        data-id ="${item.id}" />

    </div>
    <h2>$${item.price}</h2>
    <button class="remove-from-cart" data-id= "${item.id}">Remove</button>
</div>

    
    
    
    
    `





        ).join("");

    //tüm  silme butonlarını aldık
    const removeButtons = document.getElementsByClassName("remove-from-cart");

    for (let i = 0; i < removeButtons.length; i++) {
        const removeButton = removeButtons[i];//index numarasına göre tüm silme butonlarını seçtik

        //herbir buton için bir olay izleyicisi ekle ve bir fonskiyon çalıstır.
        removeButton.addEventListener("click", removeFromCart)
    }
    const quantityInputs = document.getElementsByClassName("cart-item-quantity");

    for (let i = 1; i < quantityInputs.length; i++) {
        const quantityInput = quantityInputs[i];


        quantityInput.addEventListener("change", changeQuantity);
    }

    updateCartIcon(cart);

}

export function displayCartTotal() {
    const cartTotalElement = document.getElementById("cartTotal");
    const total = calculateCartTotal(cart);
    cartTotalElement.textContent = ` Total : $${total.toFixed(2)}`;

}
