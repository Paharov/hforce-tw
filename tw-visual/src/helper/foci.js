export function getFoci(currencies){
    let n = currencies.length
    let center = { x: 650, y: 450 }
    var foci = []
    for (var i = 0; i < n; i++) {
        foci.push({
            x: center.x + 250 * Math.cos((2*i*Math.PI)/n),
            y: center.y + 250 * Math.sin((2*i*Math.PI)/n)
        })
    }
    return foci
};

export function getCurrencyMap(currencies){
    let foci = getFoci(currencies)
    var currencyMap = {}
    currencies.forEach((currency, i) => {
        currencyMap[currency] = {
            x: foci[i].x,
            y: foci[i].y
        }
    })
    return currencyMap
}