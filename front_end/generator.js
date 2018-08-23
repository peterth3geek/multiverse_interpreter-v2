class Generator{

  static renderConvertedReadingList(userID){
    const fullList = document.getElementById('sidebar-data')
    // fullList.classList.add('scroll-div')
    fullList.innerText = ''
    Adapter.getAllConvertedReadings().then(list =>{
      list.sort((a,b) => b.id - a.id).forEach(reading => {
        if (reading.user.id === userID){
          // Create Card Elements
          const cardDiv = document.createElement('div')
            cardDiv.dataset.id = reading.id
            cardDiv.id = `user-reading-${reading.id}`
            cardDiv.className = 'card marginal'
            // cardDiv.addEventListener('mouseover', e => console.log(e.target))
            // cardDiv.addEventListener('click', console.log)
          const headerDiv = document.createElement('div')
            headerDiv.id = `image-${reading.id}`
            headerDiv.dataset.id = reading.id
            headerDiv.classList.add('card-header')
          const bodyDiv = document.createElement('div')
            bodyDiv.dataset.id = reading.id
            bodyDiv.id = `body-${reading.id}`
            bodyDiv.classList.add('card-body')
          // Card Header Data
          const image = document.createElement('img')
            image.src = reading.gif_url

          // Card Body Data
          const ul = document.createElement('ul')
          // Card List Data
          const team = document.createElement('li')
          const teamMotto = document.createElement('li')
            if (reading.team === null){
              team.innerText = "No team Assigned"
              teamMotto.innerText = ''
            } else{
              team.innerText = reading.team.name
              teamMotto.innerText = reading.team.motto
            }
          const cosmicAddress = document.createElement('li')
            cosmicAddress.innerHTML = reading.universe_id
          const warning = document.createElement('li')
            warning.innerText = reading.time_warning
          const rundown = document.createElement('li')
            rundown.innerText = reading.description
          const compatibility = document.createElement('li')
            compatibility.innerText = reading.compatibility
          const viewBtn = document.createElement('button')
            viewBtn.innerText = "View"
            viewBtn.className = 'btn btn-info'
            viewBtn.addEventListener('click', console.log)
          const deleteBtn = document.createElement('button')
            deleteBtn.dataset.id = reading.id
            deleteBtn.innerText = 'Delete'
            deleteBtn.className = 'btn btn-danger'
            deleteBtn.addEventListener('click', Adapter.deleteReading)

          // Append Data to Sub-Body
          ul.append(warning, rundown, compatibility, team, teamMotto, cosmicAddress, viewBtn, deleteBtn)
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

  static renderReading(reading){
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

      const viewBtn = document.createElement('button')
        viewBtn.innerText = "View"
        viewBtn.className = 'btn btn-info'
        viewBtn.addEventListener('click', console.log)
      const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        deleteBtn.className = 'btn btn-danger'
        deleteBtn.addEventListener('click', console.log)

      ul.append(image, warning, rundown, compatibility, team, teamMotto, cosmicAddress, viewBtn, deleteBtn)
      body.appendChild(ul)
  }

  static  revealTeamStandings(){
    const display = document.getElementById('reading-display')
      display.innerHTML = ''
      display.classList.add('center')
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

        headerDiv.append(teamName, teamScore)
        bodyDiv.append(teamMotto)
        teamCard.append(headerDiv, bodyDiv)
        display.appendChild(teamCard)

      })
    })
  }

  static hideReading(readingID){
    const reading = document.getElementById(`user-reading-${readingID}`)
    reading.hidden = true
  }

}
