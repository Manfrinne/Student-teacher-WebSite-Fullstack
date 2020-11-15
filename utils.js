module.exports = {
  age: function age(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
        age = age - 1
    }

    return age
  },

  date: function date(timestamp) {
    const date = new Date(timestamp)
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2) 

    return {
      iso:`${year}-${month}-${day}`,
      birthDay: `${day}/${month}`
    }
  },

  academic_level: function academic_level(srt) {
    if (srt === "university") {
      srt = "Ensino Superior Completo"
    } 
    if (srt === "masters") {
      srt = "Mestrado Completo"
    } 
    if (srt === "doctorate") {
      srt = "Doutorado Completo"
    } 

    return srt 
  },
  grade: function grade(srt) {
    if (srt === "5EF") {
      srt = "5º Ano do Ensino Fundamental"
    }
    if (srt === "6EF") {
      srt = "6º Ano do Ensino Fundamental"
    } 
    if (srt === "7EF") {
      srt = "7º Ano do Ensino Fundamental"
    } 
    if (srt === "8EF") {
      srt = "8º Ano do Ensino Fundamental"
    }
    if (srt === "9EF") {
      srt = "9º Ano do Ensino Fundamental"
    }
    if (srt === "1EM") {
      srt = "1º Ano do Ensino Médio"
    }
    if (srt === "2EM") {
      srt = "2º Ano do Ensino Médio"
    }
    if (srt === "3EM") {
      srt = "3º Ano do Ensino Médio"
    }
    
    return srt 
  }
} 
