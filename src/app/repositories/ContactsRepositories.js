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
  findAll () {
    return new Promise((resolve) => resolve(contacts))
  }

  findById (id) {
    return new Promise((resolve) => resolve(
      contacts.find(contact => contact.id === id)
    ))
  }

  findByEmail (email) {
    return new Promise((resolve) => resolve(
      contacts.find(contact => contact.email === email)
    ))
  }

  create ({ name, email, phone, category_id }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id
      }

      contacts.push(newContact)

      resolve(newContact)
    })
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
