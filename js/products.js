export async function fetchProducts(){
    try {
        //db.json dosyasına fetch ile istek attık 
        const response= await fetch("db.json");
        if(!response.ok){
            //hata oluşturduk
            throw new Error("Url hatalı")
        }
        //gelen cevabı json formatına çevirdik ve dışarıya return ettik
        return await (response.json());
        
        
    } catch (error) {
        console.error(error);
        return [];
        
    }
}

export function renderProducts(products,addToCartCallback){
    
    //*html dosyasından ürünlerin listeleneceği elementi seçer
    const productList= document.getElementById("product-list");
    
    //*ürünlerin Html formatında listeye eklenmesi için product dizisini dönüp her bit product için ekranaproduct cartını aktardık
    productList.innerHTML =products.map(
    (product)=> `
    <div class="product">
            <img src="${product.image}"  class="product-image" alt="" >
            <div class="product-info">
                <h2 class="product-title">${product.title}</h2>
                <p class="product-price">$${product.price}</p>
                <a class="add-to-cart" data-id="${product.id}">Add to Cart</a>
            </div>

        </div>
    
    
    
    `
).join("");


const addToCartButtons = document.getElementsByClassName("add-to-cart");

for(let i=0 ; i < addToCartButtons.length ; i++){
    const addToCartButton =addToCartButtons[i];
    addToCartButton.addEventListener("click",addToCartCallback);
}

    
    

    
}
   