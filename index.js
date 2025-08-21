
async function getData() {

    const URL = "https://raw.githubusercontent.com/MrSunshyne/mauritius-dataset-electricity/refs/heads/main/data/power-outages.latest.json";
    
    const res = await fetch(URL);
    
    const result = await res.json();

    console.log(result);

    return result; 
}

function extractFuture(obj) {
    return obj.future;
}

function addOutageToDom(item) {
    tpl = `
        <div class="border rounded-3xl p-10 space-y-4 bg-white-50">
            <div data-date class="text-center font-medium">${item.date}</div>
            <div data-location class="flex justify-between">
                <div>${item.locality}</div>
                <div>${item.district}</div>
            </div>
            <div data-duration class="flex justify-between">
                <div>${item.from}</div>
                <div>${item.to}</div>
            </div>
        </div>
    `;

   document.querySelector("#output").innerHTML += tpl;
}

function clearOutput() {
    const output = document.querySelector("#output");
    output.innerHTML = "";
}

function renderOutput(items) {
    for (var key in items) {
        let item = items[key];
        addOutageToDom(item);
    }
}

async function initialize() {

    const data = await getData();

    const future = extractFuture(data);

    clearOutput();

    renderOutput(future);
}

initialize();