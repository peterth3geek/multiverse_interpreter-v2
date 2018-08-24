document.addEventListener('DOMContentLoaded', welcome)


  function welcome(){
    const displayArea = document.getElementById('reading-display')
    displayArea.className = 'center row h-100 justify-content-center align-items-center'
    const welcomeCard = document.createElement('div')
      welcomeCard.className = 'card card-header-1 form-group welcome-card marginal micro-padding'
    const welcomeHeader = document.createElement('div')
    const welcomeBody = document.createElement('div')

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
    const submitBtn = document.createElement('button')
      submitBtn.innerText = 'Get Multiverse Reading'
      submitBtn.addEventListener('click', Adapter.handleSubmitWelcome)
      submitBtn.className = 'btn btn-primary mr-sm-2 micro-margin'
    const signSelect = document.createElement('select')
      const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
      signSelect.name = 'sign'
      signSelect.className = 'custom-select form-control-lg mb-2 mr-sm-2 mb-sm-0'
      zodiacSigns.map(sign => signSelect.appendChild(new Option(sign, sign)));
    const readingsBtn = document.createElement('button')
      readingsBtn.innerText = 'All My Readings'
      readingsBtn.addEventListener('click', Adapter.handleReadingsWelcome)
      readingsBtn.className = 'btn btn-primary mr-sm-2'

    form.append(usernameInput, signSelect, submitBtn, readingsBtn)
    welcomeBody.appendChild(form)
    welcomeCard.append(welcomeHeader, welcomeBody)
    displayArea.appendChild(welcomeCard)

    Generator.renderAllConvertedReadingList()
    return createForm()

  }



  function createForm(){
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
      usernameInput.placeholder = 'Your Username'
      usernameInput.className = 'form-control mb-2 mr-sm-2 mb-sm-0'
    const submitBtn = document.createElement('button')
      submitBtn.innerText = 'Get Multiverse Reading'
      submitBtn.addEventListener('click', Adapter.handleSubmit)
      submitBtn.className = 'btn btn-primary mr-sm-2 micro-margin'
    const signSelect = document.createElement('select')
      const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
      signSelect.name = 'sign'
      signSelect.className = 'custom-select mb-2 mr-sm-2 mb-sm-0'
      zodiacSigns.map(sign => signSelect.appendChild(new Option(sign, sign)));
    const readingsBtn = document.createElement('button')
      readingsBtn.innerText = 'All My Readings'
      readingsBtn.addEventListener('click', Adapter.handleReadings)
      readingsBtn.className = 'btn btn-primary mr-sm-2'

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
      teamButton.addEventListener('click', Generator.revealTeamStandings)

    navBar.append(teamButton)

  }
