//___________________________________________ check logged in _________________________________________________________________
document.addEventListener('DOMContentLoaded', ()=>{
    const userStr = localStorage.getItem('currentUser');

    if(userStr){
        //logged in
        const user = JSON.parse(userStr);
        console.log('user data',user);
        document.getElementsByClassName("nav-el")[5].textContent='Sign out';
        document.getElementsByClassName("nav-el")[5].href='login.html';
        document.getElementById("message").innerText=`Welcome, ${user.fname}`;
        document.getElementsByClassName("nav-el")[5].addEventListener('click',()=>{
            localStorage.removeItem('currentUser');
        })
    }
    else{
        //guest
        document.getElementsByClassName("nav-el")[5].textContent='Log in';
        document.getElementsByClassName("nav-el")[5].href='login.html';
        document.getElementById("message").innerText=`Welcome to The Weather Network`;
    }
})





//___________________________________________ scroll into view _________________________________________________________________
function scrollHome(){
    document.getElementById("hero").scrollIntoView({
        behavior:"smooth",
        block:"start" 
    });
}
function scrollSearch(){
    document.getElementById("search").scrollIntoView({
        behavior:"smooth",
        block:"center" 
    });
}
function scrollWeather(){
    document.getElementById("weather").scrollIntoView({
        behavior:"smooth",
        block:"start" 
    });
}
function scrollAbout(){
    document.getElementById("about").scrollIntoView({
        behavior:"smooth",
        block:"start" 
    });
}
function scrollContact(){
    document.getElementById("footer").scrollIntoView({
        behavior:"smooth",
        block:"start" 
    });
}

//___________________________________________HERO HEADLINE_________________________________________________________________
let headline = document.getElementById("changeHeadline");
const textLoad = () =>{
    setTimeout(()=>{
        headline.textContent="day.";
    },0)
    setTimeout(()=>{
        headline.textContent="moment.";
    },2000)
    setTimeout(()=>{
        headline.textContent="season.";
    },4000)
    setTimeout(()=>{
        headline.textContent="storm.";
    },6000)
}
textLoad();
setInterval(textLoad,8000);

//___________________________________________ REFRESH _________________________________________________________________
const refreshEl = document.getElementById("refresh");
refreshEl.addEventListener('click', () => {
            setTimeout((()=>{refreshEl.classList.toggle('clicked');}) ,1000);
            refreshEl.classList.toggle('clicked');
        });

//___________________________________________ UP BUTTON _________________________________________________________________
const upBtn = document.getElementById("upBtn");
if (upBtn) {
    upBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

//___________________________________________ HERO DATE _________________________________________________________________

const dateData = new Date();
let year = dateData.getFullYear();
let month = dateData.getMonth();
let date = dateData.getDate();
let day = dateData.getDay();
getday= (day)=>{
    switch(day){
        case 0: day='Monday';break;
        case 1: day='Tuesday';break;
        case 2: day='Wednesday';break;
        case 3: day='Thursday';break;
        case 4: day='Friday';break;
        case 5: day='Saturday';break;
    }
    return day;
}
getmonth=(month)=>{
    switch(month){
        case 0: month='January';break;
        case 1: month='February';break;
        case 2: month='March';break;
        case 3: month='April';break;
        case 4: month='May';break;
        case 5: month='June';break;
        case 6: month='July';break;
        case 7: month='August';break;
        case 8: month='September';break;
        case 9: month='October';break;
        case 10: month='November';break;
        case 11: month='December';break;
    }
    return month;
}
getdate=(date)=>{
    switch(Math.floor(date/10)){
        case 0:
        case 2:
        case 3:
            switch(date%10){
                case 1: date=date+'st';break;
                case 2: date=date+'nd';break;
                case 3: date=date+'rd';break;
                default: date=date+'th';break;
            }
            break;
        case 1:
            date=date+'th';
    }
    return date;
}
const dateText = document.getElementById("date");
dateText.textContent= `It's ${getday(day)}, ${getmonth(month)} ${getdate(date)}.`;






//___________________________________________API_________________________________________________________________

const baseURL = 'https://api.weatherapi.com/v1'
const key = '2cab48709326470f96651918250812'
const days = 14




async function getForecast() {
try {
    const res = await fetch(`${baseURL}/forecast.json?key=${key}&q=${city}&days=${days}&aqi=yes&alert=no`);
    const data = await res.json();
    console.log('forecast data loaded',data);

    const cityNameEl=document.getElementById("city");
    const regionNameEl=document.getElementById("region");
    const countryNameEl=document.getElementById("country");
    const dateEl =document.getElementById("today");
    const currTempEl =document.getElementById("currTemp");
    const currConditionEl =document.getElementById("currCondition");
    const currFeelsEl =document.getElementById("currFeels");
    const currHighlowEl =document.getElementById("currHighlow");
    const currImage =document.getElementById("currImage");
    const currentValList = document.getElementsByClassName("currentListElValue");




    cityNameEl.textContent=data.location.name;
    regionNameEl.textContent=data.location.region;
    countryNameEl.textContent=data.location.country;
    // dateEl.textContent= `${getdate(data.location.localtime.slice(8,10))} ${getmonth(data.location.localtime.slice(5,7)-1)}, ${data.location.localtime.slice(0,4)}`;
    dateEl.innerHTML= `${getdate(data.location.localtime.slice(8,10))} ${getmonth(data.location.localtime.slice(5,7)-1)}, ${data.location.localtime.slice(0,4)}<br>Local Time : ${data.location.localtime.slice(11,16)}`;
    currTempEl.innerHTML= (celcius==true)? data.current.temp_c+"<sup>°C</sup>":data.current.temp_f+"<sup>°F</sup>";
    currConditionEl.textContent=data.current.condition.text;
    currFeelsEl.textContent="Feels "+  ((celcius==true)? (data.current.feelslike_c) : (data.current.feelslike_f))  +'°';
    currHighlowEl.textContent="H:"+((celcius==true)? (data.forecast.forecastday[0].day.maxtemp_c) : (data.forecast.forecastday[0].day.maxtemp_f)) + "°,  L:"+((celcius==true)? (data.forecast.forecastday[0].day.mintemp_c) : (data.forecast.forecastday[0].day.mintemp_f)) +'°' ;
    currImage.src='https:'+data.current.condition.icon;

    currentValList[0].textContent=data.current.humidity + '%';
    currentValList[1].textContent=data.current.air_quality.pm2_5 + ' pm2.5';
    currentValList[2].textContent=data.current.wind_kph + ' km/h';
    currentValList[3].textContent=data.current.pressure_in + ' inHg';
    currentValList[4].textContent=data.current.vis_km+ ' km';



    if(data.current.is_day===1){
        document.getElementById("weather").classList.remove("dark");
    }
    else{document.getElementById("weather").classList.add("dark");
    }

    
    
    




    const array=data.forecast.forecastday[0].hour;
    const hourlyList = document.getElementById("hourlyList");
    hourlyList.innerHTML = '';
    for(let i=0;i<12;i++){
        let hourlyEl = document.createElement("li");
        hourlyEl.classList.add("hourlyListEl");

        hourlyEl.innerHTML = ((i==0)? `<h6 class="hourlyTime">12 AM</h6>`:`<h6 class="hourlyTime">${i} AM</h6>`)+
                    `<img class="hourlyImg" src="https:${array[i].condition.icon}" alt="Weather_img">
                    <p class="hourlyTemp">${ (celcius==true)? array[i].temp_c : array[i].temp_f}°</p>
                    <p><i class="fa-solid fa-cloud-rain"></i> <span class="hourlyRain">${array[i].chance_of_rain}%</span></p>`;
        hourlyList.appendChild(hourlyEl);
    }
    for(let i=12;i<24;i++){
        let hourlyEl = document.createElement("li");
        hourlyEl.classList.add("hourlyListEl");

        hourlyEl.innerHTML = ((i==12)? `<h6 class="hourlyTime">12 PM</h6>`:`<h6 class="hourlyTime">${i-12} PM</h6>`)+
                    `<img class="hourlyImg" src="https:${array[i].condition.icon}" alt="Weather_img">
                    <p class="hourlyTemp">${ (celcius==true)? array[i].temp_c : array[i].temp_f}°</p>
                    <p><i class="fa-solid fa-cloud-rain"></i> <span class="hourlyRain">${array[i].chance_of_rain}%</span></p>`;
        hourlyList.appendChild(hourlyEl);
    }




    
    const Array=data.forecast.forecastday;
    const forecastList = document.getElementById("forecastList");
    forecastList.innerHTML = '';
    for(let i=0;i<14;i++){
        let fDate=getdate(Array[i].date.slice(8));
        let fmonth=getmonth(Array[i].date.slice(5,7)-1);
        let forecastEl = document.createElement("li");
        forecastEl.classList.add("forecastListEl");
        forecastEl.innerHTML =`<p class="forecastHigh">${ (celcius==true)? Array[i].day.maxtemp_c : Array[i].day.maxtemp_f}°</p>
                    <i class="fa-solid fa-arrow-up-wide-short"></i>
                    <p class="forecastLow">${ (celcius==true)? Array[i].day.mintemp_c : Array[i].day.mintemp_f}°</p>
                    <img src="https:${Array[i].day.condition.icon}" alt="weather_img" class="forecastImg">
                    <p class="forecastText">${Array[i].day.condition.text}</p>
                    <p class="forecastDate">${  fDate[0]=='0'? fDate.slice(1) : fDate} ${fmonth}</p>`;
        forecastList.appendChild(forecastEl);
    }

} catch (err) {
    console.error(err);
}
}








//___________________________________________ CELCIUS-FARHENIET _________________________________________________________________
const celFer = document.getElementById("celFer");
let celcius =true;
celFer.addEventListener('click',() =>{
    celcius=!celcius;
    getForecast();
    if(celcius==true){celFer.textContent="Change to °F?";}
    else{celFer.textContent="Change to °C?";}
})




//___________________________________________Weather_________________________________________________________________

//Initially
let city='Kharagpur';
window.addEventListener('load', () => {
    getForecast();
});


//___________________________________________ FAVOURITES _________________________________________________________________
const trending = ['Kharagpur','New Delhi','Kolkata'];
const userStr = localStorage.getItem('currentUser');
const favBtn = document.getElementById("favBtn");
const favRemoveBtn = document.getElementById("favRemoveBtn");

document.getElementById('favList').innerHTML='<i class="fa-solid fa-heart" style="color: red;"></i>Cities:';
if(userStr){
    //loggedin
    const user=JSON.parse(userStr);
    for(let favCity of user.prefrences){
        let favCityEl=document.createElement('li');
        favCityEl.textContent=favCity;
        document.getElementById('favList').appendChild(favCityEl);
        favCityEl.addEventListener('click',()=>{
            city=favCityEl.textContent;
            getForecast();
            scrollWeather();
        })
    }



    favBtn.addEventListener('click',()=>{
        if(user.prefrences.includes(city)){
            alert( city+" is already saved.");
        }
        else{
            user.prefrences.push(city);
            localStorage.setItem("currentUser", JSON.stringify(user));
            let favCityEl=document.createElement('li');
            favCityEl.textContent=city;
            document.getElementById('favList').appendChild(favCityEl);
            favCityEl.addEventListener('click',()=>{
                city=favCityEl.textContent;
                getForecast();
                scrollWeather();
            })
        }
    })



    favRemoveBtn.addEventListener('click',()=>{
        if(user.prefrences.includes(city)){
            user.prefrences.splice(user.prefrences.indexOf(city),1);
            localStorage.setItem("currentUser", JSON.stringify(user));
            const li = [...document.querySelectorAll('#favList li')].find(el => el.textContent === city);
            if(li){ li.remove();}
        }
        else{
            alert( city+" is already not saved.");
        }
    })
    
}



else{
    //loggedout
    document.getElementById('favList').innerHTML='<i class="fa-solid fa-location-arrow"></i> Famous Cities: ';

    for(let favCity of trending){
        let favCityEl=document.createElement('li');
        favCityEl.textContent=favCity;
        document.getElementById('favList').appendChild(favCityEl);
        favCityEl.addEventListener('click',()=>{
            city=favCityEl.textContent;
            getForecast();
            scrollWeather();
        })
    }



    favBtn.addEventListener('click',()=>{
        alert("Please login to save.");
    })



    favRemoveBtn.addEventListener('click',()=>{
        alert("Please login to save.");
    })
}



//___________________________________________  Search    _________________________________________________________________


// let search='c';

document.getElementById("searchOptions").innerHTML='';

let searchEl = document.getElementById("searchInput");
searchEl.addEventListener('input', (event) => getSearch(event));
searchEl.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        getSearch(event);
    }
});



async function getSearch(event) {
try {
    let search = document.getElementById("searchInput").value;
    const searchOptions=document.getElementById("searchOptions");

    // if input is empty don't run ahead
    if(!search){
       searchOptions.innerHTML='';
        if(event.key==='Enter'){
            //PLEASE ENTER SOMETHING
            console.log('plz enter somthng before pressing enter');
            searchOptions.innerHTML = '<li class="searchWarning">Please enter a city name.</li>';
            // console.log('plz enter somthng before pressing enter key');
        }
        else{console.log('input cleared')}
        return;
    }

    
    //IF ENTER IS PRESSED
    if(event.key === 'Enter'){
        const results = document.getElementsByClassName("searchEl");
        if(results.length > 0){
            let location = results[0].textContent;
            city = location.split(',')[0].trim();
            getForecast();
            document.getElementById("weather").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            searchOptions.innerHTML='';
            document.getElementById("searchInput").value='';
            return;
        }
        else{
            searchOptions.innerHTML = '<li class="searchWarning">Not found.</li>';
            return;
        }
    }
    
    searchOptions.innerHTML='';


    const res = await fetch(`${baseURL}/search.json?key=${key}&q=${search}`);
    const data = await res.json();
    console.log('matching cities array',data);

    for(let i=0;i<data.length;i++){
        let newSearchOption=document.createElement("li");
        newSearchOption.classList.add("searchEl");
        newSearchOption.innerHTML= `${data[i].name},${data[i].region}, ${data[i].country}`;
        searchOptions.appendChild(newSearchOption);
    }



    //IF ONE OF THE OPTIONS IS CLICKED
    NewSearchList=document.getElementsByClassName("searchEl");
    if(NewSearchList.length===0){
        searchOptions.innerHTML = '<li class="searchWarning">Not found.</li>';
        return;
    }
    for(let i=0; i<NewSearchList.length && i<5 ;i++){
        NewSearchList[i].addEventListener('click',()=>{
            city = NewSearchList[i].textContent.split(',')[0].trim();
            getForecast();
            document.getElementById("weather").scrollIntoView({
                behavior:"smooth",
                block:"start"
            });
        });
    }
    


} catch (err) {
    console.error(err);
}
}


    