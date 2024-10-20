const API_KEY = "CZ2JH84MQTTWZCRU2P7XZ6RD2";

let flocation = document.getElementById("flocation");
let form = document.getElementById("weatherForm");
let tempC = document.getElementById("temp-c") 
let humidity =document.getElementsByClassName('humidity');
let Address = document.getElementById('location');
let sunrise = document.getElementById('sunrise');
let wind = document.getElementById('wind');

const xValues = ["12 AM", "3 AM", "6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"];
let yValues = [];

let yValues2 =[];

const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(flocation.value);
    
    getData();
}
function toCelcius(data){
    let result  = ((data-32)*5)/9 ;
    return Math.floor(result);
 }

async function getData(){
    const location = flocation.value
    const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`)
    const data = await res.json();
    tempC.innerText = toCelcius(data.currentConditions.temp);
    humidity[0].innerText = data.currentConditions.humidity;
    
    humidity[1].innerText = data.currentConditions.humidity;
    Address.innerText = data.resolvedAddress;
    sunrise.innerText = data.currentConditions.sunrise;
    wind.innerText = data.currentConditions.windspeed;


    //chart for temperature
    yValues = [];
    for(let i=0; i<24; i+=3){
        yValues.push(toCelcius(data.days[0].hours[i].temp));
    }
    console.log(yValues);
    const ymin = Math.min(...yValues);
    console.log(ymin);
    const ymax = Math.max(...yValues);
    new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            yAxes: [{ticks: {min: ymin-2, max:ymax+2}}],
          }
        }
      });

      //chart for humidity

      
      yValues2 =[];

      for(let i = 0; i<24; i+=3){
        yValues2.push(Math.floor(data.days[0].hours[i].humidity));
      }
      const hmin = Math.min(...yValues2);
      const hmax = Math.max(...yValues2);

      new Chart("myChart2", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(0,0,255,1.0)",
            borderColor: "rgba(0,0,255,0.1)",
            data: yValues2
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            yAxes: [{ticks: {min: hmin-2, max:hmax+2}}],
          }
        }
      });
}
form.addEventListener('submit', handleSubmit);



console.log(toCelcius(74));



