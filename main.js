document.addEventListener("DOMContentLoaded", () => {
    const text = document.querySelector("#text");
    const enviar = document.querySelector("#enviar");
    const previsao = document.querySelector("#previsao");


    enviar.addEventListener('click', event => {
        event.preventDefault();
        fetchWeather();
    });

    const fetchWeather = () => {
        let loader = `<div class="boxLoading">Loading...</div>`;
        document.querySelector('#previsao').innerHTML = loader;
        
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?&q=${text.value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "3a711dba30msh0d2fa420abd4f6dp148d63jsn48834b2eac26",
            },
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response);

                let weatherDescriptionContent = "";
                let TemperatureContent = "";


                const Weather = (() => {
                    let weatherDescription = response.weather[0].description 

                    weatherDescription === 'clear sky' ? weatherDescriptionContent = "não tem nenhuma nuvem" :
                    weatherDescription === 'scattered clouds' ? weatherDescriptionContent = "tem uns pingadinho de nuvem" :
                    weatherDescription === 'few clouds' ? weatherDescriptionContent = "tem poucas nuvens" :
                    weatherDescription === 'broken clouds' ? weatherDescriptionContent = "tem umas nuvenzinhas quebradas" :
                    weatherDescription === 'overcast clouds' ? weatherDescriptionContent = "tá nublado" :    
                    weatherDescriptionContent = weatherDescription;
                })();

                const TemperatureInCelsius = (() => {
                    let Kelvin = response.main.temp;
                    let Celsius = Kelvin - 273;
                    let CelsiusReduced = Celsius.toFixed(1);
                    TemperatureContent = CelsiusReduced
                })();


                const previsaoTempo = `
                        <h1>${response.name}</h1>
                        <p>Se olhar pro céu, vai ver que ${weatherDescriptionContent} e que agora está fazendo ${TemperatureContent} °C</p>
                    `

                previsao.innerHTML = previsaoTempo;


            })
            .catch(err => {
                console.log(err);
            });
    }
});