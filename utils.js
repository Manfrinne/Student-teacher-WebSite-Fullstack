module.exports = {
  age: function age(timestamp) {
    const today = new Date();
    const birthDay = new Date(timestamp);

    let age = today.getFullYear() - birthDay.getFullYear();
    const month = birthDay.getMonth();

    if (month >= today.getMonth() && today.getDay() < birthDay.getDay()) {
      age = age - 1;
    };

    return age;
  }
};



