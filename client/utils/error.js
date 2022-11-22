export const handleError = (error) => {
  let errorMessage;

  if (error?.response?.data?.message[0]?.msg) {
    errorMessage = error?.response?.data?.message[0]?.msg;
  } else if (error?.response?.data?.message) {
    errorMessage = error?.response.data?.message;
  } else {
    errorMessage = "Something went wrong";
  }

  return errorMessage;
};
