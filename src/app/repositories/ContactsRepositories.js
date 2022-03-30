/**
 * Repository pattern
 * - Is an abstract of controller logic
 * - This repository have a logic to execute methods referent a database
 * - Our controller should dont have access to business rules, mainly about database.
 * - The mainly functionaly of our controller is execute methods of this repositorie,
 *   that keeps the logic of data.
 * - Our controller should have only rules about the application itself
 */
const { uuid } = require('uuidv4')

const contacts = [
  {
    id: uuid(),
    name: 'Renan',
    email: 'renan@gmail.com',
    phone: '21965152458',
    category_id: uuid()
  },
  {
    id: uuid(),
    name: 'Fulano',
    email: 'fulano@gmail.com',
    phone: '21960152008',
    category_id: uuid()
  },
  {
    id: uuid(),
    name: 'Ciclano',
    email: 'ciclano@gmail.com',
    phone: '21965004580',
    category_id: uuid()
  }
]

class ContactsRepositories {
  findAll () {
    return new Promise((resolve) => resolve(contacts))
  }
}

module.exports = new ContactsRepositories()
