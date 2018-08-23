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

    const day = 'today'
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
    }).then(res => res.json())
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
    console.log(e.target.parentElement.parentElement);
    e.preventDefault()
    const formData = e.target.parentElement.parentElement
    const formOBJ = {
      username: formData.username.value,
      sign: formData.sign.value
    }
    Adapter.saveUser(formOBJ)
      .then(user => {
        currentUserId = user.id
        Adapter.saveReading(user.sign, user.id)
        return Generator.renderConvertedReadingList(user.id)

      })
  }

  static handleReadings(e){
    e.preventDefault()

    const formData = e.target.parentElement.parentElement
    const formOBJ = {
      username: formData.username.value,
      sign: formData.sign.value
    }

    Adapter.saveUser(formOBJ)
      .then(user => {
        currentUserId = user.id
        return Generator.renderConvertedReadingList(user.id)
      })
  }

  static getTeams(){
    const teamURL = `http://localhost:3000/teams`

    return fetch(teamURL).then(r => r.json())
  }

  // END FETCH REQUEST BLOCK
}
