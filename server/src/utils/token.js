const jwt = require('jsonwebtoken');

async function getToken(req) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error('No token provided');
  }
  const [, token] = authorization.split(' ');
  if (!token) {
    throw new Error('No token provided');
  }
  return token;
}

async function getUser(req) {
  const token = await getToken(req);
  const { id } = jwt.verify(token, 'omeusegredoe...');
  console.log(id);
  return id;
}

module.exports = { getToken, getUser };