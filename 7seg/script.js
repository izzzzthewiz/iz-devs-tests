const nums = [ // Setting numbers using what is essentially JSON objects
    { a: true, b: true, c: true, d: true, e: true, f: true, g: false }, //0
    { a: false, b: true, c: true, d: false, e: false, f: false, g: false }, //1
    { a: true, b: true, c: false, d: true, e: true, f: false, g: true }, //2
    { a: true, b: true, c: true, d: true, e: false, f: false, g: true }, //3
    { a: false, b: true, c: true, d: false, e: false, f: true, g: true }, //4
    { a: true, b: false, c: true, d: true, e: false, f: true, g: true }, //5
    { a: true, b: false, c: true, d: true, e: true, f: true, g: true }, //6
    { a: true, b: true, c: true, d: false, e: false, f: false, g: false }, //7
    { a: true, b: true, c: true, d: true, e: true, f: true, g: true }, //8
    { a: true, b: true, c: true, d: true, e: false, f: true, g: true }, //9
]
function clearNums(){ // Clearing the board
    const segments = 'abcdefg'.split('') // List of div ID's
    segments.forEach(id => { // Looping through each div ID
        document.getElementById(id).classList.remove('on') // Removing the "on" class from each (so that it's no longer red)
    })
}
function setNum(num){ // Displaying a number
    const segments = nums[num] // Getting the object from the first const variable
    clearNums() // Clearing the number no matter what
    if (!segments) return // If there is no JSON object it stops (leaving the number blank)
    if (segments.a) document.getElementById('a').classList.add('on') // If "a" is true from the object, turn segment on
    if (segments.b) document.getElementById('b').classList.add('on') // .. It does this for every segment (a-g)
    if (segments.c) document.getElementById('c').classList.add('on')
    if (segments.d) document.getElementById('d').classList.add('on')
    if (segments.e) document.getElementById('e').classList.add('on')
    if (segments.f) document.getElementById('f').classList.add('on')
    if (segments.g) document.getElementById('g').classList.add('on')
}
let num = 0 // Defining the first number as 0
setInterval(function() { // Timed loop
    setNum(num) // Sets the displayed number to the num variable
    num++ // Adds 1 to the num variable for the next time this runs
    if (num >= 10) num = 0 // Sets num variable back to 0 if it exceeds 10
}, 1000) // Happens every second (1000ms)