
let responseArray = []


let fetchAllBtn = document.getElementById("fetchAllBtn")
let fetchUnder100Btn = document.getElementById("fetchUnder100Btn")
let clickCat = document.getElementById("clickCat")
let byRating = document.getElementById("byRating")

fetchAllBtn.addEventListener('click', () => fetchData('all'))
fetchUnder100Btn.addEventListener('click', () => fetchData('under100'))
clickCat.addEventListener('click', () => fetchData('categories'))
byRating.addEventListener('click', () => fetchData('rateing'))

function fetchData(filterType) {
    let x = new XMLHttpRequest()
    x.onload = function() {
        if(x.readyState == 4 && x.status == 200){
            responseArray = JSON.parse(x.response)
            let filteredData = applyFilter(filterType);
            displayResults(filteredData)
        } else {
            console.error(`Something went wrong. | Status : ${x.status} | Responce : ${x.response}`)
        }
    }
    
    x.open('GET', 'https://fakestoreapi.com/products')
    x.send()
}


function applyFilter(filterType) {

    let categories = document.getElementById("categories").value.trim().toLowerCase()
    let rateIngA = Math.round(document.getElementById("above").value.trim())
    let rateIngB = Math.round(document.getElementById("below").value.trim())
    switch (filterType) {
        case 'rateing' :
            return responseArray.filter(item => item.rating.rate > rateIngA && item.rating.rate < rateIngB  )
        case 'categories' :
            return responseArray.filter(item => item.category == categories)
        case 'under100':
            return responseArray.filter(item => item.price < 100);
        case 'all':
        default:
            return responseArray; // No filtering, show all
    }
}

function displayResults(filteredData) {

    let main = document.querySelector(".insideMain")
    main.innerHTML = ""

    for(var a of filteredData){

        let d = document.createElement("div")
        d.classList.add("borderBox")
        d.innerHTML = `
                        <h2>${a.title}</h2>
                        <span class="categories">${a.category}</span>
                        <p>${a.description}</p>
                        <img loading="lazy" src="${a.image}" alt="${a.thumbnail}">
                        <span>${a.rating.rate}</span>
                        <div class="priceBuy">
                        <h4>$ ${a.price}</h4>
                        <button>Buy Now</button>
                        </div>
        `
        main.append(d)
    }

}











