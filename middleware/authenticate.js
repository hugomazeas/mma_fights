const passport = require('passport');
const public_paths = [
  '/',
  '/api/navbar_item',
  '/authentification/login',
  '/authentification/check_token',
]
const authenticate = (req, res, next) => {
  return next(); // remove this line to enable authentication

  if (req.method === 'GET' && public_paths.includes(req.path))
    return next();
  else if (req.method === 'POST' && req.path === '/authentification/login')
    return next();

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      if (req.xhr) {
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
        console.log('User not authenticated, redirecting to login page');
        return res.redirect('/authentification/login');
      }
    }
    next();
  })(req, res, next);
};


module.exports = authenticate;