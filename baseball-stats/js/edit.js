var stats = JSON.parse(localStorage.getItem('stats'))

document.getElementById('firstName').setAttribute('value', stats[0].firstName)
document.getElementById('lastName').setAttribute('value', stats[0].lastName)
document.getElementById('number').setAttribute('value', stats[0].number)
document.getElementById('img').setAttribute('value', stats[0].img)
document.getElementById('gamesPlayed').setAttribute('value', stats[0].gamesPlayed)
document.getElementById('atBats').setAttribute('value', stats[0].atBats)
document.getElementById('hits').setAttribute('value', stats[0].hits)
document.getElementById('doubles').setAttribute('value', stats[0].doubles)
document.getElementById('triples').setAttribute('value', stats[0].triples)
document.getElementById('homeRuns').setAttribute('value', stats[0].homeRuns)
document.getElementById('walks').setAttribute('value', stats[0].walks)
document.getElementById('sacrifices').setAttribute('value', stats[0].sacrifices)
document.getElementById('runs').setAttribute('value', stats[0].runs)
document.getElementById('runsBattedIn').setAttribute('value', stats[0].runsBattedIn)
document.getElementById('steals').setAttribute('value', stats[0].steals)
document.getElementById('caughtStealing').setAttribute('value', stats[0].caughtStealing)

function save(){
    let invalid = []
    if (document.getElementById('firstName').value == '') invalid.push('First Name')
    if (document.getElementById('lastName').value == '') invalid.push('Last Name')
    if (document.getElementById('number').value == '') invalid.push('Number')
    if (document.getElementById('img').value == '') invalid.push('Player Image')
    if (document.getElementById('gamesPlayed').value == '' || document.getElementById('gamesPlayed').value < 0) invalid.push('GP')
    if (document.getElementById('atBats').value == '' || document.getElementById('atBats').value < 0) invalid.push('AB')
    if (document.getElementById('hits').value == '' || document.getElementById('hits').value < 0) invalid.push('H')
    if (document.getElementById('doubles').value == '' || document.getElementById('doubles').value < 0) invalid.push('2B')
    if (document.getElementById('triples').value == '' || document.getElementById('triples').value < 0) invalid.push('3B')
    if (document.getElementById('homeRuns').value == '' || document.getElementById('homeRuns').value < 0) invalid.push('HR')
    if (document.getElementById('walks').value == '' || document.getElementById('walks').value < 0) invalid.push('BB')
    if (document.getElementById('sacrifices').value == '' || document.getElementById('sacrifices').value < 0) invalid.push('SH')
    if (document.getElementById('runs').value == '' || document.getElementById('runs').value < 0) invalid.push('R')
    if (document.getElementById('runsBattedIn').value == '' || document.getElementById('runsBattedIn').value < 0) invalid.push('RBI')
    if (document.getElementById('steals').value == '' || document.getElementById('steals').value < 0) invalid.push('S')
    if (document.getElementById('caughtStealing').value == '' || document.getElementById('caughtStealing').value < 0) invalid.push('CS')

    if (invalid.length > 0) {
        document.getElementById('errorContainer').style.display = 'flex'
        document.getElementById('empty').innerText = invalid.join(', ')
        return
    }

    stats[0].firstName = document.getElementById('firstName').value
    stats[0].lastName = document.getElementById('lastName').value
    stats[0].number = document.getElementById('number').value
    stats[0].img = document.getElementById('img').value
    stats[0].gamesPlayed = document.getElementById('gamesPlayed').value
    stats[0].atBats = document.getElementById('atBats').value
    stats[0].hits = document.getElementById('hits').value
    stats[0].doubles = document.getElementById('doubles').value
    stats[0].triples = document.getElementById('triples').value
    stats[0].homeRuns = document.getElementById('homeRuns').value
    stats[0].walks = document.getElementById('walks').value
    stats[0].sacrifices = document.getElementById('sacrifices').value
    stats[0].runs = document.getElementById('runs').value
    stats[0].runsBattedIn = document.getElementById('runsBattedIn').value
    stats[0].steals = document.getElementById('steals').value
    stats[0].caughtStealing = document.getElementById('caughtStealing').value

    localStorage.setItem('stats', JSON.stringify(stats))

    location.href = './'
}

document.getElementById('save').addEventListener('click', (save))

document.getElementById('close').addEventListener('click', function() {
    document.getElementById('errorContainer').style.display = 'none'
})

document.getElementById('reset').addEventListener('click', function(){
    stats[0].gamesPlayed = 0
    stats[0].atBats = 0
    stats[0].hits = 0
    stats[0].doubles = 0
    stats[0].triples = 0
    stats[0].homeRuns = 0
    stats[0].walks = 0
    stats[0].sacrifices = 0
    stats[0].runs = 0
    stats[0].runsBattedIn = 0
    stats[0].steals = 0
    stats[0].caughtStealing = 0
    localStorage.setItem('stats', JSON.stringify(stats))
    location.href = './'
})