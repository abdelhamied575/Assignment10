

$('.nav-bar').slideDown(2000,function(){
    $('section').slideDown(2000,function(){
        $('footer').slideDown(1000)
    })
});


let currentDay=document.getElementById('currentDay');
let currentDayNumber=document.getElementById('currentDayNumber');
let currentMonth=document.getElementById('currentMonth');
let currentCity=document.getElementById('currentCity');
let currentTemp=document.getElementById('currentTemp');
let currentState=document.getElementById('currentState');
let footerIcons=document.getElementById('footerIcons');
let imgTemp=document.getElementById('imgTemp');
let date=new Date();
const days=['Sunday','Monday','Tuesday','Wendnesday','Thursday','Friday','Saturday'];
const months=['January','February','March','Aprill','May','June','July','August','Setember','October','November','December']
let search=document.getElementById('search')
let searchKey='';
let nextDay=document.querySelectorAll('.nextDay')
let maxTemp=document.querySelectorAll('.maxTemp')
let lowTemp=document.querySelectorAll('.lowTemp')
let nextImg=document.querySelectorAll('.nextImg')

let dataOfWeather;

let dataOfNextTwoDays;

search.addEventListener('keyup',function(e){
    getWeather(e.target.value);
})

async function getWeather(searchKey){
    let response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=64c5bc4d9b97443f9aa155125241801&q=${searchKey}&days=3&aqi=no&alerts=no`)
    let finailResponse=await response.json()

    dataOfWeather=await finailResponse;
    dataOfNextTwoDays=dataOfWeather.forecast.forecastday
    console.log(dataOfNextTwoDays)
    // console.log(dataOfWeather)
}

function displayData(){
    currentCity.innerHTML=dataOfWeather.location.name
    currentTemp.innerHTML=`<span>${dataOfWeather.current.temp_c}<sup>o</sup>C</span>`
    imgTemp.src=`https:${dataOfWeather.current.condition.icon}`
    currentState.innerHTML=dataOfWeather.current.condition.text
    footerIcons.innerHTML=`
                            <div class="d-flex justify-content-around">
                            <h5><i class="fa-solid fa-umbrella fa-rotate-by" style="--fa-rotate-angle: 45deg;""></i>${dataOfWeather.current.humidity}</h5>
                            <h5><i class="fa-solid fa-wind"></i>${dataOfWeather.current.wind_kph} kp/h</h5>
                            <h5><i class="fa-regular fa-compass"></i>${dataOfWeather.current.wind_dir}</h5>
                            </div> `;
    currentDay.innerHTML=days[date.getDay()];
    currentMonth.innerHTML=months[date.getMonth()];
    currentDayNumber.innerHTML=date.getDate();
    forLoops();

}


function forLoops(){
    for(let i=0;i<nextDay.length;i++){

            let x=new Date(dataOfNextTwoDays[i+1].date)
            console.log(x)

            nextDay[i].innerHTML=days[x.getDay()]
        }


    for(let i=1;i<dataOfNextTwoDays.length;i++){
        nextImg[i-1].src=`https:${dataOfNextTwoDays[i].day.condition.icon}`
    }

    for(let i=1;i<dataOfNextTwoDays.length;i++){
        maxTemp[i-1].innerHTML=`<span>${dataOfNextTwoDays[i].day.maxtemp_c}<sup>o</sup>C</span>`
    }

    for(let i=1;i<dataOfNextTwoDays.length;i++){
        lowTemp[i-1].innerHTML=`<span>${dataOfNextTwoDays[i].day.mintemp_c}<sup>o</sup>C</span>`
    }
}


getWeather('cairo').then(displayData)




