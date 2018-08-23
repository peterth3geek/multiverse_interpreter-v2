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
            cardDiv.className = `card marginal`
            // cardDiv.addEventListener('mouseover', e => console.log(e.target))
            // cardDiv.addEventListener('click', console.log)
          const headerDiv = document.createElement('div')
            headerDiv.id = `image-${reading.id}`
            headerDiv.dataset.id = reading.id

          const bodyDiv = document.createElement('div')
            bodyDiv.dataset.id = reading.id
            bodyDiv.id = `body-${reading.id}`
            bodyDiv.classList.add('card-body')
          // Card Header Data
          const image = document.createElement('img')
            image.src = reading.gif_url
            image.className = 'fit-gif'
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
          // Card Body Data
          const ul = document.createElement('ul')
          ul.style = 'font-size: 0.8rem;'
          // Card List Data

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
            cosmicAddress.innerHTML = reading.universe_id.split("<br>")[0]
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
          // ul.append(warning, rundown, compatibility, team, teamMotto, cosmicAddress, viewBtn, deleteBtn)
          ul.append(team, cosmicAddress, viewBtn, deleteBtn)
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
    console.log(reading);
      const body = document.getElementById('reading-display')
        body.className = 'center'
        body.innerText = ''
      const ul = document.createElement('ul')

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
      const image = document.createElement('img')
      image.className = "large-gif"

      team.innerText = reading.team.name
      teamMotto.innerText = reading.team.motto
      cosmicAddress.innerHTML = reading.universe_id
      warning.innerText = reading.time_warning
      rundown.innerText = reading.description
      compatibility.innerText = reading.compatibility
      image.src = reading.gif_url

      // const viewBtn = document.createElement('button')
      //   viewBtn.innerText = "View"
      //   viewBtn.className = 'btn btn-info'
      //   viewBtn.addEventListener('click', console.log)
      const deleteBtn = document.createElement('button')
        deleteBtn.dataset.id = reading.id
        deleteBtn.id = 'delReading'
        deleteBtn.innerText = 'Delete'
        deleteBtn.className = 'btn btn-danger'
        deleteBtn.addEventListener('click', Adapter.deleteReading)
        deleteBtn.addEventListener('click', function () { body.innerText = '' })


      ul.append(image, warning, rundown, compatibility, team, teamMotto, cosmicAddress, deleteBtn)
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
