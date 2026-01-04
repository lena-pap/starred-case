var express = require('express')
var router = express.Router()
var db = require('../../db/db.js')

router.get('/:userId', function(req, res, next) {
  const { userId } = req.params
  db.all('SELECT job_id FROM favourite WHERE user_id = ?', [userId], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message })
    res.json({ jobIds: rows.map(r => r.job_id) })
  })
})

router.post('/', function(req, res, next) {
  const { userId, jobId } = req.body
  if (!userId || !jobId) return res.status(400).json({ error: 'userId and jobId required' })

  db.run(
    'INSERT OR IGNORE INTO favourite (user_id, job_id) VALUES (?, ?)',
    [userId, jobId],
    function(err) {
      if (err) return res.status(400).json({ error: err.message })
      res.json({ success: true })
    }
  )
})

router.delete('/', function(req, res, next) {
  const { userId, jobId } = req.body
  if (!userId || !jobId) return res.status(400).json({ error: 'userId and jobId required' })

  db.run(
    'DELETE FROM favourite WHERE user_id = ? AND job_id = ?',
    [userId, jobId],
    function(err) {
      if (err) return res.status(400).json({ error: err.message })
      res.json({ success: true })
    }
  )
})

module.exports = router
