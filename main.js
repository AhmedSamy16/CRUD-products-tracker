
// Variables 
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchField = document.getElementById("search");
let mood = 'create';
let temp;
let searchMood = "title";


// Actions
document.querySelectorAll(".price input").forEach(input => {
    input.addEventListener("input", getTotal)
})

let productData;

if(localStorage.getItem("product") !== null) {
    productData = JSON.parse(localStorage.getItem("product"));
} else {
    productData = [];
}

submit.addEventListener("click", createItem)

// Functions
function getTotal() {
    if(price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value;
        total.textContent = result;
        total.style.backgroundColor = "#040";
    } else {
        total.textContent = "";
        total.style.backgroundColor = "#b30329";
    }
}

function createItem() {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        count: count.value,
        category: category.value
    }
    
    if(title.value != "" && price.value != "" && category.value != "" && newProduct.count <= 100) {
        if(mood == "create") {
            if(newProduct.count > 1) {
                for(let i = 0; i < newProduct.count; i++) {
                    productData.push(newProduct);
                }
            } else {
                productData.push(newProduct);
            }
        } else {
            productData[temp] = newProduct;
            count.style.display = "block";
            mood = "create";
            submit.innerHTML = "Create";
        }
        clearData();
    }

    localStorage.setItem("product", JSON.stringify(productData));
    showData();
}

function clearData() {
    title.value = "";
    price.value = "";
    ads.value = "";
    taxes.value = "";
    discount.value = "";
    count.value = "";
    category.value = "";
    total.textContent = "";
}

function showData() {
    getTotal();
    let table = '';
    for(let i = 0; i < productData.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button id="update" onclick="updateItem(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tbody").innerHTML = table;

    let deleteAllDiv = document.getElementById("deleteAll");

    if(productData.length) {
        deleteAllDiv.innerHTML = `<button onclick="deleteAll()">Delete All (${productData.length})</button>`;
    } else {
        deleteAllDiv.innerHTML = '';
    }
}
showData();

function deleteItem(i) {
    productData.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(productData));
    showData();
}

function deleteAll() {
    localStorage.clear();
    productData.splice(0);
    showData();
}

function updateItem(i) {
    title.value = productData[i].title;
    price.value = productData[i].price;
    taxes.value = productData[i].taxes;
    ads.value = productData[i].ads;
    category.value = productData[i].category;
    getTotal();
    count.style.display = "none";
    submit.innerHTML = "Update";
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

function getSearchMood(id) {
    if(id == "btnTitle") {
        searchMood = "title";
        searchField.placeholder = "Search By Title";
    } else {
        searchMood = "category";
        searchField.placeholder = "Search By Category";
    }
    searchField.focus();
    searchField.value = "";
    showData();
}

function searchItem(value) {
    let table = "";
    for(let i = 0; i < productData.length; i++) {
        if(searchMood == "title") {
            if(productData[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].taxes}</td>
                    <td>${productData[i].ads}</td>
                    <td>${productData[i].discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td><button id="update" onclick="updateItem(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
                </tr>
                `
            }
        } else {
            if(productData[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].taxes}</td>
                    <td>${productData[i].ads}</td>
                    <td>${productData[i].discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                    <td><button id="update" onclick="updateItem(${i})">Update</button></td>
                    <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}