export const formatDate = (date) => {
  const formated = new Date(date).toTimeString();
  const index = formated.lastIndexOf(":");
  return formated.slice(0, index);
};
