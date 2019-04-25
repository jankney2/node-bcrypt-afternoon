const express= require('express')
const app= express()
require('dotenv').config()
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING}= process.env
const massive= require('massive')
const session= require('express-session')
const controller= require('./controller')
const treasureController= require('./treasureController')



app.use(express.json())

app.use(session({
  secret: SESSION_SECRET, 
  saveUninitialized: false, 
  resave: true, 
  cookie: {
    maxAge:1000*60*60*24
  }
}))

massive(CONNECTION_STRING).then((db)=>{
  app.set('db', db)

  console.log('db connection')

})

app.post('/auth/register', controller.register)
app.post('/auth/login', controller.login)
app.get('/auth/logout', controller.logout)

app.get('/api/treasure/dragon', treasureController.dragonTreasure)


app.listen(SERVER_PORT, ()=> console.log('listening on ', SERVER_PORT))







