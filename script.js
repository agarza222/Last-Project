document.getElementById('get-weather-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const speed = parseFloat(document.getElementById('speed-input').value) || 0;
    const isFullGear = document.getElementById('full-gear-checkbox').checked;
    
    const apiKey = 'a1ff659ac5e7155acf5667b726d1f7fe';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    if (!city) {
        alert("Please enter a city!");
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            const temp = data.main.temp;
            const label = document.getElementById('factor-label');
            const valueSpan = document.getElementById('feels-like');
            const adviceBox = document.getElementById('gear-recommendation');
            const adviceText = document.getElementById('gear-text');
            const tempDisplay = document.getElementById('current-temp');

            tempDisplay.style.color = "#fff";
            valueSpan.style.opacity = "1";
            label.style.opacity = "1";
            document.getElementById('description').style.color = "#ccc";
            adviceBox.style.border = "1px solid rgba(255,255,255,0.15)";
            adviceBox.style.background = "rgba(255,255,255,0.1)";

            if (temp >= 80) {
                label.innerText = "Wind Blast Heat";
                let heatFactor = (speed > 60) ? (speed - 60) * 0.22 : 0;
                valueSpan.innerText = Math.round(data.main.feels_like + heatFactor);

                if (isFullGear) {
                    adviceText.innerHTML = `<span class="safe-text">✅ PROTECTED:</span> <br> Gear is shielding you from the ${speed}mph hot blast.`;
                } else {
                    adviceText.innerHTML = `<span class="danger-text">⚠️ DANGER:</span> <br> ${speed}mph wind is cooking your skin! Dehydrate now.`;
                }
            } else {
                label.innerText = "Wind Chill";
                let vPower = Math.pow(speed, 0.16);
                let chill = 35.74 + (0.6215 * temp) - (35.75 * vPower) + (0.4275 * temp * vPower);
                
                valueSpan.innerText = Math.round(Math.min(chill, temp));
                adviceText.innerHTML = `<span style="color: #fff">Conditions are stable. Ride safe!</span>`;
            }

            tempDisplay.innerText = Math.round(temp) + "°F";
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('wind-speed').innerText = Math.round(data.wind.speed);
        })
        .catch(err => alert("City not found!"));
});