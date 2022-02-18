function checkStats(reset){
    if (reset == true){
        localStorage.removeItem('stats')
    }
    let obj = []
    var ls = {
        teamName: 'Baseball Team',
        teamLogo: '../img/logo.png',
        teamColor: '#1e90ff',
        firstName: 'Player',
        lastName: 'Name',
        number: 0,
        img: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
        gamesPlayed: 0,
        atBats: 0,
        hits: 0,
        doubles: 0,
        triples: 0,
        homeRuns: 0,
        walks: 0,
        sacrifices: 0,
        runs: 0,
        runsBattedIn: 0,
        steals: 0,
        caughtStealing: 0
    }
    obj.push(ls)
    if (localStorage.getItem('stats') == null) {
        console.log('%cStats created', 'color: #0c0')
        localStorage.setItem('stats', JSON.stringify(obj))
    } else {
        console.log('%cStats loaded', 'color: #0c0')
    }
    setTimeout(function() {
        console.log(JSON.parse(localStorage.getItem('stats')))
    }, 10)
}
checkStats(false)