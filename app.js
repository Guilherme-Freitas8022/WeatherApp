async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('result');
    const extraDiv = document.getElementById('extra');
    resultDiv.innerHTML = 'Carregando...';
    extraDiv.style.display = 'none';

    const apiKey = 'eaefc1fb32d2e105448969c0c8d83ea2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&lang=pt_br&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            resultDiv.innerHTML = `<p class="error">Erro: ${data.message}</p>`;
            console.log(data);
            return;
        }

        // Mostrar clima principal
        resultDiv.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>🌡️ Temperatura: ${data.main.temp}°C</p>
            <p>💧 Umidade: ${data.main.humidity}%</p>
            <p>☁️ Clima: ${data.weather[0].description}</p>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon">
        `;

        // Mostrar informações extras
        extraDiv.style.display = 'block';
        document.getElementById('wind').textContent = data.wind.speed;
        document.getElementById('pressure').textContent = data.main.pressure;
        document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();

        // Mudar fundo conforme clima
        const mainWeather = data.weather[0].main;
        if(mainWeather === 'Rain') {
            document.body.style.background = 'linear-gradient(to bottom, #a0c4ff, #bdb2ff)';
        } else if(mainWeather === 'Clear') {
            document.body.style.background = 'linear-gradient(to bottom, #fce38a, #f38181)';
        } else if(mainWeather === 'Clouds') {
            document.body.style.background = 'linear-gradient(to bottom, #d3d3d3, #a9a9a9)';
        } else {
            document.body.style.background = 'linear-gradient(to bottom, #87ceeb, #f0f8ff)';
        }

    } catch (error) {
        resultDiv.innerHTML = `<p class="error">Erro ao buscar o clima!</p>`;
        console.error(error);
    }
}
