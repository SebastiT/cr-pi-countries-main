
export const validate = (activity) => {
  const newErrors = {}
  if (!activity.name) {
    newErrors.name = "Activity name is required"
  }
  if (activity.name.length > 30 || activity.name.length < 5) {
    newErrors.name =
      "The name of the activity must have between 5 and 30 characters";
  }
  if (!activity.difficulty) {
    newErrors.difficulty = "Difficulty level is required"
  }
  if (!activity.duration) {
    newErrors.duration = "Activity duration is required"
  }
  if (activity.duration > 24 || activity.duration < 1) {
    newErrors.duration =
      "The duration of the activity must be between 1 to 24 hours";
  }
  if (!activity.season) {
        newErrors.season = "Activity season is required";
  }
  if (activity.countriesId.length === 0) {
    newErrors.countriesId = "Country/Countries is required"
  }
  return newErrors;
}