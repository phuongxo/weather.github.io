let currentCity = "";
let currentUnit = "c";
let hourlyOrWeek = "week";

// hàm này tự động lấy dữ liệu thời tiết của HÀ Nội, load trang lần đầu tiên sẽ gọi hàm này
function initFetchDataDefault() {
    currentCity = "Ho Chi Minh City";
    currentUnit = "c";
    getWeatherData(currentCity, currentUnit, hourlyOrWeek);
}
initFetchDataDefault();

// function to get weather data
function getWeatherData(city, unit, hourlyOrWeek) {
    let citySplit = city.split(",");
    city = citySplit[0];
    
    fetch(
        `${API_URL}/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`,
        { method: "GET", headers: {} }
    )
        .then((response) => response.json())
        .then((data) => {
            let today = data.currentConditions;
            
            unit === "c" ? TEMP.innerText = today.temp : TEMP.innerText = CToF(today.temp);
            
            CURRENT_LOCATION.innerText = data.resolvedAddress;
            CONDITION.innerText = today.conditions;
            RAIN.innerText = "Perc - " + today.precip + "%";
            UV_INDEX.innerText = today.uvindex;
            WIND_SPEED.innerText = today.windspeed + " km/h";
            MAIN_ICON.src = getIcon(today.icon);
            HUMIDITY.innerText = today.humidity + "%";
            VISIBILITY.innerText = today.visibility;
            AIR_QUALITY.innerText = today.winddir;
            SUN_RISE.innerText = timeFormat(today.sunrise);
            SUN_SET.innerText = timeFormat(today.sunset);
            PRESSURE.innerText = today.pressure;
            DEW.innerText = today.dew;
            SOLARRADIATION.innerText = today.solarradiation;

            updateAirQualityStatus(today.winddir);
            changeBackground(today.icon);
            changeLocationBackground(city);
            updateHumidityStatus(today.humidity);
            updateVisibilityStatus(today.visibility);
            fetchForecastHoursSidebar(data.days, unit)

            if (hourlyOrWeek === "hourly") {
                updateForecast(data.days[0].hours, unit, "day");
            } else {
                updateForecast(data.days, unit, "week");
            }
        })
        .catch((err) => {
            alert("City not found in our database");
        });
}


function fetchForecastHoursSidebar(data, unit) {
    HOURS_SIDEBAR_CARDS.innerHTML = "";
    
    let day = 0;
    let numCards = 4;
    
    let nextTime = new Date().getHours() ;
    nextTime += 5;
    
    for (let i = 0; i < numCards; i++) {
        if (nextTime >= 23) {
            day += 1;
            nextTime = 0;
        }

        let dayName = getHour(data[day].hours[nextTime].datetime);
        let iconCondition = data[day].hours[nextTime].icon;
        let iconSrc = getIcon(iconCondition);

        let dayTemp = data[day].hours[nextTime].temp;
        if (unit === "f") {
            dayTemp = CToF(dayTemp);
        }

        let tempUnit = "°C";
        if (unit === "f") {
            tempUnit = "°F";
        }

        let dayNameArr = dayName.split(" ");
        let card = document.createElement("div");
        card.classList.add("flex-column");
        card.classList.add("mr-1");
        card.innerHTML = `
            <p class="small mb-1"><strong>${dayTemp}${tempUnit}</strong></p>
            <div style="width: 30px; height:26px; margin: auto;"><img src="${iconSrc}"></div>
            <p class="mb-0 mt-2"><strong>${dayNameArr[0]}</strong></p>
            <p class="mb-0 text-muted" style="font-size: 0.65rem">${dayNameArr[1]}</p>
        `;
        HOURS_SIDEBAR_CARDS.appendChild(card);
        nextTime += 5;
    }
}

//hàm xử lý dự báo thời tiết 7 ngày
function updateForecast(data, unit, type) {
    WEATHER_CARDS.innerHTML = "";
    
    let day = 0;
    let numCards = 0;
    if (type === "day") {
        numCards = 24;
    } else {
        numCards = 4;
    }

    for (let i = 0; i < numCards; i++) {
        let dayName = getHour(data[day].datetime);
        if (type === "week") {
            dayName = getDayName(data[day].datetime);
        }

        let iconCondition = data[day].icon;
        let iconSrc = getIcon(iconCondition);

        let dayTemp = data[day].temp;
        if (unit === "f") {
            dayTemp = CToF(dayTemp);
        }
        let tempUnit = "°C";
        if (unit === "f") {
            tempUnit = "°F";
        }

        if (type === "week") {
            let div1 = document.createElement("div");
            div1.classList.add("col-xs-12");
            div1.classList.add("col-sm-12");
            div1.classList.add("col-md-6");
            div1.classList.add("col-lg-6");
            div1.classList.add("col-xl-3");
            div1.classList.add("mb-4");
    
            div1.innerHTML = `
                <div class="card" style="color: #4B515D; border-radius: 20px; border: none;">
                    <div class="card-body p-3">
                        <div class="d-flex text-center">
                            <h6 class="flex-grow-1">${dayName}</h6>
                        </div>
    
                        <div class="d-flex flex-column text-center mt-1 mb-1">
                            <h6 class="display-7 mb-0 font-weight-bold" style="color: #1C2331;"> ${dayTemp}${tempUnit} </h6>
                            <span class="small" style="color: #868B94">${data[day].conditions}</span>
                        </div>
    
                        <div class="d-flex align-items-center">
                            <div class="flex-grow-1" style="font-size: 1rem;">
                                <div class="small"><i class="fas fa-wind fa-fw" style="color: #868B94;"></i>
                                    <span> ${data[day].windspeed} km/h
                                    </span></div>
                                <div class="small"><i class="fas fa-tint fa-fw" style="color: #868B94;"></i>
                                    <span> ${data[day].humidity}% </span>
                                </div>
                                <div class="small"><i class="fas fa-sun fa-fw" style="color: #868B94;"></i>
                                    <span> ${data[day].uvindex}h </span>
                                </div>
                            </div>
                            <div class="small img-mobile" style="width: 70px; height: 57px">
                                <img src="${iconSrc}">
                            </div>
                        </div>
    
                    </div>
                </div>
            `
            WEATHER_CARDS.appendChild(div1);
        } else {
            let card = document.createElement("div");
            card.classList.add("the2");
            card.classList.add("col-lg-2");
            card.classList.add("col-xs-3");
            card.classList.add("col-sm-3");
            card.classList.add("mr-1");

            card.innerHTML = `
                <div class="card2 card-mobile">
                    <h2 class="day-name mt-1 text-center">${dayName}</h2>
                    <div class="card-icon">
                    <img src="${iconSrc}" class="day-icon" alt="" />
                    </div>
                    <div class="day-temp">
                    <h2 class="temp">${dayTemp}<span class="thoi-tiet-unit">${tempUnit}</span></h2>
                    
                    </div>
                </div>
                
  		    `;
              WEATHER_CARDS.appendChild(card);
        }
        day++;
    }
}

// thay đổi icon theo tình trạng
function getIcon(condition) {
    return ICONS[condition];
}

// thay doi hinh nen theo thoi tiet
function changeBackground(condition) {
    const body = document.querySelector("body");
    let bg = BACKGROUND_IMAGES[condition];
    body.style.backgroundImage = `linear-gradient(rgb(97 97 97 / 50%), rgb(98 97 97 / 50%)),url(${bg})`;
}

function changeLocationBackground(city) {
    const body = document.querySelector(".img-location");
    fetch(
        `https://api.pexels.com/v1/search?query=${city}&per_page=1`,
        { method: "GET", headers: {
            Authorization: API_PEXELS
        } }
    )
        .then((response) => response.json())
        .then((data) => {
            bg = data.photos[0].src.medium;
            body.style.backgroundImage = `linear-gradient(rgb(60 60 60 / 50%), rgb(60 60 60 / 50%)),url(${bg})`;
            body.style.backgroundSize = "100% 100%";
        })
        .catch((err) => {
            alert("City not found in our database");
        });
}

// xử lý giờ, hours from hh:mm:ss
function getHour(time) {
    let timeSplit = time.split(":");
    let hour = timeSplit[0];
    let min = timeSplit[1];
    if (hour > 12) {
        hour = hour - 12;
        return `${hour}:${min} PM`;
    } else {
        return `${hour}:${min} AM`;
    }
}

function timeFormat(time) {
    let timeSplit = time.split(":");
    let hour = timeSplit[0];
    let minute = timeSplit[1];
    return hour + ":" + minute;
}

// lấy tên của ngày (moday, tuesday, ...)
function getDayName(date) {
    let day = new Date(date);
    return DAYS[day.getDay()];
}

// hàm xử lý trạng thái của độ ẩm
function updateHumidityStatus(humidity) {
    switch (true) {
        case humidity <= 30:
            HUMIDITY_STATUS.innerText = "Low";
            break;
        case humidity <= 60:
            HUMIDITY_STATUS.innerText = "Moderate";
            break
        default:
            HUMIDITY_STATUS.innerText = "High";
    }
}

// hàm xử lý trạng thái của tầm nhìn (Visibility)
function updateVisibilityStatus(visibility) {
    switch (true) {
        case visibility <= 0.03:
            VISIBILITY_STATUS.innerText = "Dense Fog";
            break;
        case visibility <= 0.16:
            VISIBILITY_STATUS.innerText = "Moderate Fog";
            break;
        case visibility <= 0.35:
            VISIBILITY_STATUS.innerText = "Light Fog";
            break;
        case visibility <= 1.13:
            VISIBILITY_STATUS.innerText = "Very Light Fog";
            break;
        case visibility <= 2.16:
            VISIBILITY_STATUS.innerText = "Light Mist";
            break;
        case visibility <= 5.4:
            VISIBILITY_STATUS.innerText = "Very Light Mist";
            break;
        case visibility <= 10.8:
            VISIBILITY_STATUS.innerText = "Clear Air";
            break;
        default:
            VISIBILITY_STATUS.innerText = "Very Clear Air";
    }
}

// Hàm xử lý lượng mưa
function updateAirQualityStatus(quality) {
    switch (true) {
        case quality <= 50:
            AIR_QUALITY_STATUS.innerText = "Good👌";
            break;
        case quality <= 100:
            AIR_QUALITY_STATUS.innerText = "Moderate😐";
            break;
        case quality <= 150:
            AIR_QUALITY_STATUS.innerText = "Unhealthy for Sensitive Groups😷";
            break;
        case quality <= 200:
            AIR_QUALITY_STATUS.innerText = "Unhealthy😷";
            break;
        case quality <= 250:
            AIR_QUALITY_STATUS.innerText = "Very Unhealthy😨";
            break;
        default:
            AIR_QUALITY_STATUS.innerText = "Hazardous😱";
    }
}

// chuyển từ độ C sang độ F
function CToF(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
}

// xử lý sự kiện chuyển đổi từ độ c sang f, ngược lại
F_BTN.addEventListener("click", () => {
    changeUnit("f");
});

C_BTN.addEventListener("click", () => {
    changeUnit("c");
});

function changeUnit(unit) {
    if (currentUnit !== unit) {
        currentUnit = unit;
        TEMP_UNIT.forEach((elem) => {
            elem.innerText = `°${unit.toUpperCase()}`;
        });
        if (unit === "c") {
            F_BTN.classList.remove("active");
            C_BTN.classList.add("active");
        } else {
            F_BTN.classList.add("active");
            C_BTN.classList.remove("active");
        }
        if (currentCity === "") {
            currentCity = "Ho Chi Minh City";
        }
        getWeatherData(currentCity, currentUnit, hourlyOrWeek);
    }
}

// xử lý sự kiện chuyển đổi từ hourly hoặc week
HOURLY_BTN.addEventListener("click", () => {
    changeTimeSpan("hourly");
});

WEEK_BTN.addEventListener("click", () => {
    changeTimeSpan("week");
});

function changeTimeSpan(unit) {
    if (hourlyOrWeek !== unit) {
        hourlyOrWeek = unit;
        if (unit === "hourly") {
            WEEK_BTN.classList.remove("active");
            HOURLY_BTN.classList.add("active");
        } else {
            WEEK_BTN.classList.add("active");
            HOURLY_BTN.classList.remove("active");
        }
        if (currentCity === "") {
            currentCity = "Ho Chi Minh City";
        }
        getWeatherData(currentCity, currentUnit, hourlyOrWeek);
    }
}
