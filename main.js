// inputs
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const create = document.getElementById("create");
// outputs
const searchInput  = document.getElementById("search");
const deleteAll = document.getElementById("delete-all")
const tbody = document.getElementById("tbody");
// modes
let tmp;
let mode = "create";
// get total
function getTotal() {
  if (price.value != "") { 
    total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.style.backgroundColor = `rgb(38, 150, 131)`;
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = `rgb(114, 9, 9)`;
  }
}
// create products
let dataPro = [];
if(localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
create.onclick = () => {
  // clean data ( inputs not empty and valid )
  if(title.value != '' && price.value != '' && count.value <= 1000) {
  const newPro = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // create count btn / create multiple products
  if(mode === "create") {
    if(newPro.count > 1) {
      for(let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    } else {
      dataPro.push(newPro);
    }
  } else {
    dataPro[tmp] = newPro;
    mode = "create";
    create.innerHTML = "Create";
    create.style.backgroundColor = "rgb(38, 150, 131)";
    count.style.display = "block";
  }
  
  // save the data in local storage
  localStorage.setItem('product',JSON.stringify(dataPro));
  clearData();
  displayData();
}
};
// clear inputs / fields
function clearData() {
  title.value = price.value = taxes.value = ads.value = discount.value = total.innerHTML = count.value = category.value = '';
  total.style.backgroundColor = `rgb(114, 9, 9)`;
}
// display
function displayData() {
  let table = ``;
  for(let i = 0; i < dataPro.length; i++) {
    table +=
    `
    <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateData(${i})" id="update">Update</button></td>
      <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  if(dataPro.length > 1) {
    deleteAll.innerHTML = 
    `
    <button onclick="deleteAllData()" id="delete">Delete All (${dataPro.length})</button>
    `;
  } else {
    deleteAll.innerHTML = '';
  }
}
displayData();
// delete
function deleteData(i) {
  console.log(dataPro.splice(i,1));
  localStorage.product = JSON.stringify(dataPro);
  displayData();
}
function deleteAllData() {
  let check = prompt(`are you sure you want to delete all the products ?
Enter (yes) In The Field To Delete All The Products`);
  if(check.toLowerCase() == "yes") {
    dataPro = [];
    localStorage.clear();
    displayData();
  }
}
// update
function updateData(i) {
  tmp = i;
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  create.innerHTML = "Update"
  create.style.backgroundColor = "rgb(44 125 168)";
  mode = "update";
  scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}
// search
let searchMode = 'title';
function getSearchMode(id) {
  if(id === 'searchTitle') {
    searchMode = 'title';
    searchInput.placeholder = "Search By Title";
  } else {
    searchMode = 'category';
    searchInput.placeholder = "Search By Category";
  }
  searchInput.focus();
  searchInput.value = '';
  displayData();
}
function searchData(value) {
  let table = '';
  if(searchMode === "title") {
    for(let i = 0; i < dataPro.length; i++) {
      if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table +=
          `
          <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
          `;
      }
    }
  } else {
    for(let i = 0; i < dataPro.length; i++) {
      if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        table +=
          `
          <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
          </tr>
          `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
