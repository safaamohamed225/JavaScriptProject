function GetObject(title, brand, price, id, img) {
  var imageData = document.querySelector("." + img)?.src;
  var IdData = +document.querySelector("." + id)?.textContent;
  var PriceData = document.querySelector("." + price)?.textContent;
  var titleData = document.querySelector("." + title)?.textContent;
  var brandData = document.querySelector("." + brand)?.textContent;
  var Products = [];

  if (localStorage.getItem("Products") != null) {
    var OldProducts = JSON.parse(localStorage.getItem("Products"));

    for (var i = 0; i < OldProducts.length; i++) {
      Products.push(OldProducts[i]);
    }
  }

  var FindProduct = Products.find((product) => product.IdData === IdData);

  if (FindProduct == null) {
    var productToAdd = {
      titleData,
      brandData,
      PriceData,
      IdData,
      imageData,
      count: 1,
    };

    Products.push(productToAdd);
  } else {
    FindProduct.count += 1;
  }

  localStorage.setItem("Products", JSON.stringify(Products));
}

function FetchData() {
  var ContainerToShowProducts = document.getElementById("Container");
  if (JSON.parse(localStorage.getItem("Products")) == null) {
    return;
  }

  var Products = JSON.parse(localStorage.getItem("Products"));
  var productCountMap = {}; // Map to track the count of each product

  for (let i = 0; i < Products.length; i++) {
    // Check if the product is already in the map
    if (productCountMap[Products[i].IdData] === undefined) {
      productCountMap[Products[i].IdData] = 1; // If not, initialize the count to 1
    } else {
      // If the product is already in the map, increment the count and skip rendering
      productCountMap[Products[i].IdData]++;
      continue;
    }

    var ProductImage = document.createElement("img");
    var ProductTitle = document.createElement("h1");
    var ProductPrice = document.createElement("h1");
    var ProductCount = document.createElement("h1");
    var DeleteBtn = document.createElement("h1");
    var IconDelete = document.createElement("i");
    var Section = document.createElement("section");
    Section.style.cssText = `display: flex;
           justify-content: space-around;
           align-items: center;`;
    ProductImage.style.width = "150px";
    ProductImage.style.height = "150px";
    ProductImage.src = Products[i].imageData;
    ProductImage.style.borderRadius = "20px";
    ProductTitle.textContent = Products[i].titleData.split("-")[0];
    ProductPrice.textContent = `(${Products[i].PriceData.split("|")[0]})`;
    ProductCount.textContent = `(${Products[i].count})`;
    IconDelete.className = "fa-solid fa-trash";
    IconDelete.style.color = "orangered";
    DeleteBtn.style.cssText = `font-size: 50px;
                width: 50px;
                text-align: center;
                border-radius: 10px;
                cursor: pointer;`;
    DeleteBtn.setAttribute("id", Products[i].IdData);
    IconDelete.setAttribute("idData", Products[i].IdData);
    DeleteBtn.className = "DeleteBtn";

    DeleteBtn.appendChild(IconDelete);
    Section.append(ProductImage);
    Section.append(ProductTitle);
    Section.append(ProductCount);
    Section.append(ProductPrice);
    Section.append(DeleteBtn);
    console.log(ProductPrice);
    var totalCount = Products.reduce((sum, product) => sum + product.count, 0);
    var totalCost = Products.reduce(
      (sum, product) =>
        sum +
        +product.count *
          +product.PriceData.split("|")[0].replace(/[^\d.]/g, ""),
      0
    ).toFixed(0);
    document.getElementById("piceCount").textContent = totalCount;
    document.getElementById("totalprice").textContent = totalCost;

    ContainerToShowProducts?.prepend(Section);
    console.log(Products);
  }
}

FetchData();

var DeleteBtns = document.querySelectorAll("i").forEach((D) => {
  D.addEventListener("click", function () {
    var Products = [];

    if (localStorage.getItem("Products") != null) {
      var OldProducts = JSON.parse(localStorage.getItem("Products"));

      for (var i = 0; i < OldProducts.length; i++) {
        Products.push(OldProducts[i]);
      }
    }
    var ProductToDelete = Products.find(
      (product) => product.IdData == D.getAttribute("iddata")
    );

    if (ProductToDelete == null) {
      console.log("Product not found");
      return;
    }
    var currentdiv = D.parentElement.parentElement;

    if (ProductToDelete.count == 1) {
      var indexToRemove = Products.indexOf(ProductToDelete);
      Products.splice(indexToRemove, 1);

      localStorage.setItem("Products", JSON.stringify(Products));

      currentdiv.remove();
      location.reload();
    } else {
      ProductToDelete.count--;
      localStorage.setItem("Products", JSON.stringify(Products));
      location.reload();
    }
  });
});
