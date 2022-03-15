const LOCAL_STORAGE = 'timePunch'
const DEFAULT_LS = {
  punchedIn: false,
  punches: [],
  rate: 10
}

let editing = 0

function duoNum(n){
  if (n >= 10) return n
  return `0${n}`
}

function getCurrentTime(){
  const now = new Date()

  let hours = now.getHours()
  let tod = 'AM'
  if (hours >= 12) tod = 'PM'
  if (hours > 12) hours = hours - 12
  if (hours === 0) hours = 12

  return `${hours}:${duoNum(now.getMinutes())}:${duoNum(now.getSeconds())} ${tod}`
}

function getHours(n1, n2){
  return (n2-n1)/1000/60/60
}

function getTotalHours(){
  const ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
  const punches = ls.punches
  let num = 0
  let prev
  let total = 0
  punches.map((punch) => {
    num++
    if ((num === 1)){
      prev = punch.time
    }
    if (num === 2){
      total = total + (punch.time - prev)
      num = 0
    }
  })
  return (total / 1000 / 60 / 60).toFixed(2)
}

window.addEventListener('load', () => {
  
  // Local Storage
  if (!localStorage.getItem(LOCAL_STORAGE)) localStorage.setItem(LOCAL_STORAGE, JSON.stringify(DEFAULT_LS))

  // Interval
  const time = document.getElementById('time')
  const date = document.getElementById('date')
  const punched = document.getElementById('punched')
  const punches = document.getElementById('punches')
  const hours = document.getElementById('hours')
  const pay = document.getElementById('pay')
  const rate = document.getElementById('rate')

  setInterval(() => {
    // Time
    time.innerText = `Current Time: ${getCurrentTime()}`

    // Date
    const current = new Date()
    date.innerText = `Current Date: ${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`
    
    // Punched in
    let ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    if (ls.punchedIn === true) {
      punched.classList.remove('text-danger')
      punched.classList.add('text-success')
      punched.innerText = 'Punched in'
    } else {
      punched.classList.add('text-danger')
      punched.classList.remove('text-success')
      punched.innerText = 'Punched out'
    }

    // Punches display
    var html = []
    var num = -1
    ls.punches.map((punch) => {
      num++
      const time = new Date(punch.time)
      if (punch.punchType === 'in') html.push(`
      <div class="d-flex outline-dark p-1" style="margin-top: 1px">
        <div class="w-40">
          <p class="text-success">Punch in</p>
        </div>
        <div class="w-60 d-flex justify-content-end">
          <p class="text-info">${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()} ${punch.timeDisplay}</p>
          <button class="btn-link" -data-edit punch="${num}" style="margin-left: 0.5rem">Edit</button>
        </div>
      </div>
      `)
      if (punch.punchType === 'out') html.push(`
        <div class="d-flex outline-dark p-1" style="margin-top: 1px">
          <div class="w-20 d-flex align-items-center">
            <p class="text-danger">Punch out</p>
          </div>
          <div class="w-20 d-flex align-items-center">
            <p class="text-dark">Hours: ${getHours(ls.punches[num-1].time, punch.time).toFixed(2)}</p>
          </div>
          <div class="w-60 d-flex justify-content-end">
            <p class="text-info">${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()} ${punch.timeDisplay}</p>
            <button class="btn-link" -data-edit punch="${num}" style="margin-left: 0.5rem">Edit</button>
          </div>
        </div>
      `)
    })
    punches.innerHTML = html.join('')

    // Total Hours
    hours.innerText = `Total hours: ${getTotalHours()}`

    // Pay
    pay.innerText = `$${(getTotalHours() * ls.rate).toFixed(2)}`

    // Edit
    document.querySelectorAll('[-data-edit]').forEach((punch) => {
      const punchNum = parseInt(punch.getAttribute('punch'))
      punch.addEventListener(('click'), () => {
        let ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
        setEditing(punchNum)
        const hour = parseInt(ls.punches[punchNum].timeDisplay.split(':')[0])
        const minute = parseInt(ls.punches[punchNum].timeDisplay.split(':')[1])
        const second = parseInt(ls.punches[punchNum].timeDisplay.split(':')[2].split(' ')[0])
        const tod = ls.punches[punchNum].timeDisplay.split(':')[2].split(' ')[1]
        document.getElementById('hour').value = hour
        document.getElementById('minute').value = minute
        document.getElementById('second').value = second
        document.getElementById('tod').value = tod
      })
    })
  }, 100)

  // Punch In
  const punchin = document.getElementById('punch-in')
  punchin.addEventListener('click', (e) => {
    e.preventDefault()

    const now = new Date()

    let ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    
    if (ls.punchedIn === true) return alert('You are already punched in!')

    ls.punchedIn = true
    ls.punches.push({
      punchType: 'in',
      time: now.getTime(),
      timeDisplay: getCurrentTime()
    })
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(ls))

    console.log(`%cPunched in at ${getCurrentTime()}`, 'color: #007ff6')
    alert(`Punched in at ${getCurrentTime()}`)
  })
  
  // Punch Out
  const punchout = document.getElementById('punch-out')
  punchout.addEventListener('click', (e) => {
    e.preventDefault()

    const now = new Date()

    let ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    
    if (ls.punchedIn === false) return alert('You are not punched in!')

    ls.punchedIn = false
    ls.punches.push({
      punchType: 'out',
      time: now.getTime(),
      timeDisplay: getCurrentTime()
    })
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(ls))
    
    console.log(`%cPunched out at ${getCurrentTime()}`, 'color: #e13247')
    alert(`Punched out at ${getCurrentTime()}`)
  })

  // Reset
  const reset = document.getElementById('reset')
  reset.addEventListener('click', (e) => {
    e.preventDefault()

    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(DEFAULT_LS))
  })

  // Edit Modal
  const modal = document.getElementById('modal')
  function setEditing(num){
    editing = num
    if (num === -1) return modal.style.display = 'none'
    modal.style.display = 'block'
  }

  // Save Modal
  const save = document.getElementById('save')
  save.addEventListener('click', () => {
    let ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    let date = new Date(ls.punches[editing].time)
    let newDate = new Date(`
      ${date.getMonth()+1}/
      ${date.getDate()}/
      ${date.getFullYear()} 
      ${duoNum(document.getElementById('hour').value)}:
      ${duoNum(document.getElementById('minute').value)}:
      ${duoNum(document.getElementById('second').value)} 
      ${document.getElementById('tod').value}
    `)
    ls.punches[editing].time = newDate.getTime()
    ls.punches[editing].timeDisplay = `${duoNum(document.getElementById('hour').value)}:${duoNum(document.getElementById('minute').value)}:${duoNum(document.getElementById('second').value)} ${document.getElementById('tod').value}`
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(ls))
    setEditing(-1)
  })

  // Close Modal
  const closeModal = document.getElementById('closeModal')
  closeModal.addEventListener('click', () => {
    setEditing(-1)
  })

  // Rate
  let ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
  rate.value = ls.rate

  rate.addEventListener('change', (e) => {
    let ls = JSON.parse(localStorage.getItem(LOCAL_STORAGE))
    ls.rate = e.target.value
    localStorage.setItem(LOCAL_STORAGE, JSON.stringify(ls))
  })

})