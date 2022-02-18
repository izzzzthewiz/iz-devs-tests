var stats = JSON.parse(localStorage.getItem('stats'))
document.body.style.fontFamily = 'Arial, Helvetica, sans-serif'
document.querySelector('span').style.color = '#0c0'
document.querySelector('span').style.display = 'none'
async function save(){
    let newJson
    try {
        newJson = JSON.parse(document.getElementById('input').value)
    } catch {
        return error()
    }
    if (!newJson[0].teamName) return error()
    if (!newJson[0].teamLogo) return error()
    if (!newJson[0].teamColor || getHex(newJson[0].teamColor) == false) return error()
    if (!newJson[0].firstName) return error()
    if (!newJson[0].lastName) return error()
    if (!newJson[0].number == 0 && !newJson[0].number) return error()
    if (!newJson[0].img) return error()
    if (!newJson[0].gamesPlayed == 0 && !newJson[0].gamesPlayed) return error()
    if (!newJson[0].atBats == 0 && !newJson[0].atBats) return error()
    if (!newJson[0].hits == 0 && !newJson[0].hits) return error()
    if (!newJson[0].doubles == 0 && !newJson[0].doubles) return error()
    if (!newJson[0].triples == 0 && !newJson[0].triples) return error()
    if (!newJson[0].homeRuns == 0 && !newJson[0].homeRuns) return error()
    if (!newJson[0].walks == 0 && !newJson[0].walks) return error()
    if (!newJson[0].sacrifices == 0 && !newJson[0].sacrifices) return error()
    if (!newJson[0].runs == 0 && !newJson[0].runs) return error()
    if (!newJson[0].runsBattedIn == 0 && !newJson[0].runsBattedIn) return error()
    if (!newJson[0].steals == 0 && !newJson[0].steals) return error()
    if (!newJson[0].caughtStealing == 0 && !newJson[0].caughtStealing) return error()

    localStorage.setItem('stats', JSON.stringify(newJson))
    
    document.querySelector('span').style.display = 'inline'
    setTimeout(function(){
        document.querySelector('span').style.display = 'none'
    }, 1500)
}
document.querySelector('button').addEventListener('click', (save))

function error(){
    document.querySelector('span').innerText = 'Error'
    document.querySelector('span').style.color = '#c00'
    document.querySelector('span').style.display = 'inline'
    setTimeout(function(){
        document.querySelector('span').innerText = 'Saved'
    document.querySelector('span').style.color = '#0c0'
    document.querySelector('span').style.display = 'none'
    }, 1500)
}

function getHex(hex) {
    let newhex = hex.replace('#', '')
    if (!/[0-9A-F]{3,6}$/i.test(newhex)) return false
    if (newhex.length == 3){
        if (newhex.length == 6){
            return false
        }
    }
    if (newhex.length == 3){
        var hexsplit = newhex.split('')
        newhex = hexsplit[0]+hexsplit[0]+hexsplit[1]+hexsplit[1]+hexsplit[2]+hexsplit[2]
    }
    return `#${newhex}`
}