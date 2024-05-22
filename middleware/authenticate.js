const passport = require('passport');
const public_paths = [
  '/',
  '/api/navbar_items',
  '/authentification/login',
]
const authenticate = (req, res, next) => {
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
    // User is logged in, continue with the next middleware
    next();
  })(req, res, next);
};


module.exports = authenticate;