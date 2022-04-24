const CategoriesRepositories = require('../repositories/CategoriesRepositories')
const isValidUUID = require('../lib/isValidUUID')

class CategorieController {
  async index (request, response) {
    const { orderBy } = request.query

    const categories = await CategoriesRepositories.findAll(orderBy)

    return response.json(categories)
  }

  async store (request, response) {
    const { name } = request.body

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const category = await CategoriesRepositories.create({ name })

    return response.status(201).json(category)
  }

  async update (request, response) {
    const { id } = request.params

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Id is invalid' })
    }

    const { name } = request.body

    const category = await CategoriesRepositories.findById(id)

    const categoryByName = await CategoriesRepositories.findByName(name)

    // params fe56ed42-9f24-4d37-8881-089e04e44f03
    // categoryByName { id: 123456, name: 'Faculdade' }
    // Encontrou categoryByName, mas os id's são diferentes, portanto não pode mudar.

    if (categoryByName && categoryByName.id !== id) {
      return response.status(400).json({ error: 'This category already exists' })
    }

    if (!category) {
      return response.status(404).json({ error: 'Category not found' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' })
    }

    const categoryUpdated = await CategoriesRepositories.update(id, { name })

    return response.json(categoryUpdated)
  }

  async show (request, response) {
    const { id } = request.params
    const category = await CategoriesRepositories.findById(id)

    if (!category) {
      return response.status(404).json({ error: 'Category not found' })
    }

    return response.status(200).json(category)
  }

  async delete (request, response) {
    const { id } = request.params

    const category = await CategoriesRepositories.findById(id)

    if (!category) {
      return response.status(404).json({ error: 'Category not found' })
    }

    await CategoriesRepositories.delete(id)

    return response.sendStatus(204)
  }
}

module.exports = new CategorieController()
