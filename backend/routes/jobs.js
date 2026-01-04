const express = require('express')
const router = express.Router()

router.post('/recommendations', async (req, res) => {
  try {
    const response = await fetch(
      'https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod/jobs/recommendations',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      }
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await fetch(
      `https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod/jobs/${id}`
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const page = req.query.page || 0
    const response = await fetch(
      `https://yon9jygrt9.execute-api.eu-west-1.amazonaws.com/prod/jobs?page=${page}`
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
