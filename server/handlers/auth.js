const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const axios = require('axios');

// code from auth0 example documetation
exports.verifyJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://mipe.eu.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://mipe.eu.auth0.com/`,
  algorithms: ['RS256']
});

// set the user's email and apikey so it can be by controllers
exports.getAuth0Profile = async (req, res, next) => {
  try {
    const response = await axios({
      url:`https://mipe.eu.auth0.com/api/v2/users/${req.user.sub}`,
      headers: {'authorization': `Bearer ${process.env.AUTH0_KEY}`},  
    })
    req.user.email = response.data.email;
    req.user.ghApiKey = response.data.identities[0].access_token;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}