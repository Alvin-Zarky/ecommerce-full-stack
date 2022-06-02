const bcrypjs= require('bcryptjs')

const users= [
  {
    name:"Alvin",
    email: "Alvin@gmail.com",
    password: bcrypjs.hashSync('123456', 10),
    isAdmin:true   
  },
  {
    name: "Yago",
    email: "Yago@gmail.com",
    password: bcrypjs.hashSync('123456', 10)
  },
  {
    name:"Sofia",
    email: "Sofia@gmail.com",
    password: bcrypjs.hashSync('123456', 10)
  },
  {
    name: "Devil",
    email: "Devil@gmail.com",
    password: bcrypjs.hashSync('123456', 10)
  }
]

module.exports= users