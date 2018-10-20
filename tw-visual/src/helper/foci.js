export function getCurrencyMap(currencies, centerX, centerY, r){
    var fociResult = getFoci(currencies.length, centerX, centerY, r)
    var colors = getColors(currencies.length)
    shuffleFociResult(fociResult)
    shuffle(colors)
    var currencyMap = {}
    currencies.forEach((currency, i) => {
        currencyMap[currency] = {
            x: fociResult.foci[i].x,
            y: fociResult.foci[i].y,
            color: colors[i],
            labelX: fociResult.labelCoordinates[i].x,
            labelY: fociResult.labelCoordinates[i].y
        }
    })
    return currencyMap
}

export function getFoci(n, centerX, centerY, r){
    let center = { x: centerX, y: centerY }
    var result = {
        foci: [],
        labelCoordinates: []
    }
    for (var i = 0; i < n; i++) {
        result.foci.push({
            x: center.x + r * Math.cos((2*i*Math.PI)/n),
            y: center.y + r * Math.sin((2*i*Math.PI)/n)
        })
        result.labelCoordinates.push({
            x: center.x + (1.4 * r) * Math.cos((2*i*Math.PI)/n),
            y: center.y + (1.4 * r) * Math.sin((2*i*Math.PI)/n)
        })
    }
    return result
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

function shuffleFociResult(result) {
    let n = result.foci.length
    for (var i = 0; i < n; i++) {
        var swapTargetIndex = Math.floor(Math.random() * (n - 1 - i) + i)
        var tempFocus = result.foci[i]
        var tempLabelCoordinate = result.labelCoordinates[i]
        result.foci[i] = result.foci[swapTargetIndex]
        result.foci[swapTargetIndex] = tempFocus
        result.labelCoordinates[i] = result.labelCoordinates[swapTargetIndex]
        result.labelCoordinates[swapTargetIndex] = tempLabelCoordinate
    }
}