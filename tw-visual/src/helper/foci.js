export function getCurrencyMap(currencies, centerX, centerY, r){
    var foci = getFoci(currencies.length, centerX, centerY, r)
    var colors = getColors(currencies.length)
    shuffle(foci)
    shuffle(colors)
    var currencyMap = {}
    currencies.forEach((currency, i) => {
        currencyMap[currency] = {
            x: foci[i].x,
            y: foci[i].y,
            color: colors[i]
        }
    })
    return currencyMap
}

export function getFoci(n, centerX, centerY, r){
    let center = { x: centerX, y: centerY }
    var foci = []
    for (var i = 0; i < n; i++) {
        foci.push({
            x: center.x + r * Math.cos((2*i*Math.PI)/n),
            y: center.y + r * Math.sin((2*i*Math.PI)/n)
        })
    }
    return foci
};

function getColors(n){
    let alphabet = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
    var colors = []
    for (var i = 0; i < n; i++) {
        var currentColor = "#"
        for(var j = 0; j < 6; j++) {
            currentColor += alphabet[~~(Math.random() * alphabet.length)]
        }
        colors.push(currentColor)
    }
    return colors
}

function shuffle(array) {
    let n = array.length
    for (var i = 0; i < n; i++) {
        var swapTargetIndex = Math.floor(Math.random() * (n - 1 - i) + i)
        var temp = array[i]
        array[i] = array[swapTargetIndex]
        array[swapTargetIndex] = temp
    }
}