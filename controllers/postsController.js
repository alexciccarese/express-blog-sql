const connection = require('../data/db')
const menu = require('../data/menu')

function index(req, res) {

  const sql = 'SELECT * FROM posts'
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Query Failed' })

    console.log(results);
    res.json(results)

  });
}

function show(req, res) {
  const postId = Number(req.params.id)

  //troviamo il post tramite slug
  const sql = 'SELECT * FROM posts WHERE id = ?'

  connection.query(sql, [postId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' })
    if (results.length === 0) return res.status(404).json({ error: 'Post not found' })

    const post = results[0]

    res.json(post)
  })
}

function store(req, res) {
  const newId = menu.length ? menu[menu.length - 1].id + 1 : 1;
  const newSlug = req.body.title.toLowerCase()

  const newPost = {
    id: newId,
    title: req.body.title,
    slug: newSlug,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags
  }

  //aggiungiamo il nuovo post al menu
  menu.push(newPost)

  console.log(menu);

  res.status(201)
  res.json(newPost)


}

function update(req, res) {
  const postId = Number(req.params.id)
  const post = menu.find(post => post.id === postId)

  //404 error
  if (!post) {
    return res.status(404).json({
      error: '404 not found',
      message: 'Post not found'
    })
  }

  //aggiorniamo il post
  post.title = req.body.title
  post.content = req.body.content
  post.image = req.body.image
  post.tags = req.body.tags

  //check the menu
  res.json(post)
}

function modify(req, res) {
  res.send(`Modify the post with an id: ${req.params.id}`)
}

function destroy(req, res) {
  const postId = Number(req.params.id)

  const sql = 'DELETE FROM posts WHERE id = ?'

  connection.query(sql, [postId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Query Failed' })
    if (results.affectedRows === 0) return res.status(404).json({ message: 'There is nothing to delete' })

    res.sendStatus(204)
  })
}

module.exports = {
  index,
  show,
  store,
  update,
  modify,
  destroy
}