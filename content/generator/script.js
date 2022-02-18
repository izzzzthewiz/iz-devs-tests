const title = document.getElementById('title')
const creator = document.getElementById('creator')
const url = document.getElementById('url')
const generate = document.getElementById('generate')
const generated = document.getElementById('generated');
const preview = document.querySelector('#preview pre')
const copy = document.getElementById('copy');
let json

async function loadJSON(url){
    const json = await (await fetch(url)).json().catch(e => console.error(e))
    preview.innerText = JSON.stringify(json, '\n', 2)
}
loadJSON('./api/videos.json')

function getJSON(){
    const json = preview.innerText
    return JSON.parse(json)
}

generate.addEventListener('click', (e) => {
    e.preventDefault()
    title.style.border = '2px solid #0040AE'
    creator.style.border = '2px solid #0040AE'
    url.style.border = '2px solid #0040AE'
    let invalid = false
    if (title.value == '') invalid = true, title.style.border = '2px solid #d00'
    if (creator.value == '') invalid = true, creator.style.border = '2px solid #d00'
    if (url.value == '') invalid = true, url.style.border = '2px solid #d00'
    if (invalid == true) return

    json = getJSON()
    let newObj = {
        title: title.value,
        creator: creator.value,
        url: url.value
    }
    json.push(newObj)
    preview.innerText = JSON.stringify(json, '\n', 2)
    document.forms[0].reset()
    title.style.border = '2px solid #0040AE'
    creator.style.border = '2px solid #0040AE'
    url.style.border = '2px solid #0040AE'
    generate.style.backgroundColor = '#0a0'
    generate.style.border = '2px solid #0a0'
    generate.innerText = 'Generated'
    setTimeout(function() {
        generate.style.backgroundColor = '#0040AE'
        generate.style.border = '2px solid #0040AE'
        generate.innerText = 'Generate'
    }, 3000)
})

copy.addEventListener('click', async () => {
    await navigator.clipboard.writeText(preview.innerText)
    copy.style.backgroundColor = '#0a0'
    copy.style.border = '2px solid #0a0'
    copy.innerText = 'Copied'
    setTimeout(function() {
        copy.style.backgroundColor = '#0040AE'
        copy.style.border = '2px solid #0040AE'
        copy.innerText = 'Copy'
    }, 3000)
})