class Generator{

  static renderAllConvertedReadingList(userID){
    const fullList = document.getElementById('sidebar-data')
    // fullList.classList.add('scroll-div')
    fullList.innerText = ''

    const sideBarCard = document.createElement('div')
      sideBarCard.className = 'card card-header-1 center marginal micro-padding'
    const sideBarCardHead = document.createElement('div')
      sideBarCardHead.classList.add('card-header')
    const sideBarLabel = document.createElement('h3')
      sideBarLabel.innerHTML = 'Previous<br>Interpretations'
      sideBarLabel.className = 'sidebar-text'
      sideBarCardHead.appendChild(sideBarLabel)
      sideBarCard.appendChild(sideBarCardHead)
      fullList.appendChild(sideBarCard)

    const scrollingDiv = document.createElement('div')
      scrollingDiv.className = 'scroll-div'
      scrollingDiv.style = 'font-size: 0.8rem;'
      scrollingDiv.id = 'scrollingSideBar'


      fullList.appendChild(scrollingDiv)
    Adapter.getAllConvertedReadings().then(list =>{
      list.forEach(reading => { Generator.renderSideReading(reading)
      })
    })
  }

  static renderConvertedReadingList(userID){
    const fullList = document.getElementById('sidebar-data')
      fullList.innerText = ''
    const sideBarCard = document.createElement('div')
      sideBarCard.className = 'card card-header-1 center marginal micro-padding'
    const sideBarCardHead = document.createElement('div')
      sideBarCardHead.classList.add('card-header')
    const sideBarLabel = document.createElement('h3')
      sideBarLabel.innerHTML = 'Previous<br>Interpretations'
      sideBarLabel.className = 'sidebar-text'
      sideBarCardHead.appendChild(sideBarLabel)
      sideBarCard.appendChild(sideBarCardHead)
      fullList.appendChild(sideBarCard)

    const scrollingDiv = document.createElement('div')
      scrollingDiv.className = 'scroll-div'
      scrollingDiv.style = 'font-size: 0.8rem;'
      scrollingDiv.id = 'scrollingSideBar'

      fullList.appendChild(scrollingDiv)

    Adapter.getAllConvertedReadings().then(list =>{
      list.sort((a,b) => b.id - a.id).forEach(reading => {
        if (reading.user.id === userID){
          Generator.renderSideReading(reading)
        }
      })
    })
  }

  static renderSideReading(reading) {
    const cardDiv = document.createElement('div')
      cardDiv.dataset.id = reading.id
      cardDiv.id = `user-reading-${reading.id}`
      cardDiv.className = `card marginal`
    const headerDiv = document.createElement('div')
      headerDiv.id = `image-${reading.id}`
      headerDiv.dataset.id = reading.id

    const bodyDiv = document.createElement('div')
      bodyDiv.dataset.id = reading.id
      bodyDiv.id = `body-${reading.id}`
      bodyDiv.classList.add('card-body')
    // Card Header Data
    const nameAndSign = document.createElement('p')
      nameAndSign.className = 'name-p'
    const image = document.createElement('img')
      image.src = reading.gif_url
      image.className = 'fit-gif'
    const createdAt = document.createElement('p')
      createdAt.className = 'createdAt-p'
    const team = document.createElement('p')
      team.className = 'team-p'
    const teamMotto = document.createElement('p')
      teamMotto.className = 'team-p'
    const cosmicAddress = document.createElement('p')
      cosmicAddress.className = 'cosmic-A'
    const warning = document.createElement('p')
      warning.className = 'warning-p'
    const rundown = document.createElement('p')
      rundown.className = 'rundown-p'
    const compatibility = document.createElement('p')
      compatibility.className = 'comp-p'

      if (reading.team === null){
        team.innerText = "No team Assigned"
        teamMotto.innerText = ''
        headerDiv.className = `card-header card-header-1`
        bodyDiv.className = `card-header card-header-1`

      } else{
        team.innerText = reading.team.name
        teamMotto.innerText = reading.team.motto
        headerDiv.className = `card-header card-header-${reading.team.id}`
        bodyDiv.className = `card-header card-header-${reading.team.id}`

      }
      nameAndSign.innerHTML = `<b>${reading.user.username}</b>, ${reading.user.sign}`
      cosmicAddress.innerHTML = reading.universe_id.split("<br>")[0]
      let createdAtDate = new Date(reading.created_at)
      createdAt.innerHTML = `
      ${createdAtDate.toDateString()}, ${createdAtDate.toLocaleTimeString()}
      `
      warning.innerText = reading.time_warning
      rundown.innerText = reading.description
      compatibility.innerText = reading.compatibility

    const viewBtn = document.createElement('button')
      viewBtn.dataset.id = reading.id
      viewBtn.innerText = "View"
      viewBtn.className = 'btn btn-info'
      viewBtn.addEventListener('click', Adapter.viewReading)
    const deleteBtn = document.createElement('button')
      deleteBtn.dataset.id = reading.id
      deleteBtn.innerText = 'Delete'
      deleteBtn.className = 'btn btn-danger'
      deleteBtn.addEventListener('click', Adapter.deleteReading)

    // Append Data to Sub-Body
    bodyDiv.append(createdAt, team, cosmicAddress, viewBtn, deleteBtn)
    // Append Card Data
    headerDiv.appendChild(image)
    // Append to Card
    cardDiv.append(headerDiv, bodyDiv)
    // Append to Column
    document.getElementById('scrollingSideBar').appendChild(cardDiv)
  }



  static renderReading(reading){
      const body = document.getElementById('reading-display')
        body.className = `center card card-header-${reading.team.id} micro-margin scroll-div-main`
        body.innerText = ''
      const bigDiv = document.createElement('div')
        bigDiv.className = 'card'
        bigDiv.id = `user-reading-${reading.id}`
      const ul = document.createElement('div')
        ul.className = `card-body`

      //Create elements
      const nameAndSign = document.createElement('p')
        nameAndSign.className = 'name-p'
      const team = document.createElement('p')
        team.className = 'team-p'
      const teamMotto = document.createElement('p')
        teamMotto.className = 'team-p'
      const cosmicAddress = document.createElement('p')
        cosmicAddress.className = 'cosmic-A'
      const warning = document.createElement('p')
        warning.className = 'warning-p'
      const rundown = document.createElement('p')
        rundown.className = 'rundown-p'
      const compatibility = document.createElement('p')
        compatibility.className = 'comp-p'
        compatibility.id = 'currentCompat'
        compatibility.dataset.id = reading.compatibility
      const image = document.createElement('img')
        image.className = "large-gif"

      //Add data
      nameAndSign.innerHTML = `<b>${reading.user.username}</b>, ${reading.user.sign}`
      team.innerHTML = `<b>Team name: </b>${reading.team.name}<br>
      "${reading.team.motto}"
      `
      teamMotto.innerText = `"${reading.team.motto}"`
      cosmicAddress.innerHTML = `<b>Cosmic Address:</b><br>${reading.universe_id}`
      warning.innerHTML = `<b>Your Fortune:</b> ${reading.time_warning}`
      rundown.innerHTML = `<b>Your Horoscope:</b> ${reading.description}`
      compatibility.innerHTML = `<b>Compatibility: </b>${reading.compatibility}`
      compatibility.addEventListener('DOMContentLoaded', Generator.getCompats)
      image.src = reading.gif_url

      const deleteBtn = document.createElement('button')
        deleteBtn.dataset.id = reading.id
        deleteBtn.id = 'delReading'
        deleteBtn.innerText = 'Delete'
        deleteBtn.className = 'btn btn-danger'
        deleteBtn.addEventListener('click', Adapter.deleteReading)
        deleteBtn.addEventListener('click', () => {
          body.innerHTML = ''
          return Generator.revealTeamStandings()
        })

      ul.append(nameAndSign, image, warning, rundown, compatibility, team, cosmicAddress, deleteBtn)
      body.appendChild(ul)
      Generator.getCompats(reading.user.id);
  }

  static  revealTeamStandings(){
    const display = document.getElementById('reading-display')
      display.innerHTML = ''
      display.className = 'center'
    const otherDiv = document.createElement('div')
      otherDiv.className = 'scroll-div-2'
    const titleCard = document.createElement('div')
      titleCard.className = 'center card-header-1 card octothorpe card-title mx-auto'
    const cardHeader = document.createElement('h1')
      cardHeader.innerText = 'Galactic Octothorpe Standings'

    Adapter.getTeams().then(teams => {
      teams.sort((a, b) => b.converteds.length - a.converteds.length).forEach(team => {

        const teamCard = document.createElement('div')
          // teamCard.classList.add('card')
          teamCard.className = 'card octothorpe center mx-auto'
          teamCard.dataset.id = team.id

        const bodyDiv = document.createElement('div')
          bodyDiv.className = 'card-body motto-body'
        const headerDiv = document.createElement('div')
          headerDiv.classList.add(`card-header-${team.id}`)

        const teamName = document.createElement('h2')
          teamName.innerText= `${team.name}`
          teamName.classList.add('card-title')
          teamName.classList.add('center')
        const teamMotto = document.createElement('p')
          teamMotto.innerText = team.motto
          teamMotto.classList.add('card-text')
        const teamScore = document.createElement('h5')
          teamScore.innerText = `Pledges: ${team.converteds.length}`

          titleCard.appendChild(cardHeader)
          display.appendChild(titleCard)
        headerDiv.append(teamName, teamScore)
        bodyDiv.append(teamMotto)
        teamCard.append(headerDiv, bodyDiv)
        otherDiv.appendChild(teamCard)
        display.appendChild(otherDiv)

      })
    })
  }

  static hideReading(readingID){
    const reading = document.getElementById(`user-reading-${readingID}`)
    const body = document.getElementById('reading-display')
    const childCount = body.childElementCount

    if (null){
      Generator.revealTeamStandings()
    } else if (reading){
      reading.hidden = true
    }
    else {
      body.className = 'center'
    }
  //   if (childCount >= 2 || childCount <= 0){
  //   Generator.revealTeamStandings()
  // }
  }

  static getCompats(id) {
    let currentUser = id
    let compatSignDiv = document.getElementById('currentCompat')
    let compatSign = compatSignDiv.getAttribute("data-id").slice(1)
    let compatHTML = ""
    Adapter.getUsers().then(users => {
      users.forEach(user => {
        if ((!(currentUser == user.id)) && (compatSign == user.sign)) {
          compatSignDiv.innerHTML += `<br>${user.username} is a match!`
        }
      })
      // return compatHTML;
    })
  }
}
