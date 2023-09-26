function calculateBMR(desiredWeight, height, birthday, sex, levelActivity) {
  let bmr = 0;

  const activityLevelFactor = {
    1: 1.2,
    2: 1.375,
    3: 1.55,
    4: 1.725,
    5: 1.9,
  };

  const sexData = {
    male: { factor: 5 },
    female: { factor: -161 },
  };

  const bdDate = new Date(birthday);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - bdDate.getFullYear();

  if (sex === 'male') {
    bmr =
      (10 * desiredWeight + 6.25 * height - 5 * age + sexData.male.factor) *
      activityLevelFactor[levelActivity];
    return Math.round(bmr);
  } else if (sex === 'female') {
    bmr =
      (10 * desiredWeight + 6.25 * height - 5 * age + sexData.female.factor) *
      activityLevelFactor[levelActivity];
    return Math.round(bmr);
  } else {
    throw new Error('Невірно вказана стать повинно бути "male" або "female');
  }
}

module.exports = calculateBMR;
