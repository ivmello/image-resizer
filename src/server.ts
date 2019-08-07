import app from './app'

const PORT = process.env.PORT || 4000

app.listen(PORT, (): void => {
  console.log(`[SERVER] running on port ${PORT}`)
})
