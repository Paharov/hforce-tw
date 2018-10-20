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