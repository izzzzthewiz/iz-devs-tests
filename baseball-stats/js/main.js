var stats = JSON.parse(localStorage.getItem('stats'))

var teamColor = stats[0].teamColor

function updateColor(color){
    document.querySelector('.nav').style.backgroundColor = color
    document.querySelectorAll('.nav a').forEach(e => {
        e.style.borderBottomColor = color
        e.style.borderTopColor = color
    })
    document.querySelector('.nav a.active').style.borderBottomColor = 'rgba(255, 255, 255, 0.5)'
    document.querySelectorAll('.body h1').forEach(h1 => {
        h1.style.color = color
    })
    if (!stats[0].teamLogo) return
    document.getElementById('teamLogo').setAttribute('src', stats[0].teamLogo)
}
updateColor(teamColor)
