let cityBaseEndpoint = "https://api.teleport.org/api/cities/?search=";

var currentFocus;
let CITIES = [];

SEARCH.addEventListener("click", function (e) {
    CITIES = [];
})

SEARCH.addEventListener("input", function (e) {
    removeSuggestions();
    var a, b, i, val = this.value;
    if (!val) {
        return false;
    }
    currentFocus = -1;

    a = document.createElement("ul");
    a.setAttribute("id", "suggestions");

    this.parentNode.appendChild(a);
    
    let endpoint = cityBaseEndpoint + SEARCH.value;
    fetch(endpoint)
    .then((response) => response.json())
    .then((result) => {
        let cities = result._embedded["city:search-results"];
        let length = cities.length > 5 ? 5 : cities.length;

        for (let i = 0; i < length; i++) {
            let isPush = true;
            for (j = 0; j < CITIES.length; j++) {
                if (CITIES[j].name == cities[i].matching_full_name) {
                    isPush = false;
                }
            }
            isPush ? CITIES.push({name: cities[i].matching_full_name}) : null
        }
    })
    
    for (i = 0; i < CITIES.length; i++) {
        if (CITIES[i].name.toUpperCase().includes(val.toUpperCase())) {
            document.getElementById("suggestions").classList.add("nav");
            document.getElementById("suggestions").classList.add("flex-column");
            li = document.createElement("li");
            li.innerHTML = CITIES[i].name.substr(0, val.length);
            li.innerHTML += CITIES[i].name.substr(val.length);
            li.innerHTML +=  "<input type='hidden' value='" + CITIES[i].name + "'>";
            li.addEventListener("click", function (e) {
                SEARCH.value = this.getElementsByTagName("input")[0].value;
                removeSuggestions();
                CITIES = [];
            });

            a.appendChild(li);
        }
    }
});

SEARCH.addEventListener("keydown", function (e) {
    var x = document.getElementById("suggestions");
    if (x) x = x.getElementsByTagName("li");
    if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
    } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
    }
    if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
            if (x) x[currentFocus].click();
        }
    }
});

SEARCH.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        removeSuggestions();
        let location = SEARCH.value;
        if (location) {
            currentCity = location;
            getWeatherData(location, currentUnit, hourlyOrWeek);
        }
    }
});

// function to handle search form
SEARCH_FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    let location = SEARCH.value;
    if (location) {
        currentCity = location;
        getWeatherData(location, currentUnit, hourlyOrWeek);
    }
});

function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("active");
}

function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
    }
}

function removeSuggestions() {
    var x = document.getElementById("suggestions");
    if (x) x.parentNode.removeChild(x);
}