const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    AQD: "AQ",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    XOF: "BE",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    NOK: "BV",
    BWP: "BW",
    BYR: "BY",
    BZD: "BZ",
    CAD: "CA",
    CDF: "CD",
    XAF: "CF",
    CHF: "CH",
    CLP: "CL",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CVE: "CV",
    CYP: "CY",
    CZK: "CZ",
    DJF: "DJ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    ECS: "EC",
    EEK: "EE",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    FKP: "FK",
    GBP: "GB",
    GEL: "GE",
    GGP: "GG",
    GHS: "GH",
    GIP: "GI",
    GMD: "GM",
    GNF: "GN",
    GTQ: "GT",
    GYD: "GY",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HTG: "HT",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    IQD: "IQ",
    IRR: "IR",
    ISK: "IS",
    JMD: "JM",
    JOD: "JO",
    JPY: "JP",
    KES: "KE",
    KGS: "KG",
    KHR: "KH",
    KMF: "KM",
    KPW: "KP",
    KRW: "KR",
    KWD: "KW",
    KYD: "KY",
    KZT: "KZ",
    LAK: "LA",
    LBP: "LB",
    LKR: "LK",
    LRD: "LR",
    LSL: "LS",
    LTL: "LT",
    LVL: "LV",
    LYD: "LY",
    MAD: "MA",
    MDL: "MD",
    MGA: "MG",
    MKD: "MK",
    MMK: "MM",
    MNT: "MN",
    MOP: "MO",
    MRO: "MR",
    MTL: "MT",
    MUR: "MU",
    MVR: "MV",
    MWK: "MW",
    MXN: "MX",
    MYR: "MY",
    MZN: "MZ",
    NAD: "NA",
    XPF: "NC",
    NGN: "NG",
    NIO: "NI",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PAB: "PA",
    PEN: "PE",
    PGK: "PG",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    PYG: "PY",
    QAR: "QA",
    RON: "RO",
    RSD: "RS",
    RUB: "RU",
    RWF: "RW",
    SAR: "SA",
    SBD: "SB",
    SCR: "SC",
    SDG: "SD",
    SEK: "SE",
    SGD: "SG",
    SKK: "SK",
    SLL: "SL",
    SOS: "SO",
    SRD: "SR",
    STD: "ST",
    SVC: "SV",
    SYP: "SY",
    SZL: "SZ",
    THB: "TH",
    TJS: "TJ",
    TMT: "TM",
    TND: "TN",
    TOP: "TO",
    TRY: "TR",
    TTD: "TT",
    TWD: "TW",
    TZS: "TZ",
    UAH: "UA",
    UGX: "UG",
    USD: "US",
    UYU: "UY",
    UZS: "UZ",
    VEF: "VE",
    VND: "VN",
    VUV: "VU",
    YER: "YE",
    ZAR: "ZA",
    ZMK: "ZM",
    ZWD: "ZW",
};

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";


const fetchRate = async (URL, to) => {
    const response = await fetch(URL);
    // console.log(response);
    const result = await response.json();
    return result[to];
};


const selects = document.querySelectorAll("select");
const from = document.querySelector(".from-box");
const to = document.querySelector(".to-box");
const button = document.querySelector("button");
const amount = document.querySelector("#amount");
const msg = document.querySelector(".msg");


//Adding Options
for (const currCode in countryList) {
    selects.forEach(select => {
        let option = document.createElement("option");
        
        option.innerHTML = currCode;
        option.value = currCode;
        // console.log(option);
        select.appendChild(option);
        // console.log(select);

        if (select.parentElement === from && currCode === "USD") {
            option.selected = true;
        }
        if (select.parentElement === to && currCode === "INR") {
            option.selected = true;
        }

        
    });
}

(defaultMsg = async () => {
    let defaultUrl = BASE_URL + `${selects[0].value.toLowerCase()}/${selects[1].value.toLowerCase()}.json`
    rate = await fetchRate(defaultUrl, selects[1].value.toLowerCase());
    msg.innerHTML = `1 USD = ${rate} INR`
}) ();



//Updating Country Icon
selects.forEach(select => {
    select.addEventListener("change", (event) => {
        let updatedCurr = select.options[select.selectedIndex].value;
        let newScr = `https://flagsapi.com/${countryList[updatedCurr]}/flat/64.png`;
        select.previousElementSibling.src = newScr;
    })
})

//Functionality of Button
button.addEventListener("click", (event) => {
    event.preventDefault();
    calcRes();
})

let calcRes = async () => {

    let fromValue = selects[0].value;
    let toValue = selects[1].value;
    let URL = BASE_URL + `${fromValue.toLowerCase()}/${toValue.toLowerCase()}.json`;
    let rate = await fetchRate(URL, toValue.toLowerCase());
    console.log(rate);
    let input = amount.value;
    // console.log(input);
    let output = input * rate;
    // console.log(output);
    msg.innerHTML = `${input} ${fromValue} = ${output} ${toValue}`
}