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
        team.innerHTML = `Team: <b>${reading.team.name}</b>`
        teamMotto.innerText = reading.team.motto
        headerDiv.className = `card-header card-header-${reading.team.id}`
        bodyDiv.className = `card-header card-header-${reading.team.id}`

      }
      nameAndSign.innerHTML = `User: <b>${reading.user.username}</b>, <i>${reading.user.sign}</i>`
      cosmicAddress.innerHTML = `Cosmic Location: <b>${reading.universe_id.split("<br>")[0]}</b>`
      let createdAtDate = new Date(reading.created_at)
      createdAt.innerHTML = `Created at:
      <b>${createdAtDate.toDateString()}, ${createdAtDate.toLocaleTimeString()}</b>
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
    bodyDiv.append(nameAndSign, createdAt, team, cosmicAddress, viewBtn, deleteBtn)
    // Append Card Data
    headerDiv.appendChild(image)
    // Append to Card
    cardDiv.append(headerDiv, bodyDiv)
    // Append to Column
    document.getElementById('scrollingSideBar').appendChild(cardDiv)
  }



  static renderReading(reading){
    Adapter.viewRawReading(reading.id).then(raw =>{
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
      const mood = document.createElement('p')
        mood.className = 'cosmic-A'
      const compatibility = document.createElement('p')
        compatibility.className = 'comp-p'
        compatibility.id = 'currentCompat'
        compatibility.dataset.id = reading.compatibility
      const image = document.createElement('img')
        image.className = "large-gif"

      //Add data
      nameAndSign.innerHTML = `User: <b>${reading.user.username}</b>, ${reading.user.sign}`
      team.innerHTML = `<b>Team name: </b>${reading.team.name}<br>
      "${reading.team.motto}"
      `
      teamMotto.innerText = `"${reading.team.motto}"`
      cosmicAddress.innerHTML = `<b>Cosmic Address:</b><br>${reading.universe_id}`
      warning.innerHTML = `<b>Your Fortune:</b> ${reading.time_warning}`
      rundown.innerHTML = `<b>Your Horoscope:</b> ${reading.description}`
      mood.innerHTML = `<b>Mood:</b> ${raw.mood}`
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

      ul.append(nameAndSign, image, mood, warning, rundown, compatibility, team, cosmicAddress, deleteBtn)
      body.appendChild(ul)
      Generator.getCompats(reading.user.id);

    })

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
      const e = ''

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
    if (document.getElementById('navUserInput').value != "") {
      return Adapter.handleReadings()
    }
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

  static welcome(){
    const navBar = document.getElementById('nav')
    navBar.innerText = ''
    const logoArea = document.createElement('a')
      logoArea.id = 'multiverse-logo'
      logoArea.className = 'navbar-brand logo-text'
      logoArea.innerText = 'Multiverse Interpreter'
      navBar.appendChild(logoArea)
    const displayArea = document.getElementById('reading-display')
    displayArea.innerText = ''
    displayArea.className = 'center row h-100 justify-content-center align-items-center'
    const welcomeCard = document.createElement('div')
      welcomeCard.className = 'card card-header-1 form-group welcome-card marginal micro-padding center justify-content-center align-items-center'
    const welcomeHeader = document.createElement('div')
    const welcomeBody = document.createElement('div')
    const logo = document.getElementById('multiverse-logo')
      logo.addEventListener('click', Generator.welcome)
    const welcomePhrase = document.createElement('h2')
      welcomePhrase.innerText = 'Welcome to the Multiverse'
      welcomePhrase.className = 'welcome-text'
      welcomeHeader.appendChild(welcomePhrase)

    const form = document.createElement('form')
      // form.className =
      form.name = 'form'
    const usernameInput = document.createElement('input')
      usernameInput.type = 'text'
      usernameInput.size = 50
      usernameInput.name = 'username'
      usernameInput.placeholder = 'Create or Submit Your Username'
      usernameInput.className = 'form-control-lg micro-margin'
      usernameInput.addEventListener('blur', Adapter.signAutoFind)
    const submitBtn = document.createElement('button')
      submitBtn.innerText = 'Get Multiverse Reading'
      submitBtn.addEventListener('click', Adapter.handleSubmitWelcome)
      submitBtn.className = 'btn btn-primary mr-sm-2 micro-margin'
    const signSelect = document.createElement('select')
      const zodiacSigns = {Aries: '(March 21-April 19)', Taurus: '(April 20-May 20)', Gemini: '(May 21-June 20)', Cancer: '(June 21-July 22)', Leo: '(July 23-August 22)', Virgo: '(August 23-September 22)', Libra: '(September 23-October 22)', Scorpio: '(October 23-November 21)', Sagittarius: '(November 22-December 21)', Capricorn: '(December 22-January 19)', Aquarius: '(January 20 to February 18)', Pisces: '(February 19 to March 20)'}
      signSelect.name = 'sign'
      signSelect.id = 'welcomeSignSelect'
      signSelect.className = 'custom-select form-control-lg'
      Object.entries(zodiacSigns).map((key) => {
        return signSelect.appendChild(new Option(`${key[0]} - ${key[1]}`, key[0]))
      });
    const readingsBtn = document.createElement('button')
      readingsBtn.innerText = 'All My Readings'
      readingsBtn.addEventListener('click', Adapter.handleReadingsWelcome)
      readingsBtn.className = 'btn btn-primary mr-sm-2'

    form.append(usernameInput, signSelect, submitBtn, readingsBtn)
    welcomeBody.appendChild(form)
    welcomeCard.append(welcomeHeader, welcomeBody)
    displayArea.appendChild(welcomeCard)

    Generator.renderAllConvertedReadingList()
    return Generator.createForm()

  }



  static createForm(){
    const navBar = document.getElementById('nav')
    const theAlert = document.getElementById('validation-alert')

    if (theAlert){
        theAlert.hidden = true
    }

    const usernameDiv = document.createElement('div')
      usernameDiv.classList.add('form-group')
    const dropdownDiv = document.createElement('div')
      usernameDiv.classList.add('form-group')
    const submitDiv = document.createElement('div')
      usernameDiv.classList.add('form-group')
    const readingsDiv = document.createElement('div')

    const form = document.createElement('form')
      form.classList.add('form-inline')
      form.name = 'form'
      form.id = 'navbar-form'
    const usernameInput = document.createElement('input')
      usernameInput.type = 'TEXT'
      usernameInput.name = 'username'
      usernameInput.id = 'navUserInput'
      usernameInput.placeholder = 'Your Username'
      usernameInput.className = 'form-control mb-2 mr-sm-2 mb-sm-0'
      usernameInput.addEventListener('blur', Adapter.signAutoFind)
    const submitBtn = document.createElement('button')
      submitBtn.innerText = 'Get Multiverse Reading'
      submitBtn.addEventListener('click', Adapter.handleSubmit)
      submitBtn.className = 'btn btn-primary mr-sm-2 micro-margin'
    const signSelect = document.createElement('select')
      const zodiacSigns = {Aries: '(March 21-April 19)', Taurus: '(April 20-May 20)', Gemini: '(May 21-June 20)', Cancer: '(June 21-July 22)', Leo: '(July 23-August 22)', Virgo: '(August 23-September 22)', Libra: '(September 23-October 22)', Scorpio: '(October 23-November 21)', Sagittarius: '(November 22-December 21)', Capricorn: '(December 22-January 19)', Aquarius: '(January 20 to February 18)', Pisces: '(February 19 to March 20)'}
      signSelect.name = 'sign'
      signSelect.id = 'navSignSelect'

      signSelect.className = 'custom-select mb-2 mr-sm-2 mb-sm-0'
      Object.entries(zodiacSigns).map((key) => {
        return signSelect.appendChild(new Option(`${key[0]} - ${key[1]}`, key[0]))
      });
    const readingsBtn = document.createElement('button')
      readingsBtn.innerText = 'All My Readings'
      readingsBtn.addEventListener('click', Adapter.handleReadings)
      readingsBtn.className = 'btn btn-primary mr-sm-2'

    usernameDiv.appendChild(usernameInput)
    dropdownDiv.appendChild(signSelect)
    submitDiv.appendChild(submitBtn)
    readingsDiv.appendChild(readingsBtn)

    form.append(usernameDiv, dropdownDiv, submitDiv, readingsDiv)

    Generator.renderOptionButtons()
    navBar.appendChild(form)

  }

  static renderOptionButtons(){
    const navBar = document.getElementById('nav')
    const teamButton = document.createElement('button')
      teamButton.innerText = 'Octothorpe Standings'
      teamButton.className = 'btn btn-danger'
      teamButton.addEventListener('click', Generator.revealTeamStandings)

    navBar.append(teamButton)

  }


}
