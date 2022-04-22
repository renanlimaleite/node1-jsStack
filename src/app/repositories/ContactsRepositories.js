/**
 * Repository pattern
 * - Is an abstract of controller logic
 * - This repository have a logic to execute methods referent a database
 * - Our controller should dont have access to business rules, mainly about database.
 * - The mainly functionaly of our controller is execute methods of this repositorie,
 *   that keeps the logic of data.
 * - Our controller should have only rules about the application itself
 */
const { v4 } = require('uuid')

const db = require('../../database')

let contacts = [
  {
    id: v4(),
    name: 'Renan',
    email: 'renan@gmail.com',
    phone: '21965152458',
    category_id: v4()
  },
  {
    id: v4(),
    name: 'Fulano',
    email: 'fulano@gmail.com',
    phone: '21960152008',
    category_id: v4()
  },
  {
    id: v4(),
    name: 'Ciclano',
    email: 'ciclano@gmail.com',
    phone: '21965004580',
    category_id: v4()
  }
]

class ContactsRepositories {
  async findAll () {
    const rows = await db.query('SELECT * FROM contacts')
    return rows
  }

  async findById (id) {
    const [row] = await db.query('SELECT * FROM contacts WHERE id = $1', [id])
    return row
  }

  async findByEmail (email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email])
    return row
  }

  async create ({ name, email, phone, categorie_id }) {
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, categorie_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, categorie_id])

    return row
  }

  update (id, { name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const updatedContact = {
        id,
        name,
        email,
        phone,
        category_id
      }

      contacts = contacts.map(contact => contact.id === id ? updatedContact : contact)

      resolve(updatedContact)
    })
  }

  delete (id) {
    return new Promise((resolve) => {
      contacts = contacts.filter(contact => contact.id !== id)
      resolve()
    })
  }
}

module.exports = new ContactsRepositories()
