var stats = JSON.parse(localStorage.getItem('stats'))

document.getElementById('teamName').setAttribute('value', stats[0].teamName)
document.getElementById('teamImg').setAttribute('value', stats[0].teamLogo)
document.getElementById('teamColor').setAttribute('value', stats[0].teamColor)

function save(){
    let invalid = []
    if (document.getElementById('teamName').value == '') invalid.push('Team Name')
    if (document.getElementById('teamColor').value == '') {
        invalid.push('Team Color')
    } else if (getHex(document.getElementById('teamColor').value) == false) {
        invalid.push('Team Color')
    }

    if (invalid.length > 0) {
        document.getElementById('errorContainer').style.display = 'flex'
        document.getElementById('empty').innerText = invalid.join(', ')
        return
    }

    console.log(document.getElementById('teamImg'))
    stats[0].teamName = document.getElementById('teamName').value
    stats[0].teamLogo = document.getElementById('teamImg').value
    stats[0].teamColor = getHex(document.getElementById('teamColor').value)

    localStorage.setItem('stats', JSON.stringify(stats))

    location.href = './'

}
document.getElementById('save').addEventListener('click', (save))

document.getElementById('reset').addEventListener('click', function() {
    stats[0].teamName = 'Baseball Team'
    stats[0].teamLogo = '../img/logo.png'
    stats[0].teamColor = '#1e90ff'

    localStorage.setItem('stats', JSON.stringify(stats))

    location.href = './'
})

document.getElementById('close').addEventListener('click', function() {
    document.getElementById('errorContainer').style.display = 'none'
})

function getHex(hex) {
    let newhex = hex.replace('#', '')
    if (!/[0-9A-F]{3,6}$/i.test(newhex)) return false
    if (newhex.length !== 3){
        if (newhex.length !== 6){
            return false
        }
    }
    if (newhex.length == 3){
        var hexsplit = newhex.split('')
        newhex = hexsplit[0]+hexsplit[0]+hexsplit[1]+hexsplit[1]+hexsplit[2]+hexsplit[2]
    }
    return `#${newhex}`
}