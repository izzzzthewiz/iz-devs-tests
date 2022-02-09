//localStorage.clear()

if (localStorage.getItem('settings') == null) {
    let obj = []
    var ls = {
        username: 'User',
        bgcolor: '#ffffff',
        image: 'https://play.izzdevs.me/img/logo.png'
    }
    obj.push(ls)
    console.log('Settings created')
    localStorage.setItem('settings', JSON.stringify(obj))

}

const settings = JSON.parse(localStorage.getItem('settings'))
console.warn('Settings loaded', settings)
displayUsername()
displayBgColor()
displayImage()

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


// Username

function getUsername(){
    return settings[0].username
}

function displayUsername() {
    document.querySelector('#usernamedisplay pre').textContent = getUsername()
}

const changeName = (ev) => {
    ev.preventDefault()
    let username = document.getElementById('username').value
    if (username == '') {
        document.querySelector('span[for="username"]').innerText = 'Required'
    } else {
        document.querySelector('span[for="username"]').innerText = null
        document.forms[0].reset()
        settings[0].username = username
        localStorage.setItem('settings', JSON.stringify(settings))
        displayUsername()
        console.warn('Settings updated', settings)
    }
}
document.getElementById('usernamebtn').addEventListener('click', changeName)


// Background color
function getBgColor(){
    return settings[0].bgcolor
}

function displayBgColor(){
    document.body.style.backgroundColor = getBgColor()
    document.querySelector('#bgcolordisplay pre').textContent = getBgColor()
}

const changeBgColor = (ev) => {
    ev.preventDefault()
    let bgcolor = document.getElementById('bgcolor').value
    if (bgcolor == '') {
        document.querySelector('span[for="bgcolor"]').innerText = "Required"
    } else if (getHex(bgcolor) == false){
        document.querySelector('span[for="bgcolor"]').innerText = "Invalid hex"
    } else {
        document.querySelector('span[for="bgcolor"]').innerText = null
        document.forms[1].reset()
        settings[0].bgcolor = getHex(bgcolor)
        localStorage.setItem('settings', JSON.stringify(settings))
        displayBgColor()
        console.warn('Settings updated', settings)
    }
}
document.getElementById('bgcolorbtn').addEventListener('click', changeBgColor)


// Image
function getImage(){
    return settings[0].image
}

function displayImage(){
    document.querySelector('#imagedisplay pre').innerHTML = `<img src="${getImage()}" height="150">`
}

const changeImage = (ev) => {
    ev.preventDefault()
    let image = document.getElementById('image').value
    if (image == '') {
        document.querySelector('span[for="image"]').innerText = "Required"
    } else {
        document.querySelector('span[for="image"]').innerText = null
        document.forms[2].reset()
        settings[0].image = image
        localStorage.setItem('settings', JSON.stringify(settings))
        displayImage()
        console.warn('Settings updated', settings)
    }
}
document.getElementById('imagebtn').addEventListener('click', changeImage)