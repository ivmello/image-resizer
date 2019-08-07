import app from './app'

require('dotenv').config()

const PORT = process.env.APP_PORT || 5000

app.listen(PORT, (): void => {
  console.log(`[SERVER] running on port ${PORT}`)
})
