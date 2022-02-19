var stats = JSON.parse(localStorage.getItem('stats'))

document.body.style.fontFamily = 'Arial, Helvetica, sans-serif'
document.querySelector('span').style.color = '#0c0'
document.querySelector('span').style.display = 'none'

function displayJSON(){
    const url = `${window.location}`
    const split = url.split('?json=')
    if (!split[1]) return document.querySelector('pre').innerText = JSON.stringify(stats, '\n', 2)
    
    json = split[1].replaceAll('%22', '"')
    json = json.replaceAll('%23', '#')
    json = json.replaceAll('%5B', '[')
    json = json.replaceAll('%5D', ']')
    json = json.replaceAll('%7B', '{')
    json = json.replaceAll('%7D', '}')
    json = json.replaceAll('%3A', ':')
    json = json.replaceAll('%2C', ',')
    json = json.replaceAll('%20', ' ')

    json = JSON.parse(json)
    value = JSON.stringify(json, '\n', 2)
    document.querySelector('pre').innerText = value
}
displayJSON()

async function copy(){
    navigator.clipboard.writeText(document.querySelector('pre').innerText)
    document.querySelector('span').style.display = 'inline'
    setTimeout(function(){
        document.querySelector('span').style.display = 'none'
    }, 1500)
}
document.querySelector('button').addEventListener('click', (copy))