function getHighestRate() {
    var xhr = new XMLHttpRequest();
    var tradingPair = "ETH-PLN";

    var endpoint = "https://api.zondacrypto.exchange/rest/trading/stats/" + tradingPair;

    xhr.open("GET", endpoint, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);

                if (data && data.status === "Ok" && data.stats) {
                    var highestRate = data.stats.h;
                    var button = document.getElementById("statsButton");
                    button.innerHTML = "The highest ETH rate of the last 24 hours: " + highestRate + " PLN";
                } else {
                    console.error("API data structure error");
                }
            } else {
                console.error("API request error. Status code: " + xhr.status);
            }
        }
    };

    xhr.send();
}