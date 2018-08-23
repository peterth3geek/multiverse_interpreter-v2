document.addEventListener('DOMContentLoaded', () =>{

  createForm()

  // FETCH URLs
  const baseAztroURL = `https://aztro.sameerkumar.website/`
  const userURL = 'http://localhost:3000/users'
  const readingURL = 'http://localhost:3000/readings'
  const convertedURL = 'http://localhost:3000/converteds'
  const teamURL = `http://localhost:3000/teams`

  // START ALL FETCH REQUESTS

  function getReading(sign){
    const day = 'today'
    const searchURL = baseAztroURL + `?sign=${sign}&day=${day}`
    return fetch(searchURL, {
      method: 'POST'
    })
    .then(r => r.json())
  }

  function getAllConvertedReadings(){
    return fetch(convertedURL).then(r => r.json())
  }

  function getGiphy(search){
    const gifSearch = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=RmAgqsS7izavtgXBLHLvsDmL0MAjBTF4`
    return fetch(gifSearch).then(r => r.json())
  }

  function saveUser(userOBJ){
    return fetch(userURL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(userOBJ)
    }).then(res => res.json())
  }

  function saveReading(sign, userId){
    getReading(sign).then(resp =>{
      resp.user_id = userId
      return fetch(readingURL,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(resp)
      }).then(r => r.json()).then(convertReading)
    })
  }

  function saveConvertedReading(readingObject){
    return fetch(convertedURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(readingObject)
    }).then(r => r.json())
  }

  function handleSubmit(e){
    console.log(e.target.parentElement.parentElement);
    e.preventDefault()
    const formData = e.target.parentElement.parentElement
    const formOBJ = {
      username: formData.username.value,
      sign: formData.sign.value
    }
    saveUser(formOBJ)
      .then(user => {
        saveReading(user.sign, user.id)
        return renderConvertedReadingList(user.id)

      })
  }

  function handleReadings(e){
    e.preventDefault()
    const formData = e.target.parentElement.parentElement
    const formOBJ = {
      username: formData.username.value,
      sign: formData.sign.value
    }

    saveUser(formOBJ)
      .then(user => {
        return renderConvertedReadingList(user.id)
      })
  }

  function getTeams(){
    return fetch(teamURL).then(r => r.json())
  }

  // END FETCH REQUEST BLOCK

  // Front End Data Appending

  function renderReading(reading){
      const body = document.getElementById('reading-display')
        body.classList.remove('center')
        body.innerText = ''
      const ul = document.createElement('ul')

      const team = document.createElement('li')
      const teamMotto = document.createElement('li')
      const cosmicAddress = document.createElement('li')
      const warning = document.createElement('li')
      const rundown = document.createElement('li')
      const compatibility = document.createElement('li')
      const image = document.createElement('img')

      team.innerText = reading.team.name
      teamMotto.innerText = reading.team.motto
      cosmicAddress.innerHTML = reading.universe_id
      warning.innerText = reading.time_warning
      rundown.innerText = reading.description
      compatibility.innerText = reading.compatibility
      image.src = reading.gif_url

      ul.append(image, warning, rundown, compatibility, team, teamMotto, cosmicAddress)
      body.appendChild(ul)
  }

  function createForm(){
    const navBar = document.getElementById('nav')

    const usernameDiv = document.createElement('div')
      usernameDiv.classList.add('form-group')
    const dropdownDiv = document.createElement('div')
      usernameDiv.classList.add('form-group')
    const submitDiv = document.createElement('div')
      usernameDiv.classList.add('form-group')
    const readingsDiv = document.createElement('div')
        usernameDiv.classList.add('form-group')

    const form = document.createElement('form')
      form.classList.add('form-inline')
      form.name = 'form'
    const usernameInput = document.createElement('input')
      usernameInput.type = 'TEXT'
      usernameInput.name = 'username'
      usernameInput.placeholder = 'Your Username'
      usernameInput.className = 'form-control mb-2 mr-sm-2 mb-sm-0'
    const submitBtn = document.createElement('button')
      submitBtn.innerText = 'Get Multiverse Reading'
      submitBtn.addEventListener('click', handleSubmit)
      submitBtn.className = 'btn btn-primary mr-sm-2'
    const readingsBtn = document.createElement('button')
        readingsBtn.innerText = 'All My Readings'
        readingsBtn.addEventListener('click', handleReadings)
        readingsBtn.className = 'btn btn-primary mr-sm-2'
    const signSelect = document.createElement('select')
      signSelect.name = 'sign'
      signSelect.className = 'custom-select mb-2 mr-sm-2 mb-sm-0'
    const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
      zodiacSigns.map(sign => signSelect.appendChild(new Option(sign, sign)));

    usernameDiv.appendChild(usernameInput)
    dropdownDiv.appendChild(signSelect)
    submitDiv.appendChild(submitBtn)
    readingsDiv.appendChild(readingsBtn)


    form.append(usernameDiv, dropdownDiv, submitDiv, readingsDiv)

    renderOptionButtons()
    navBar.appendChild(form)
  }

  function renderOptionButtons(){
    const navBar = document.getElementById('nav')
    const teamButton = document.createElement('button')
      teamButton.innerText = 'Octothorpe Standings'
      teamButton.className = 'btn btn-danger'
      teamButton.addEventListener('click', revealTeamStandings)
    navBar.appendChild(teamButton)

  }

  function renderConvertedReadingList(userID){
    const fullList = document.getElementById('sidebar-data')
    // fullList.classList.add('scroll-div')
    fullList.innerHTML = ''
    getAllConvertedReadings().then(list =>{
      list.sort((a,b) => b.id - a.id).forEach(reading => {
        if (reading.user.id === userID){
          // Create Card Elements
          const cardDiv = document.createElement('div')
            cardDiv.id = `user-reading${reading.id}`
            cardDiv.classList.add('card')
          const headerDiv = document.createElement('div')
            headerDiv.id = `image-${reading.id}`
            headerDiv.classList.add('card-header')
          const bodyDiv = document.createElement('div')
            bodyDiv.id = `body-${reading.id}`
            bodyDiv.classList.add('card-body')
          // Card Header Data
          const image = document.createElement('img')
          // Card Body Data
          const ul = document.createElement('ul')
          // Card List Data
          const team = document.createElement('li')
          const teamMotto = document.createElement('li')
          const cosmicAddress = document.createElement('li')
          const warning = document.createElement('li')
          const rundown = document.createElement('li')
          const compatibility = document.createElement('li')
          // Make Teams
          if (reading.team === null){
            team.innerText = "No team Assigned"
            teamMotto.innerText = ''
          } else{
            team.innerText = reading.team.name
            teamMotto.innerText = reading.team.motto
          }
          // Fill Data
          cosmicAddress.innerHTML = reading.universe_id
          warning.innerText = reading.time_warning
          rundown.innerText = reading.description
          compatibility.innerText = reading.compatibility
          image.src = reading.gif_url
          // Append Data to Sub-Body
          ul.append(warning, rundown, compatibility, team, teamMotto, cosmicAddress)
          // Append Card Data
          headerDiv.appendChild(image)
          bodyDiv.appendChild(ul)
          // Append to Card
          cardDiv.append(headerDiv, bodyDiv)
          // Append to Column
          fullList.appendChild(cardDiv)
        }
      })
    })
  }

  // THIS IS DATA CONVERSION

  function convertReading(originalReading){
    const e = originalReading
    //Time Warning Code
    let warningsArray = ["Do not be home at <time>. ", "At <time>, a metaphor could save your life. ", "At <time>, you should ask that special someone out for coffee and cherry pie. Or don't! But the stars would prefer if you did. ", "At <time>, it will be too late for good things to happen, so get on with it!", "At <time>, you will embark on a fruitful business venture!", "You are a person with a good sense of justice, and <time> will be the time to act like it. ", "At <time>, take a moment to do something just for yourself for a goddamn change. ", "At <time>, you should stop hiding your light under a basket. ", "A golden egg of opportunity falls into your lap at <time>, so don't let it break like last time. ", "Your pain is the breaking of the shell that encloses your understanding. Also, the store closes at <time>, so don't forget to buy that mug brownie for one. ", "At <time>, there will be no changes of note in your life.", `Betrayal, treason, and vile calumny will be the order of things at <time>, which you must admit, sounds a lot cooler than the light office work you’re used to.`, "At <time>, remember that just because someone puts a diving board somewhere doesn’t mean you have to jump off it. "];
    let warning = warningsArray[Math.floor(Math.random() * warningsArray.length)];
    warning = warning.replace("<time>", e.lucky_time);
    //end of Time Warning Code
    let randNum = Math.floor(Math.random()*20)
    getGiphy(e.mood).then(pic => {
       return pic.data[randNum].images.fixed_height.url
    }).then(image => {
      const teamNumber = assignTeam(e.color)
      const readingObject = {
        gif_url: image,
        team_id: teamNumber,
        universe_id: e.lucky_number,
        time_warning: warning,
        compatibility: e.compatibility,
        user_id: e.user_id,
        description: e.description
      }
      saveConvertedReading(readingObject).then(renderReading)
    })
  }


  function assignTeam(colorString){
    const newString = colorString.toLowerCase()
    let teamAssignment = 1
      switch (true) {
        case newString.includes('red'):
        teamAssignment = 2
        break;
        case newString.includes('yellow'):
        teamAssignment = 3
        break;
        case newString.includes('blue'):
         teamAssignment = 4
        break;
        case newString.includes('green'):
         teamAssignment = 5
        break;
        case newString.includes('orange'):
         teamAssignment = 6
        break;
        case newString.includes('purple'):
         teamAssignment = 7
        break;
        case newString.includes('black'):
         teamAssignment = 8
        break;
        case newString.includes('white'):
        teamAssignment = 9
        break;
      }
      return teamAssignment
  }

  function  revealTeamStandings(){
    const display = document.getElementById('reading-display')
      display.innerHTML = ''
      display.classList.add('center')
    getTeams().then(teams => {
      teams.sort((a, b) => b.converteds.length - a.converteds.length).forEach(team => {

        const teamCard = document.createElement('div')
          // teamCard.classList.add('card')
          teamCard.className = 'card octothorpe center mx-auto'

        const bodyDiv = document.createElement('div')
          bodyDiv.classList.add('card-body')
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

        headerDiv.append(teamName, teamScore)
        bodyDiv.append(teamMotto)
        teamCard.append(headerDiv, bodyDiv)
        display.appendChild(teamCard)

      })
    })
  }


})
