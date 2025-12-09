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

const baseURL = 'http://api.weatherapi.com/v1'
const key = '2cab48709326470f96651918250812'
const days = 14




async function getForecast() {
try {
    const res = await fetch(`${baseURL}/forecast.json?key=${key}&q=${city}&days=${days}&aqi=yes&alert=yes`);
    const data = await res.json();
    console.log(data);

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
    dateEl.textContent= `${getdate(date)} ${getmonth(month)}, ${year}`;
    currTempEl.textContent=data.current.temp_c;
    currConditionEl.textContent=data.current.condition.text;
    currFeelsEl.textContent="feels "+ data.current.feelslike_c;
    currHighlowEl.textContent="H:"+data.forecast.forecastday[0].day.maxtemp_c + ", L:"+data.forecast.forecastday[0].day.mintemp_c ;
    currImage.src=data.current.condition.icon;

    currentValList[0].textContent=data.current.humidity + '%';
    currentValList[1].textContent=data.current.air_quality.pm2_5 + ' pm2.5';
    currentValList[2].textContent=data.current.wind_kph + ' km/h';
    currentValList[3].textContent=data.current.pressure_in + ' inHg';
    currentValList[4].textContent=data.current.vis_km+ ' km';



    const array=data.forecast.forecastday[0].hour;
    const hourlyList = document.getElementById("hourlyList");
    for(let i=0;i<12;i++){
        let hourlyEl = document.createElement("li");
        hourlyEl.classList.add("hourlyListEl");

        hourlyEl.innerHTML = ((i==0)? `<h6 class="hourlyTime">12 AM</h6>`:`<h6 class="hourlyTime">${i} AM</h6>`)+
                    `<img class="hourlyImg" src="${array[i].condition.icon}" alt="Weather_img">
                    <p class="hourlyTemp">${array[i].temp_c}°</p>
                    <p><i class="fa-solid fa-cloud-rain"></i> <span class="hourlyRain">${array[i].chance_of_rain}%</span></p>`;
        hourlyList.appendChild(hourlyEl);
    }
    for(let i=12;i<24;i++){
        let hourlyEl = document.createElement("li");
        hourlyEl.classList.add("hourlyListEl");

        hourlyEl.innerHTML = ((i==12)? `<h6 class="hourlyTime">12 PM</h6>`:`<h6 class="hourlyTime">${i-12} PM</h6>`)+
                    `<img class="hourlyImg" src="${array[i].condition.icon}" alt="Weather_img">
                    <p class="hourlyTemp">${array[i].temp_c}°</p>
                    <p><i class="fa-solid fa-cloud-rain"></i> <span class="hourlyRain">${array[i].chance_of_rain}%</span></p>`;
        hourlyList.appendChild(hourlyEl);
    }




    console.log(data.forecast.forecastday);
    
    const Array=data.forecast.forecastday;
    const forecastList = document.getElementById("forecastList");
    for(let i=0;i<14;i++){
        let fDate=getdate(Array[i].date.slice(8));
        let fmonth=getmonth(Array[i].date.slice(5,7)-1);
        let forecastEl = document.createElement("li");
        forecastEl.classList.add("forecastListEl");
        forecastEl.innerHTML =`<p class="forecastHigh">${Array[i].day.maxtemp_c}°</p>
                    <i class="fa-solid fa-arrow-up-wide-short"></i>
                    <p class="forecastLow">${Array[i].day.mintemp_c}°</p>
                    <img src="${Array[i].day.condition.icon}" alt="weather_img" class="forecastImg">
                    <p class="forecastText">${Array[i].day.condition.text}</p>
                    <p class="forecastDate">${  fDate[0]=='0'? fDate.slice(1) : fDate} ${fmonth}</p>`;
        forecastList.appendChild(forecastEl);
    }




} catch (err) {
    console.error(err);
}
}

async function getSearch() {
try {
    const res = await fetch(`${baseURL}/search.json?key=${key}&q=${search}`);
    const data = await res.json();
    console.log('search',data);
} catch (err) {
    console.error(err);
}
}

//___________________________________________Weather_________________________________________________________________

//Initially
let city='New Delhi';
getForecast();








    