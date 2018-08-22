document.addEventListener('DOMContentLoaded', () =>{

  // console.log("Hello!");

  const baseAztroURL = `https://aztro.sameerkumar.website/`
  const USERURL = 'http://localhost:3000/users'

  function getReading(sign){
    const day = 'tomorrow'
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
    return fetch(USERURL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(userOBJ)
    })
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
        luckyNumber.innerText = reading.lucky_number
        compatibility.innerText = reading.compatibility
        luckyTime.innerText = reading.lucky_time
        mood.innerText = reading.mood
        rundown.innerText = reading.description
        console.log(reading);
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
    renderReading(formOBJ.sign)
    saveUser(formOBJ).then(console.log)
  }


})
