document.addEventListener('DOMContentLoaded', () =>{

  // console.log("Hello!");

  const baseAztroURL = `https://aztro.sameerkumar.website/`

  function getReading(sign, day){
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

  renderReading('leo', 'tomorrow')

  function renderReading(sign, day){
    getReading(sign, day).then(reading => {
      const body = document.getElementById('document-body')
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
        ul.append(image, color, luckyNumber, luckyTime, mood, rundown)
        body.append(ul)
      })

    })
  }

})
