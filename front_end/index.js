document.addEventListener('DOMContentLoaded', () =>{


  const baseAztroURL = `https://aztro.sameerkumar.website/`
  const userURL = 'http://localhost:3000/users'
  const readingURL = 'http://localhost:3000/readings'
  const convertedURL = 'http://localhost:3000/converteds'

  function getReading(sign){
    const day = 'today'
    const searchURL = baseAztroURL + `?sign=${sign}&day=${day}`
    return fetch(searchURL, {
      method: 'POST'
    })
    .then(r => r.json())
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

  createForm()

  function renderReading(sign){
    getReading(sign).then(reading => {
      const body = document.getElementById('reading-display')
      body.innerText = ''

      const ul = document.createElement('ul')
      const color = document.createElement('li')
      const luckyNumber = document.createElement('li')
      const luckyTime = document.createElement('li')
      const mood = document.createElement('li')
      const rundown = document.createElement('li')
      const compatibility = document.createElement('li')
      const image = document.createElement('img')
      let randNum = Math.floor(Math.random()*25)
      getGiphy(reading.mood).then(e => {
        image.src = e.data[randNum].images.fixed_height.url
        color.innerText = reading.color
        luckyNumber.innerText = `Lucky Number: ${reading.lucky_number}`
        compatibility.innerText = reading.compatibility
        luckyTime.innerText = reading.lucky_time
        mood.innerText = reading.mood
        rundown.innerText = reading.description
        ul.append(image, color, luckyNumber, luckyTime, mood, rundown, compatibility)
        body.append(ul)
      })

    })
  }

  function createForm(){
    const formBar = document.getElementById('form-bar')
    const form = document.createElement('form')
    const usernameInput = document.createElement('input')
    const signInput = document.createElement('input')
    const submitBtn = document.createElement('button')

    form.name = 'form'

    usernameInput.type = 'TEXT'
    usernameInput.name = 'username'
    usernameInput.placeholder = 'girrafe barf'
    form.appendChild(usernameInput)

    signInput.type = 'TEXT'
    signInput.name = 'sign'
    signInput.placeholder = 'Leo bitches'
    form.appendChild(signInput)

    submitBtn.innerText = 'Submit Bitches'
    submitBtn.addEventListener('click', handleSubmit)
    form.appendChild(submitBtn)

    formBar.appendChild(form)

  }

  function handleSubmit(e){
    e.preventDefault()
    const formData = e.target.parentElement
    const formOBJ = {
      username: formData.username.value,
      sign: formData.sign.value
    }
    // renderReading(formOBJ.sign)
    saveUser(formOBJ)
      .then(user => {
        saveReading(user.sign, user.id)
      })
      renderReading(formOBJ.sign)

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



  function convertReading(e){
    //Time Warning Code
    let warningsArray = ["Do not be home at <time>. ", "At <time>, a metaphor could save your life. ", "At <time>, you should ask that special someone out for coffee and cherry pie. Or don't! But the stars would prefer if you did. ", "At <time>, it will be too late for good things to happen, so get on with it!", "At <time>, you will embark on a fruitful business venture!", "You are a person with a good sense of justice, and <time> will be the time to act like it. ", "At <time>, take a moment to do something just for yourself for a goddamn change. ", "At <time>, you should stop hiding your light under a basket. ", "A golden egg of opportunity falls into your lap at <time>, so don't let it break like last time. ", "Your pain is the breaking of the shell that encloses your understanding. Also, the store closes at <time>, so don't forget to buy that mug brownie for one. ", "At <time>, there will be no changes of note in your life.", "At <time>, remember that just because someone puts a diving board somewhere doesn’t mean you have to jump off it. ", "Betrayal, treason, and vile calumny will be the order of things at <time>, which you must admit, sounds a lot cooler than the light office work you’re used to. "];
    let warning = warningsArray[Math.floor(Math.random() * warningsArray.length)];
    warning = warning.replace("<time>", e.lucky_time);
    //end of Time Warning Code
    let randNum = Math.floor(Math.random()*25)
    getGiphy(e.mood).then(pic => {
      const image = pic.data[randNum].images.fixed_height.url
      const teamNumber = assignTeam(e.color)
    return fetch(convertedURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        gif_url: image,
        team: teamNumber,
        universe_id: e.lucky_number,
        time_warning: warning,
        compatibility: e.compatibility,
        user_id: e.user_id,
        description: e.description
      })
    }).then(console.log)
  })}

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
  }

})
