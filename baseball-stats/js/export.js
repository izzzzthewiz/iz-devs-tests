var stats = JSON.parse(localStorage.getItem('stats'))
document.body.style.fontFamily = 'Arial, Helvetica, sans-serif'
document.querySelector('span').style.color = '#0c0'
document.querySelector('span').style.display = 'none'
document.querySelector('pre').innerText = JSON.stringify(stats, '\n', 2)
async function copy(){
    navigator.clipboard.writeText(JSON.stringify(stats, '\n', 2))
    document.querySelector('span').style.display = 'inline'
    setTimeout(function(){
        document.querySelector('span').style.display = 'none'
    }, 1500)
}
document.querySelector('button').addEventListener('click', (copy))