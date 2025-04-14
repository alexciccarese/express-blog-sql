const notFound = (req, res, next) => {
  res.status(404).json({
    error: '404 not found',
    message: "Pagina non trovata"
  });
}

module.exports = notFound;