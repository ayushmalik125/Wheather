//___________________________________________HERO HEADLINE_________________________________________________________________
let headline = document.getElementById("changeHeadline");
const textLoad = () =>{
    setTimeout(()=>{
        headline.textContent="day";
    },0)
    setTimeout(()=>{
        headline.textContent="moment";
    },2000)
    setTimeout(()=>{
        headline.textContent="season";
    },4000)
    setTimeout(()=>{
        headline.textContent="storm";
    },6000)
}
textLoad();
setInterval(textLoad,8000);









//___________________________________________API_________________________________________________________________

// let baseURL = 'http://api.weatherapi.com/v1'
// let key = '2cab48709326470f96651918250812'
// let city = 'Kaithal'
// let days = 7
// let search = 'kait'

// // async function getCurrent() {
// //   try {
// //     const res = await fetch(`${baseURL}/current.json?key=${key}&q=${city}&aqi=yes`);
// //     const data = await res.json();
// //     console.log('current' , data);
// //   } catch (err) {
// //     console.error(err);
// //   }
// // }

// async function getForecast() {
// try {
//     const res = await fetch(`${baseURL}/forecast.json?key=${key}&q=${city}&days=${days}&aqi=yes&alert=yes`);
//     const data = await res.json();
//     console.log('forecast',data);
// } catch (err) {
//     console.error(err);
// }
// }

// async function getSearch() {
// try {
//     const res = await fetch(`${baseURL}/search.json?key=${key}&q=${search}`);
//     const data = await res.json();
//     console.log('search',data);
// } catch (err) {
//     console.error(err);
// }
// }

// console.log("Hello console!!");
// // getCurrent();
// getForecast();
// getSearch();





//___________________________________________ HERO DATE _________________________________________________________________

const dateData = new Date();
const year = dateData.getFullYear();
let month = dateData.getMonth();
let date = dateData.getDate();
let day = dateData.getDay();
switch(day){
    case 0: day='Monday';break;
    case 1: day='Tuesday';break;
    case 2: day='Wednesday';break;
    case 3: day='Thursday';break;
    case 4: day='Friday';break;
    case 5: day='Saturday';break;
}
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
switch(date){
    case 1: date=date+'st';break;
    case 2: date=date+'nd';break;
    case 3: date=date+'rd';break;
    default: date=date+'th';break;
}
const dateText = document.getElementById("date");
dateText.textContent= `It's ${day}, ${month} ${date}.`;






    