class Adapter {
  // FETCH URLs
  // const baseAztroURL = `https://aztro.sameerkumar.website/`
  // const userURL = 'http://localhost:3000/users'
  // const readingURL = 'http://localhost:3000/readings'
  // const convertedURL = 'http://localhost:3000/converteds'
  // const teamURL = `http://localhost:3000/teams`

  // START ALL FETCH REQUESTS

  static getReading(sign){
    const baseAztroURL = `https://aztro.sameerkumar.website/`
    let randNum = Math.floor(Math.random()*3)

    let day = ''

    switch(randNum){
      case 0:
        day = 'yesterday'
      break;
      case 1:
        day = 'tomorrow'
      break;
      case 2:
        day = 'today'
      break;
    }

    const searchURL = baseAztroURL + `?sign=${sign}&day=${day}`
    return fetch(searchURL, {
      method: 'POST'
    })
    .then(r => r.json())
  }

  static getAllConvertedReadings(){
    const convertedURL = 'http://localhost:3000/converteds'

    return fetch(convertedURL).then(r => r.json())
  }

  static getGiphy(search){
    const gifSearch = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=RmAgqsS7izavtgXBLHLvsDmL0MAjBTF4`
    return fetch(gifSearch).then(r => r.json())
  }

  static saveUser(userOBJ){
    const userURL = 'http://localhost:3000/users'
    return fetch(userURL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(userOBJ)
    }).then(res => {
      return res.json().then(r => {
        if (typeof r.username === 'object'){
          const theAlert = document.getElementById('validation-alert')
          r.username.forEach(error =>{
            theAlert.innerText = `Your username ${error}`
          })
          theAlert.hidden = false
      } else {
        return r
      }
    })
  })
  }

  static saveReading(sign, userId){
    const readingURL = 'http://localhost:3000/readings'

    Adapter.getReading(sign).then(resp =>{
      resp.user_id = userId
      return fetch(readingURL,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(resp)
      }).then(r => r.json()).then(Converter.convertReading)
    })
  }

  static saveConvertedReading(readingObject){
    const convertedURL = 'http://localhost:3000/converteds'

    return fetch(convertedURL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(readingObject)
    }).then(r => r.json())
  }

  static handleSubmit(e){

    e.preventDefault()
    const theAlert = document.getElementById('validation-alert')
      theAlert.hidden = true
    const sideBar = document.getElementById('sidebar-data')
    const formData = e.target.parentElement.parentElement
    const formOBJ = {
      username: formData.username.value,
      sign: formData.sign.value
    }
    Adapter.saveUser(formOBJ)
      .then(user => {
        Adapter.saveReading(user.sign, user.id)
      //   if(sideBar.childElementCount === 0 ){
      //   return Generator.renderConvertedReadingList(user.id)
      // }
      })
  }

  static handleReadings(e){
    e.preventDefault()
    const theAlert = document.getElementById('validation-alert')
      theAlert.hidden = true
    const formData = e.target.parentElement.parentElement

    const formOBJ = {
      username: formData.username.value,
      sign: formData.sign.value
    }

    Adapter.saveUser(formOBJ)
      .then(user => {
        // currentUserId = user.id
        return Generator.renderConvertedReadingList(user.id)
      })
  }

  static getTeams(){
    const teamURL = `http://localhost:3000/teams`

    return fetch(teamURL).then(r => r.json())
  }

  static deleteReading(e){
    const readingID = e.target.dataset.id
    const convertedURL = 'http://localhost:3000/converteds'
    //Delete main display if needed
    // Optimistically Render
    Generator.hideReading(readingID)
    let displayId = document.getElementById('delReading')
    if ((displayId != null) && (displayId.getAttribute("data-id"))===(readingID)) {
    document.getElementById('reading-display').innerText = ''
  }
    return fetch(`${convertedURL}/${readingID}`, {
      method: 'DELETE'
    })
  }

  static getUsers(){
    const userURL = 'http://localhost:3000/users'

    return fetch(userURL).then(r => r.json())
  }

  static viewReading(e){
    const readingID = e.target.dataset.id
    const convertedURL = 'http://localhost:3000/converteds'
    return fetch(`${convertedURL}/${readingID}`).then(r => r.json()).then(Generator.renderReading)
  }

  // END FETCH REQUEST BLOCK
}
