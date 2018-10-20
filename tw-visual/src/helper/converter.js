import axios from 'axios';
import rates from '../resources/rates.json'

export async function getRatesMap(component) {
    if (rates === undefined) {
        console.log("calling axios for rates.")
        await axios.get("http://data.fixer.io/api/latest?access_key=df34f07c9bb7a7cd2f0172344d18c406")
            .then(res => { 
                component.setState({
                    rates: res.data.rates
                })
            })
    } else {
        console.log("returning rates from file.")
        component.setState({
            rates: rates.rates
        })
    }
}

export function calculateCircleSize(srcAmount, rate) {
    const eurAmount = rate != 0 ? srcAmount / rate : 2000;
    if (eurAmount > 10000) {
        return 16
    } else if (eurAmount >= 5000) {
        return 12
    } else if (eurAmount >= 2000) {
        return 8
    } else if (eurAmount >= 500) {
        return 6
    } else {
        return 4
    }
}
