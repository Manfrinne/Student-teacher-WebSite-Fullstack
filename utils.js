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
    let today = new Date(timestamp) 
    let dd = today.getDate() 
    let mm = today.getMonth()+1 
    let yyyy = today.getFullYear() 

    if (dd < 10) {
        dd = `0${dd}` 
    } 

    if (mm < 10) {
        mm = `0${mm}` 
    } 

    today = `${dd}/${mm}/${yyyy}` 

    return today 
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

  dateBirth: function dateBirth(timestamp) {
    let today = new Date(timestamp) 
    let dd = today.getDate() 
    let mm = today.getMonth()+1 
    let yyyy = today.getFullYear() 

    if (dd < 10) {
        dd = `0${dd}` 
    } 

    if (mm < 10) {
        mm = `0${mm}` 
    } 

    today = `${yyyy}-${mm}-${dd}` //return do tipo 'ISO'

    return today 
  },
} 
