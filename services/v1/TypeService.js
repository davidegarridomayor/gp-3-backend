const sequelize = require('../../config/Sequelize');
const { models } = sequelize
const { Op } = require('sequelize')
const { config } = require('../../config/EnvConfig')

class TypeService {
    constructor() {

    }

    async getAll(params) {
        const { q, perPage, page, sortBy, sortDesc } = params;
        const queryLowered = q ? q.toLowerCase() : '';
        let where = {};
        if (q) {
            where = {
                [Op.or]: [
                    {
                        id: {
                            [Op.iLike]: `%${queryLowered}%`
                        },
                    },
                ]
            }
        }

        return await models.Type.findAndCountAll({
            order: [
                [sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']
            ],
            limit: perPage,
            offset: (page - 1) * perPage,
        })

    }
    async getById(id) {
        const dataTmp = await models.Type.findByPk(id);
        if (!dataTmp) {
            throw new Error(`Type with id ${id} not found`);
        }
        return dataTmp;
    }
async add(data) {
    console.log('data', data);

    // Check if the type name already exists
    const existingType = await models.Type.findOne({
        where: {
            name: data.type.name
        }
    });

    if (existingType) {
        throw new Error('Type name must be unique');
    }

    const createdType = await models.Type.create(data.type);
    return await models.Type.findOne({
        where: {
            id: createdType.id
        }
    });
}


    async update(id, data) {
        const dataTmp = await this.getById(id);
        await dataTmp.update(data.type);
        return await models.Type.findOne({
            where: {
                id: id
            },
        });
    }

    async remove(id) {
        const dataTmp = await this.getById(id);
        return await dataTmp.destroy();
    }
}

module.exports = TypeService;