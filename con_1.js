let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let conbtn = document.querySelector(".convert");
let selects = document.querySelectorAll(".op select");
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll(".input input");
let inp1 = inputs[0];
let inp2 = inputs[1];

let rates = {};

let requestURL = "https://api.exchangerate.host/latest?base=USD";

fetchRates();

async function fetchRates(){
    let res = await fetch(requestURL);
    res = await res.json();
    rates = res.rates;
    populateOptions();
}

function populateOptions() {
    let val = "";
    Object.keys(rates).forEach(code => {
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    });
    selects.forEach((s) => (s.innerHTML = val));
}

function convert(val, fromcurr, tocurr) {
    let v = (val / rates[fromcurr]) * rates[tocurr];
    let v1 = v.toFixed(3);
    return v1 == 0.0 ? v.toFixed(5) : v1;
}

function displayRates() {
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1, v1, v2);
    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

conbtn.addEventListener("click", () => {
    let fromcurr = sel1.value;
    let fromVal = parseFloat(inp1.value);
    let toCurr = sel2.value;
    if (isNaN(fromVal)) {
        alert("Enter A Number");
    } else {
        let cVal = convert(fromVal, fromcurr, toCurr);
        inp2.value = cVal;
    }
});

selects.forEach(s => s.addEventListener("change", displayRates));

document.querySelector(".swap").addEventListener("click", () => {
    let in1 = inp1.value;
    let in2 = inp2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inp1.value = in2;
    inp2.value = in1;

    sel1.value = op2;
    sel2.value = op1;

    displayRates();
});
