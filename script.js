let cart = [];


const menu = {

    "Spice Garden":[

        ["Chicken Biryani",180,
        "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg"],

        ["Paneer Biryani",160,
        "https://images.unsplash.com/photo-1596797038530-2c107229654b"],

        ["Butter Chicken",220,
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"],

        ["Paneer Tikka",150,
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"]

    ],


    "Pizza Hub":[

        ["Margherita Pizza",180,
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002"],

        ["Cheese Pizza",220,
        "https://images.unsplash.com/photo-1579751626657-72bc17010498"],

        ["Farmhouse Pizza",250,
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"],

        ["Chicken Pizza",280,
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828"]

    ],


    "Burger House":[

        ["Classic Burger",120,
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"],

        ["Cheese Burger",150,
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add"],

        ["Chicken Burger",180,
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5"],

        ["French Fries",90,
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877"]

    ],


    "South Spice":[

        ["Masala Dosa",80,
        "https://images.unsplash.com/photo-1567337710282-00832b415979"],

        ["Idli Sambar",70,
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc"],

        ["Poori Masala",90,
        "https://images.unsplash.com/photo-1601050690597-df0568f70950"],

        ["Vada",50,
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7"]

    ]

};


/* PAGE */

function showPage(id){

    document.querySelectorAll(".page").forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    window.scrollTo(0,0);
}


/* RESTAURANT */

function openRestaurant(name){

    showPage("restaurants");

    document.getElementById("restaurantTitle").innerText = name;

    let output = "";


    menu[name].forEach(item=>{

        output += `

        <div class="foodCard">

            <img src="${item[2]}">

            <h3>${item[0]}</h3>

            <div class="foodBottom">

                <span class="foodPrice">
                    ₹${item[1]}
                </span>

                <button
                    class="addBtn"
                    onclick="addToCart('${name}',
                    '${item[0]}',
                    ${item[1]},
                    '${item[2]}')">

                    + Add

                </button>

            </div>

        </div>

        `;

    });


    document.getElementById("foodList").innerHTML = output;
}


/* ADD */

function addToCart(restaurant,name,price,image){

    let item = cart.find(x =>
        x.restaurant === restaurant &&
        x.name === name
    );


    if(item){

        item.quantity++;

    }
    else{

        cart.push({

            restaurant:restaurant,
            name:name,
            price:price,
            image:image,
            quantity:1

        });

    }


    updateCart();

    showToast(name + " added to cart");
}


/* CART */

function updateCart(){

    let container =
        document.getElementById("cartItems");

    let total = 0;


    if(cart.length === 0){

        container.innerHTML = `

        <div class="empty">

            <div class="emptyIcon">🛍️</div>

            <h3>Your cart is empty</h3>

            <p>
                Choose something delicious
                to get started.
            </p>

        </div>

        `;

        document.getElementById("total").innerText =
            "₹0";

        return;
    }


    let output = "";


    cart.forEach((item,index)=>{

        total +=
            item.price * item.quantity;


        output += `

        <div class="cartItem">

            <img src="${item.image}">


            <div class="cartInfo">

                <h4>${item.name}</h4>

                <div class="restaurantName">
                    ${item.restaurant}
                </div>

                <div class="itemPrice">
                    ₹${item.price * item.quantity}
                </div>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${index},-1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index},1)">
                        +
                    </button>

                    <button
                        class="remove"
                        onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

            </div>

        </div>

        `;

    });


    container.innerHTML = output;


    document.getElementById("total").innerText =
        "₹" + total;
}


/* QUANTITY */

function changeQuantity(index,value){

    cart[index].quantity += value;


    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }


    updateCart();
}


/* REMOVE */

function removeItem(index){

    cart.splice(index,1);

    updateCart();
}


/* TOAST */

function showToast(message){

    let toast =
        document.getElementById("toast");

    toast.innerText =
        "✓  " + message;

    toast.classList.add("show");


    setTimeout(()=>{

        toast.classList.remove("show");

    },1800);
}


/* CHECKOUT */

function goCheckout(){

    if(cart.length === 0){

        showToast("Your cart is empty");

        return;
    }

    showPage("checkout");
}


/* ORDER */

function placeOrder(){

    let phone =
        document.getElementById("phone")
        .value.trim();

    let address =
        document.getElementById("address")
        .value.trim();


    if(phone === "" || address === ""){

        showToast(
            "Please enter delivery details"
        );

        return;
    }


    cart = [];

    updateCart();


    document.getElementById("phone").value = "";

    document.getElementById("address").value = "";


    showPage("success");
}


/* INITIAL CART */

updateCart();
