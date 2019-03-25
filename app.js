window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.weather-description');
    let locationTimeZone = document.querySelector('.weather-location');
    let temperatureDegree = document.querySelector('.temp');
    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';

            const api = `${proxy}https://api.darksky.net/forecast/405736f704ae71a8eb325263c61286b0/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //Set DOM elements from the API.
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimeZone.textContent = data.timezone;
                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

                    //Set Icon.
                    setIcons(icon, document.querySelector(".weatherType"));

                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

                });

        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon])
    }
});