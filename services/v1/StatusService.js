const sequelize = require('../../config/Sequelize');
const { models } = sequelize
const { Op } = require('sequelize')
const { config } = require('../../config/EnvConfig')

class StatusService {
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

        return await models.Status.findAndCountAll({
            order: [
                [sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']
            ],
            limit: perPage,
            offset: (page - 1) * perPage,
        })

    }
    async getById(id) {
        const dataTmp = await models.Status.findByPk(id);
        if (!dataTmp) {
            throw new Error(`Status with id ${id} not found`);
        }
        return dataTmp;
    }
    async add(data) {
        console.log('data create status', data);
        const createdStatus = await models.Status.create(data.status);
        console.log('new status', createdStatus);
        return await models.Status.findOne({
            where: {
                id: createdStatus.id
            }
        })
    }


    async update(id, data) {
        const dataTmp = await this.getById(id);
        await dataTmp.update(data.status);
        return await models.Status.findOne({
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

module.exports = StatusService;