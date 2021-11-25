import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const books = [
    {
        id : 1,
        name: 'John Smith',
        author: 'William Smith',
    },
    {
        id : 2,
        name: 'James Smith',
        author: 'Jen Smith'
    }
]

app.use(express.json())


app.get('/books',authenToken, (req, res) => {
    res.json({ status: 'Success', data: books })
})

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})

function authenToken(req,res,next) {
    const authorizationHeader = req.headers['authorization']
    const token = authorizationHeader.split(' ')[1]
    if(!token){
        res.sendStatus(401)
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log("err, data: ", err, data);
        if(err) res.sendStatus(403)
        next()
    })
}