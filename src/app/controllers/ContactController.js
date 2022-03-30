const ContactsRepositories = require('../repositories/ContactsRepositories')

class ContactController {
  // index -> list all register
  async index (request, response) {
    const contacts = await ContactsRepositories.findAll()

    return response.status(200).json(contacts)
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
