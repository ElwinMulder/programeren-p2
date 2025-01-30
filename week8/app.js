// Luister naar het 'DOMContentLoaded' event om te controleren of de pagina volledig is geladen
document.addEventListener('DOMContentLoaded', function() {
    // Haal de laatst opgeslagen locatie op uit Local Storage
    const savedLocation = localStorage.getItem('lastLocation');

    // Controleer of een opgeslagen locatie is
    if (savedLocation) {
        // Stel de waarde van het locatie-invoerveld in op de opgeslagen locatie
        document.getElementById('location-input').value = savedLocation;
        // Haal het weer op voor de opgeslagen locatie
        getWeather(savedLocation);
    }
});

// Voeg een 'click' eventlistener toe aan de weer-ophaal knop
document.getElementById('get-weather-btn').addEventListener('click', function() {
    // Haal de waarde op van het locatie-invoerveld
    const location = document.getElementById('location-input').value;
    // Sla de waarde op in Local Storage
    localStorage.setItem('lastLocation', location);
    // Haal het weer op voor de ingevoerde locatie
    getWeather(location);
});

// Functie om het weer op te halen voor een gegeven locatie
function getWeather(location) {
    // API-sleutel voor OpenWeatherMap
    const apiKey = 'b653a847fbaea29b619fa0035640e4';
    // URL voor de weersvoorspelling API-aanroep
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=nl`;

    // Voer de API-aanroep uit met de Fetch API
    fetch(url)
        .then(response => {
            // Controleer of de API-aanroep succesvol was
            if (!response.ok) {
                // Gooi een fout als de API-aanroep mislukt
                throw new Error('Weerdata niet gevonden.');
            }
            // Converteer de respons naar JSON
            return response.json();
        })
        .then(data => {
            // Update de weerinformatie in de DOM
            updateWeatherData(data);
        })
        .catch(error => {
            // Toon een foutmelding als er een fout optreedt
            document.getElementById('weather-result').textContent = error.message;
        });
}

// Functie om de weerinformatie in de DOM te updaten
function updateWeatherData(data) {
    // Verkrijg de div waar de weerresultaten getoond worden
    const weatherResultDiv = document.getElementById('weather-result');

    // Converteer de UNIX-timestamps naar leesbare tijden voor zonsopgang en zonsondergang
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    // Stel de innerHTML van de weerresultaten div in met de opgehaalde weerdata
    weatherResultDiv.innerHTML = `
        <h2>Weer in ${data.name}</h2>
        <p>Temperatuur: ${data.main.temp} Â°C</p>
        <p>Luchtvochtigheid: ${data.main.humidity}%</p>
        <p>Weer: ${data.weather[0].description}</p>
        <p>Windsnelheid: ${data.wind.speed} m/s</p>
        <p>Zonsopgang: ${sunriseTime}</p>
        <p>Zonsondergang: ${sunsetTime}</p>
    `;
}