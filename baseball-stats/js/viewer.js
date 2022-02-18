var stats = JSON.parse(localStorage.getItem('stats'))

var playerImage = stats[0].img
var teamColor = stats[0].teamColor

function display(color){
    document.querySelectorAll('.statscontainer ul').forEach(ul => {
        ul.style.borderColor = color
    })
    document.querySelector('.img').style.outlineColor = color
}
display(teamColor)

function displayImage(){
    document.getElementById('playerImage').setAttribute('src', playerImage)
}
displayImage()

document.getElementById('playerName').innerText = `${stats[0].firstName} ${stats[0].lastName}`
document.getElementById('playerNumber').innerText = `#${stats[0].number}`
document.getElementById('team').innerText = stats[0].teamName
document.getElementById('gamesPlayed').innerText = stats[0].gamesPlayed
document.getElementById('atBats').innerText = stats[0].atBats
document.getElementById('hits').innerText = stats[0].hits
document.getElementById('doubles').innerText = stats[0].doubles
document.getElementById('triples').innerText = stats[0].triples
document.getElementById('homeRuns').innerText = stats[0].homeRuns
document.getElementById('walks').innerText = stats[0].walks
document.getElementById('sacrifices').innerText = stats[0].sacrifices
document.getElementById('runs').innerText = stats[0].runs
document.getElementById('runsBattedIn').innerText = stats[0].runsBattedIn
document.getElementById('steals').innerText = stats[0].steals
document.getElementById('caughtStealing').innerText = stats[0].caughtStealing
document.getElementById('battingAverage').innerText = getAverage()
document.getElementById('onBase').innerText = getOBP()
document.getElementById('slugging').innerText = getSLG()

function getAverage(){
    var avg = (stats[0].hits / stats[0].atBats).toFixed(3)
    if (avg == 'NaN') {
        return '.000'
    } else if (avg < 1) {
        var split = avg.split('.')
        return `.${split[1]}`
    } else return avg
}

function getOBP(){
    var obp = ((parseInt(stats[0].hits) + parseInt(stats[0].walks)) / (parseInt(stats[0].atBats) + parseInt(stats[0].walks) + parseInt(stats[0].sacrifices))).toFixed(3)
    if (obp == 'NaN') {
        return '.000'
    } else if (obp < 1) {
        var split = obp.split('.')
        return `.${split[1]}`
    } else return obp
}

function getSLG(){
    var slg = (((stats[0].hits - stats[0].doubles - stats[0].triples - stats[0].homeRuns) + (stats[0].doubles * 2) + (stats[0].triples * 3) + (stats[0].homeRuns * 4)) / stats[0].atBats).toFixed(3)
    if (slg == 'NaN') {
        return '.000'
    } else if (slg < 1) {
        var split = slg.split('.')
        return `.${split[1]}`
    } else return slg
}