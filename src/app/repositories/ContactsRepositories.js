/**
 * Repository pattern
 * - Is an abstract of controller logic
 * - This repository have a logic to execute methods referent a database
 * - Our controller should dont have access to business rules, mainly about database.
 * - The mainly functionaly of our controller is execute methods of this repositorie,
 *   that keeps the logic of data.
 * - Our controller should have only rules about the application itself
 */

const db = require('../../database')

class ContactsRepositories {
  async findAll (orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
    const rows = await db.query(`SELECT * FROM contacts ORDER BY name ${direction}`)
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

  async update (id, { name, email, phone, categorie_id }) {
    const [row] = await db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, categorie_id = $4
    WHERE id = $5
    RETURNING *
  `, [name, email, phone, categorie_id, id])
    return row
  }

  async delete (id) {
    const deleteOp = await db.query('DELETE FROM contacts WHERE id = $1', [id])
    return deleteOp
  }
}

module.exports = new ContactsRepositories()
