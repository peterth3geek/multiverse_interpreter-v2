class Converter {
  // THIS IS DATA CONVERSION

  static convertReading(originalReading){
    const e = originalReading
    //Time Warning Code
    let warningsArray = ["Do not be home at <time>. ", "At <time>, a metaphor could save your life. ", "At <time>, you should ask that special someone out for coffee and cherry pie. Or don't! But the stars would prefer if you did. ", "At <time>, it will be too late for good things to happen, so get on with it!", "At <time>, you will embark on a fruitful business venture!", "You are a person with a good sense of justice, and <time> will be the time to act like it. ", "At <time>, take a moment to do something just for yourself for a goddamn change. ", "At <time>, you should stop hiding your light under a basket. ", "A golden egg of opportunity falls into your lap at <time>, so don't let it break like last time. ", "Your pain is the breaking of the shell that encloses your understanding. Also, the store closes at <time>, so don't forget to buy that mug brownie for one. ", "At <time>, there will be no changes of note in your life.", `Betrayal, treason, and vile calumny will be the order of things at <time>, which you must admit, sounds a lot cooler than the light office work you’re used to.`, "At <time>, remember that just because someone puts a diving board somewhere doesn’t mean you have to jump off it. "];
    let warning = warningsArray[Math.floor(Math.random() * warningsArray.length)];
    warning = warning.replace("<time>", e.lucky_time);
    //end of Time Warning Code
    let randNum = Math.floor(Math.random()*20)
    Adapter.getGiphy(e.mood).then(pic => {
       return pic.data[randNum].images.fixed_height.url
    }).then(image => {
      const teamNumber = Converter.assignTeam(e.color)
      const readingObject = {
        gif_url: image,
        team_id: teamNumber,
        universe_id: e.lucky_number,
        time_warning: warning,
        compatibility: e.compatibility,
        user_id: e.user_id,
        description: e.description
      }
      Adapter.saveConvertedReading(readingObject).then(Generator.renderReading)
    })
  }


  static assignTeam(colorString){
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
}
