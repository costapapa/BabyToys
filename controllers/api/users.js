const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

// Create jwt using jwt.sign
// send it back to the user using res.json
async function create(req, res) {
  console.log('HIT CREATE ROUTE')
    try {
      // Add the user to the database
      const user = await User.create(req.body);
      // token will be a string
      const token = createJWT(user);
    //   console.log(res.json(token))
      // Yes, we can use res.json to send back just a string
      // The client code needs to take this into consideration
      return res.json(token);
    } catch (err) {
      // Client will check for non-2xx status code 
      // 400 = Bad Request
      console.log(err)
      res.status(401).json(err);
    }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}

module.exports = {
    create,
    login,
    checkToken,
    getUserDetails
}

async function getUserDetails(req, res){
  try{
    console.log(req.params)
    const user = await User.findOne({_id: req.params.id})
    console.log(user)
    res.json(user)
  } catch(error) {
    console.log('Error Getting User Details', error)
  }
}

function checkToken(req, res) {
  console.log('req-user', req.user)
  console.log('req exp', req.exp)
  res.json(req.exp)
}

function createJWT(user) {
    return jwt.sign(
      // extra data for the payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
}

