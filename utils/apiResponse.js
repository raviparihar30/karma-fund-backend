// utils/apiResponse.js
const apiResponse = (success, message, data, status) => {
  const response = {
    success: success,
    message: message,
  };
  if (data) {
    response.data = data;
  }
  return status ? { ...response, status } : response;
};

module.exports = apiResponse;
