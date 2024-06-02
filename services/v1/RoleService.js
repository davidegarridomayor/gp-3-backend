const sequelize = require('../../config/Sequelize');
const { models } = sequelize
const { Op } = require('sequelize')
const { config } = require('../../config/EnvConfig');

class RoleService {
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

        return await models.Role.findAndCountAll({
            order: [
                [sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']
            ],
            limit: perPage,
            offset: (page - 1) * perPage,
        })

    }
    async getById(id) {
        console.log('find this id', id);
        const dataTmp = await models.Role.findByPk(id);
        console.log('to edit role', dataTmp);
        if (!dataTmp) {
            throw new Error(`Role with id ${id} not found`);
        }
        return dataTmp;
    }
async add(data) {
    console.log('data', data);

    // Check if the role name already exists
    const existingRole = await models.Role.findOne({
        where: {
            name: data.role.name
        }
    });
    console.log('there is an existing role?', existingRole);

    if (existingRole) {
        throw new Error('Role name must be unique');
    }
    console.log('new role', data.role);
    const createdRole = await models.Role.create(data.role);
    console.log('created role', createdRole);

    return await models.Role.findOne({
        where: {
            id: createdRole.id
        }
    });
}


    async update(id, data) {
        const dataTmp = await this.getById(id);
        const roleEdited = await dataTmp.update(data.role);
        return await models.Role.findOne({
            where: {
                id: roleEdited.id
            },
        });
    }

    async remove(id) {
        const dataTmp = await this.getById(id);
        return await dataTmp.destroy();
    }
}

module.exports = RoleService;