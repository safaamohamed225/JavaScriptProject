// //fuction Get Total
// // add Proudect
// //save local storage
// //clear inpts
// //read
// //count
// //delete
// //update
// //search
// //clean data


// //اول حاجه هنادي علي كل الان بت اللي عندي من خلال ال id
let pname     =  document.getElementById('name');
let price    =  document.getElementById('price');
let taxes    =  document.getElementById('taxes');
let ads      =  document.getElementById('ads');
let discount =  document.getElementById('discount');
let total    =  document.getElementById('total');
let count    =  document.getElementById('count');
let category =  document.getElementById('category');
let submit   =  document.getElementById('submit');
let mood   = 'create';
let tm;

//get totale في 
    function getTotal()
  {
        if(price.value!='' )
       {
          let result= ( +price.value  +  +ads.value   +  +taxes.value)   -  +discount.value;
             total.innerHTML =  result      }
    }



//........................................//
//........................................//



   //create prouduct

    let datapro;
    if(localStorage.getItem('ourProduct') != null)
    {
    datapro=JSON.parse(localStorage.getItem('ourProduct'));
    showData();
    
    }
    else
    {
    datapro=[]; 
    }

submit.onclick= function ()
{
    var product =
            {
                name    :    pname.value.toLowerCase(),
                price   :    price.value,
                taxes   :    taxes.value,
                ads     :    ads.value,
                discount:    discount.value,
                total   :    total.innerHTML,
                count   :    count.value,
                category:    category.value.toLowerCase()
                
            }
            //validation
            if(pname.value!=''
             && price.value!=''
             && category.value!=''&&
              product.count <100)
             {
                if(mood==='create')
            {

                if(product.count>1){
                    for(let i = 0; i<product.count; i++)
                    {
                        datapro.push(product);
    
                    }
                }
                else{
                    datapro.push(product);
                }
            }
            else{
                datapro[tm] = product;
                mood = 'create';
                submit.innerHTML='create';
                count.style.display='block'
            }
            clearData();
            }
           
       
        localStorage.setItem('ourProduct', JSON.stringify(datapro));
        showData();
           
}


    //clear data 
    function clearData()
    {
        pname.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';

    }



   //read
   
function showData()
{
    getTotal()
    let table=``;
    for(var i= 0 ; i<datapro.length ; i++)
    {
        table+=`   <tr>
        <td>${i+1}</td>
        <td>${datapro[i].name}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
    </tr>
`
document.getElementById("tt").innerHTML=table;
        let btnDelet = document.getElementById('deleteAll');
        if(datapro.length>0)
        {
            btnDelet.innerHTML=
            `
            <button onclick="deleteAll()" >Delete All (${datapro.length})</button>
            `
        }
        else
        {
            btnDelet.innerHTML=' ';

        }
    }

}



    //delete


    function deletePro(i)
    {
       datapro.splice(i,1)
       localStorage.ourProduct=JSON.stringify(datapro);
       showData()
    }


    //deleteAll
    function deleteAll()
    {
        localStorage.clear();
        datapro.splice(0);
        showData();
    }


//update
function updateData(i){

    pname.value=datapro[i].name;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    getTotal();
    count.style.display= 'none';
    submit.innerHTML= 'update';
    mood  = 'update';
    tm = i;
    scroll({
        top:0,
        behavior: "smooth"
    })


}


//search
let searchMode = 'Name';
function getSearchMood(id)
{
    let search =document.getElementById('search')
    if(id==  'searchTitele')
    {
        searchMode='Name';
        
    }
    else{
        searchMode = 'category';
    
      }
      search.placeholder ='Search By' +searchMode;
    search.focus()
    search.value='';
    showData();
}

function searchData(value)
{
    let table='';
    for(let i = 0; i<datapro.length; i++){
    if (searchMode== 'Name')
    {
            if(datapro[i].name.includes(value.toLowerCase()))
            {
                table+=`   <tr>
                <td>${i}</td>
                <td>${datapro[i].name}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
            </tr>
        `
        document.getElementById("tt").innerHTML = table;
            }
        }
    
    else
    {
            if(datapro[i].category.includes(value.toLowerCase()))
            {
                table+=`   <tr>
                <td>${i}</td>
                <td>${datapro[i].name}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deletePro(${i})" id="delete">delete</button></td>
            </tr>
        `
        document.getElementById("tt").innerHTML = table;
            }
        }
        document.getElementById("tt").innerHTML = table;
    }
}



