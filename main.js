const express = require('express')
const morgan = require('morgan')
const fortuneCookie = require('fortune-cookie')
const cors = require('cors')
const { static } = require('express')
const app = express()

const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000
app.use(morgan('combined'))
//app.use(cors())

const cookies = () => {
    const idx = Math.floor(Math.random() * fortuneCookie.length)

    return fortuneCookie[idx]
}

app.use(express.static(__dirname + "/frontend"))

app.get('/api/cookie', cors(), (req,res)=> {
    const count = parseInt(req.query['count']) || 1
    
    res.status(200)
    res.type('application/json')

    if (count == 1) {
        res.json({cookie: cookies()})
    } else {
        const c = []
        for (let i = 0; i < count; i++){
            c.push({cookie: cookies()})
        }
        res.json(c)
    }
    res.send(cookies())

    
})



app.listen(PORT, ()=> {
    console.log(`Port ${PORT} has been loaded`)
})