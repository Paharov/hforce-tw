import axios from 'axios';

var ratesMap;

export async function getRatesMap(component) {
    if (ratesMap === undefined) {
        console.log("calling axios.")
        await axios.get("http://data.fixer.io/api/latest?access_key=df34f07c9bb7a7cd2f0172344d18c406")
            .then(res => { 
                component.setState({
                    rates: res.data.rates
                })
            })
    }
    return ratesMap;
}

export function calculateCircleSize(srcAmount, rate) {
    const usdAmount = rate != 0 ? srcAmount / rate : srcAmount;
    if (usdAmount > 10000) {
        return 16
    } else if (usdAmount >= 5000) {
        return 12
    } else if (usdAmount >= 2000) {
        return 8
    } else if (usdAmount >= 500) {
        return 6
    } else {
        return 4
    }
}
