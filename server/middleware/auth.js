const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length === 0) {
    models.Sessions.create()
      .then((result) => {
        models.Sessions.get({id: result.insertId})
          .then((session) => {
            req.session = {hash: session.hash};
            res.cookie('shortlyid', session.hash);
            next();
          });
      });
  } else {
    var currentHash = req.cookies[Object.keys(req.cookies)[0]];
    models.Sessions.get({hash: currentHash})
      .then((currentSession) => {
        req.session = {hash: currentSession.hash};
        if (!currentSession) {
          req.session.user = currentSession.user;
          req.session.userId = currentSession.user.id;
          next();
        } else {
          models.Sessions.create()
            .then((result) => {
              models.Sessions.get({id: result.insertId})
                .then((sessions) => {
                  req.session = {hash: sessions.hash};
                  res.cookie('shortlyid', sessions.hash);
                  next();
                });
            });
        }
      });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

