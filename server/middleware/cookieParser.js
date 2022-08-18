const parseCookies = (req, res, next) => {
  const cookieString = req.headers.cookie;
  if (cookieString === undefined) {
    req.cookies = {};
  } else {
    let pairs = cookieString.split(';');
    let splitPairs = pairs.map(cookieString => cookieString.split('='));
    let cookieObj = {};

    splitPairs.forEach((cookie) => {
      cookieObj[cookie[0].trim()] = cookie[1];
    });
    req.cookies = cookieObj;
  }
  next();
};

module.exports = parseCookies;