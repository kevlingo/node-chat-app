let generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

let generateLocationMessage = (from, coords) => {
  return {
    from,
    Url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
    createdAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage,
  generateLocationMessage
};
