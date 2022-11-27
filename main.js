"use strict"  
const BaseUrl = "https://restcountries.com/v2/all"
const Url = 'https://restcountries.com/v2/'
//ALL COUNTRYES///

const  getCountry = async()=>{
    const countryes =await fetch(`${BaseUrl}`)
    const result = await countryes.json()
    dataRender(result)
    dinamicCatagory(result)
}

getCountry()

//ALL COUNTRYES///


function dataRender (data=[]){
    // console.log(data);
    data.forEach((el)=>{
        // console.log(el);
        const card = document.createElement("div")
        card.classList.add("shadow")
        card.innerHTML=`
        <div class="card shadow">
        <img src="${el.flag}" alt="flag" class="card-top-img ">
        <div class="card-body p-5 w-100 ">
        <h3 class="card-title">
        <b>  ${el.name}</b>
        </h3>
        <ul class="card-list justify-content-between">
        <li class="card-list-item list-unstyled"><strong class='str'>population: ${el.population}</strong></li>
        <li class="card-list-item list-unstyled"><strong class='str'>region: ${el.region}</strong></li>
        <li class="card-list-item list-unstyled"><strong class='str'>capital:  ${el.capital}</strong></li>
        <li class="card-list-item list-unstyled"><strong class='str'>independent: true</strong></li>
        </ul>
        <button class="btn btn-primary" type="button" data-set="${el.area}">Read more</button>
        </div>
        </div>
        `
        card.dataset.id=el.name
        
        $(".wrapper").appendChild(card)
    })
}

//render all data 

function dinamicCatagory (data){
    
    const catagory =[]
    
    data.forEach((e)=>{
        if(!catagory.includes(e.region)){
            catagory.push(e.region)
        }
    })
    
    catagory.sort()
    catagory.unshift("All")
    catagory.forEach(el=>{
        const option = document.createElement("option")
        option.classList.add("p-2","text-primary")
        option.textContent =el
        $("#region").appendChild(option)
    })
}


//end//



$("#search").addEventListener("keypress",(e)=>{
    $(".wrapper").innerHTML ='<div class="lds-heart"><div></div></div>'
    setTimeout(()=>{
        if(e.target.value.trim().length!==0 && e.keyCode===13){ 
            findCountry(e.target.value)
        }
    },500)
})

// search function//


async function findCountry(country) {
    $(".wrapper").innerHTML = "";
    const response = await fetch(`${Url}/name/${country}`);
    const data = await response.json();
    if (response.status === 404) {
        $(".info").innerHTML =
        "<h1 class='text-center text-else'>BUNDAY DAVLAT YO'Q</h1>";
    } else {
        $(
            ".info"
            ).innerHTML = `<h1 class='text-center text-else w-100'>Qidiruv natijasi: ${data.length}</h1>`;
            dataRender(data);
        }
    }
    
    
    
    
    
    $("#region").addEventListener("change",(e)=>{
        sortcountry(e.target.value.toLowerCase())    
    })
    
    async function sortcountry(region){
        $(".wrapper").innerHTML=""
        if(region==="all"){
            const restponse = await fetch(`${BaseUrl}`)
            const countr = await restponse.json();
            console.log(countr);
            if(restponse.status ===404){
                $(".info").innerHTML=`<h1 class='text-center'>Not found/h1>`
            } else{
                dataRender(countr)
                $(".info").innerHTML = `<h3 class='text-center'>${countr.length} davlat topildi</h3>`
            }
        } else{
            const restponse = await fetch(`${Url}/region/${region}`)
            const countr = await restponse.json()
            if(restponse.status ===404){
                $(".info").innerHTML=`<h1 class='text-center'>Not found/h1>`
            } else{
                dataRender(countr)
                $(".info").innerHTML = `<h3 class='text-center'>${countr.length} davlat topildi</h3>`
            }
        }
    }
    
    /// end/
    
    $(".wrapper").addEventListener("click",(e)=>{
        $(".country-info").innerHTML =""
        if(e.target.classList.contains("btn-primary")){
            let id = e.target.getAttribute("data-set");        
            $(".sidebar").classList.remove("swipe");
            $(".sidebar").classList.add("pos");
            $("body").style.overflow= "hidden";
            getcount(id)
        }
    })
    
    
    
    async function getcount(country){
        const response=await fetch(`${BaseUrl}`)
        const result = await response.json();
        console.log(result);
        const data = result.filter(item => {
            return item.area == country;
        });
        
        data.forEach(item => {
            console.log(item)
            const creat = createElement("div","row w-100",`
            <div class="col-md-4 ps-5  easy">
            <img class="lef " src="${item.flags.svg}" alt="">
            <div class="col-md-2 w-50 ps-5 ul-list ">
            <ul class="list-group w-100   ">
            <li class="list-group-item w-100"><strong>Country: ${item.name}</strong></li>
            <li class="list-group-item w-100"><strong>Population:${item.population}</strong></li>
            <li class="list-group-item w-100"> <strong>Region:   ${item.region}</strong></li>
            <li class="list-group-item w-100"> <strong>Region:   ${item.subregion}</strong></li>
            <li class="list-group-item w-100"><strong>Capital: ${item.capital}</strong></li>
            <li class="list-group-item w-100"><strong>: demonym ${item.demonym}</strong></li>
            <li class="list-group-item w-100"><strong>language: ${item.independent}</strong></li>
            
            
            
            </ul>
            </div>
            </div>
            `);
            $(".country-info").appendChild(creat);
        });
        
    }
    
    $(".close").addEventListener("click", (e)=>{
        $(".country-info").innerHTML = ""
        $(".sidebar").classList.add("swipe")
        $(".sidebar").classList.add("pos")
        $("body").style.overflow= "visible";
    })
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    