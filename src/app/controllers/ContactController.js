const ContactsRepositories = require('../repositories/ContactsRepositories')

class ContactController {
  // index -> list all register
  async index (request, response) {
    const { orderBy } = request.query
    const contacts = await ContactsRepositories.findAll(orderBy)

    return response.status(200).json(contacts)
  }

  // show -> get one register
  async show (request, response) {
    const { id } = request.params
    const contact = await ContactsRepositories.findById(id)

    if (!contact) {
      return response.status(404).json({ error: 'User not found' })
    }

    return response.json(contact)
  }

  // store -> to create a new register
  async store (request, response) {
    const { name, email, phone, category_id } = request.body

    if (!name) {
      response.status(400).json({ error: 'Name is required' })
    }

    const contactExists = await ContactsRepositories.findByEmail(email)

    if (contactExists) {
      return response.status(400).json({ error: 'E-mail already exists' })
    }

    const contact = await ContactsRepositories.create({
      name,
      email,
      phone,
      category_id
    })

    return response.json(contact)
  }

  // update -> to update a register
  async update (request, response) {
    const { id } = request.params
    const { name, email, phone, categorie_id } = request.body

    if (!name) {
      response.status(400).json({ error: 'Name is required' })
    }

    const contactExists = await ContactsRepositories.findById(id)
    if (!contactExists) {
      return response.status(400).json({ error: 'User not found' })
    }

    const contactByEmail = await ContactsRepositories.findByEmail(email)

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'E-mail already exists' })
    }

    const contact = await ContactsRepositories.update(id, { name, email, phone, categorie_id })

    return response.json(contact)
  }
  // delete -> to delete a register

  async delete (request, response) {
    const { id } = request.params
    const contact = await ContactsRepositories.findById(id)

    if (!contact) {
      return response.status(404).json({ error: 'User not found' })
    }

    await ContactsRepositories.delete(id)

    // 204 => correct, but no content
    response.sendStatus(204)
  }
}

module.exports = new ContactController()
