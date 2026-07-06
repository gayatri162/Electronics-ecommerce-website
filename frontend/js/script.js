

const productContainer =
document.getElementById("product-container");

products.forEach(product => {

    productContainer.innerHTML += `

    <div class="card" data-category="${product.category}">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>₹${product.price}</p>
        
        <div class="rating">
        ⭐⭐⭐⭐☆
        <span>4.8</span>
        </div>

        <button class="add-cart"
            data-name="${product.name}"
            data-price="${product.price}">
            Add to Cart
        </button>

        <a href="html/product.html?id=${product.id}">
            <button class="details-btn">
                View Details
            </button>
        </a>

    </div>

    `;

});


let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const cartDisplay =
document.getElementById("cart-count");

const toast =
document.getElementById("toast");

function updateCartCount() {
    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cartDisplay.textContent = totalItems;
}

updateCartCount();

const cartButtons =
document.querySelectorAll(".add-cart");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product = {

            name: button.dataset.name,
            price: button.dataset.price

        };

        
    const existingProduct = cart.find(
    item => item.name === product.name
);

if(existingProduct){
    existingProduct.quantity += 1;
}
else{
    cart.push({
        ...product,
        quantity: 1
    });
}

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

      updateCartCount();

        toast.classList.add("show");
        setTimeout(() => {
        toast.classList.remove("show");
        }, 2000);

    });

});



const searchInput =
document.getElementById("search");

searchInput.addEventListener("keyup", () => {

    const searchValue =
    searchInput.value.toLowerCase();

    const cards =
    document.querySelectorAll(".card");

    cards.forEach(card => {

        const productName =
        card.querySelector("h3")
        .textContent
        .toLowerCase();

        if(productName.includes(searchValue)){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }
    });
        const visibleCards =
        [...cards].filter(card => card.style.display != "none");

        document.getElementById("no-results").style.display =
        visibleCards.length ? "none" : "block";
});


const filterButtons =
document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {
        
        filterButtons.forEach(btn=>{
          btn.classList.remove("active");
        });

     button.classList.add("active");

        const category =
        button.dataset.category;

        const cards =
        document.querySelectorAll(".card");

        cards.forEach(card => {

            if(
                category === "All" ||
                card.dataset.category === category
            ){
                card.style.display = "block";
            }
            else{
                card.style.display = "none";
            }

        });

    });

});