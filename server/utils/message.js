let generateMessage = (from, text) => {
  return {
    from,
    text,
    generatedAt: new Date().getTime()
  };
};

module.exports = {
  generateMessage
};
