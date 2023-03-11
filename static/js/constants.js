const API_KEY = "M7UFFW2RSUWH7WZSJ8N5NZW62";
const API_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
const API_PEXELS = "b4y7EqrsTBlLB20UM0x1hcHrVDDJ6YsTc5iaNqXtDkYQEWLEWbJdnLdC";

const TEMP = document.getElementById("temp"),
    DATE = document.getElementById("thoi-gian"),
    CONDITION = document.getElementById("tinh-trang"),
    RAIN = document.getElementById("mua"),
    MAIN_ICON = document.getElementById("icon"),
    CURRENT_LOCATION = document.getElementById("location"),
    UV_INDEX = document.querySelector(".uv-index"),
    // UV_TEXT = document.querySelector(".uv-text"),
    WIND_SPEED = document.querySelector(".toc-do-gio"),
    SUN_RISE = document.querySelector(".mat-troi-moc"),
    SUN_SET = document.querySelector(".mat-troi-lan"),
    HUMIDITY = document.querySelector(".do-am"),
    VISIBILITY = document.querySelector(".tam-nhin"),
    HUMIDITY_STATUS = document.querySelector(".do-am-status"),
    AIR_QUALITY = document.querySelector(".luong-mua"),
    AIR_QUALITY_STATUS = document.querySelector(".luong-mua-status"),
    VISIBILITY_STATUS = document.querySelector(".trang-thai-tam-nhin"),
    SEARCH_FORM = document.querySelector("#tim-kiem"),
    SEARCH = document.querySelector("#query"),
    C_BTN = document.querySelector(".celcius"),
    F_BTN = document.querySelector(".fahrenheit"),
    TEMP_UNIT = document.querySelectorAll(".thoi-tiet-unit"),
    HOURLY_BTN = document.querySelector(".hourly"),
    WEEK_BTN = document.querySelector(".week"),
    WEATHER_CARDS = document.querySelector("#the-thoi-tiet");
    HOURS_SIDEBAR_CARDS = document.querySelector("#thoi-tiet-theo-gio");
    PRESSURE = document.querySelector(".pressure");
    DEW = document.querySelector(".dew");
    SOLARRADIATION = document.querySelector(".solarradiation");

const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const ICONS = {
    "partly-cloudy-day": "static/img/27.png",
    "partly-cloudy-night": "static/img/15.png",
    "rain": "static/img/39.png",
    "clear-day": "static/img/26.png",
    "clear-night": "static/img/10.png",
    "cloudy": "static/img/27.png",
};

const BACKGROUND_IMAGES = {
    "partly-cloudy-day": "static/img/pc.webp",
    "partly-cloudy-night": "static/img/pcn.jpeg",
    "rain": "static/img/rain.webp",
    "clear-day": "static/img/cd.jpeg",
    "clear-night": "static/img/cn.jpeg",
    "cloudy": "static/img/pc.png",
};
