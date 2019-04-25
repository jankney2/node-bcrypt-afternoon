const bcrypt= require('bcryptjs')

module.exports= {
  register: async (req, res) => {
//connect to database
let db= req.app.get('db')
//check to see if user exists in database with username 

let {isAdmin, username, password}= req.body


let users= await db.get_user(username)
let user= users[0]

//if yes, return "already registered!"
if (user){
  return res.status(409).send("username not available")
}

const salt= bcrypt.genSaltSync(10)

const hash= bcrypt.hashSync(password, salt)


 let registeredUser= await db.register_user([isAdmin, username, hash])

let newUser= registeredUser[0]

req.session.user= {
  isAdmin: newUser.is_admin,  
  id: newUser.id,  
  username: newUser.username
}

res.status(201).send(req.session.user)
//

  }
}