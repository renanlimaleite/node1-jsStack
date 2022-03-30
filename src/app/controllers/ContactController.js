class ContactController {
  // index -> list all register
  index (request, response) {
    response.send('Index / List -> Contact Controller')
  }

  // show -> get one register
  show () {}
  // store -> to create a new register
  store () {}
  // update -> to update a register
  update () {}
  // delete -> to delete a register
}

module.exports = new ContactController()
