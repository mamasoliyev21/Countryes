"use strict"  
const URl = "https://restcountries.com/v2/"
//ALL COUNTRYES///
const  getCountry  =async()=>{
    const countryes =await fetch(`${URl}/all`)
    const result = await countryes.json()
    dataRender(result)
    dinamicCatagory(result)
}

getCountry()

//ALL COUNTRYES///


function dataRender (data=[]){
    data.forEach((el)=>{
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
        <li class="card-list-item list-unstyled"><strong class='str'>independent:  ${el.independent}</strong></li>
        </ul>
        </div>
        </div>
        `
        
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



$("#search").addEventListener("keyup",(e)=>{
    $(".wrapper").innerHTML =""
    $(".info").innerHTML=`<div class="spinner">  
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    </div>`
    setTimeout(()=>{
        if(e.target.value.trim().length!==0 && e.keyCode===13){ 
            Findcountry(e.target.value)
        }
    },500)
})

// search function//

async function Findcountry(country){
    $(".wrapper").innerHTML=""
    const restponse = await fetch(`${URl}/name/${country}`)
    const countr = await restponse.json()
    if(restponse.status ===404){
        $(".info").innerHTML=`<h1 class='text-center'>Bunday davlat yoq</h1>`
    } else{
        dataRender(countr)
        $(".info").innerHTML = `<h3 class='text-center'>${countr.length} davlat topildi</h3>`
    }
}
//end search//

$("#region").addEventListener("change",(e)=>{
        sortcountry(e.target.value.toLowerCase())    
})

async function sortcountry(region){
    $(".wrapper").innerHTML=""
    if(region==="all"){
        const restponse = await fetch(`${URl}/all`)
        const countr = await restponse.json()
        if(restponse.status ===404){
            $(".info").innerHTML=`<h1 class='text-center'>Not found/h1>`
        } else{
            dataRender(countr)
            $(".info").innerHTML = `<h3 class='text-center'>${countr.length} davlat topildi</h3>`
        }
    } else{
        const restponse = await fetch(`${URl}/region/${region}`)
        const countr = await restponse.json()
        if(restponse.status ===404){
            $(".info").innerHTML=`<h1 class='text-center'>Not found/h1>`
        } else{
            dataRender(countr)
            $(".info").innerHTML = `<h3 class='text-center'>${countr.length} davlat topildi</h3>`
        }
    }
}
