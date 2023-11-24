// const express = require('express')
import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import { UserRoutes } from './app/modules/user/user.route'
// import { StudentRoute } from './app/modules/student/student.route'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// application router
app.use('/api', UserRoutes)


app.get('/api', (req: Request, res: Response) => {
  res.send('Mongoose Express CRUD Mastery')
})

export default app
