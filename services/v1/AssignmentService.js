const sequelize = require('../../config/Sequelize');
const { models } = sequelize
const { Op } = require('sequelize')
const { config } = require('../../config/EnvConfig');

class AssignmentService {
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

        return await models.Assignment.findAndCountAll({
            order: [
                [sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']
            ],
            limit: perPage,
            offset: (page - 1) * perPage,
            include: [
                { model: models.Ticket, as: 'ticket', include: [{model: models.Type, as: 'type'}, {model: models.Status, as: 'status'}]},
                { model: models.User, as: 'tech', attributes: ['id', 'name'] }, // Assuming the attribute name for user's name is 'name'
                { model: models.User, as: 'client', attributes: ['id', 'name'] } // Assuming the attribute name for user's name is 'name'
            ]
        })

    }
    async getById(id) {
        console.log('find this id', id);
        const dataTmp = await models.Assignment.findByPk(id, {
            include: [
                { model: models.Ticket, as: 'ticket', include: [{model: models.Type, as: 'type'}, {model: models.Status, as: 'status'}]},
                { model: models.User, as: 'tech', attributes: ['id', 'name'] }, // Assuming the attribute name for user's name is 'name'
                { model: models.User, as: 'client', attributes: ['id', 'name'] } // Assuming the attribute name for user's name is 'name'
            ]
        });
        if (!dataTmp) {
            throw new Error(`Assignment with id ${id} not found`);
        }
        return dataTmp;
    }
async add(data) {
    console.log('data', data);
    console.log('new Assignment', data.assignment);
    const createdAssignment = await models.Assignment.create(data.assignment);
    console.log('created role', createdAssignment);

    return await models.Assignment.findOne({
        where: {
            id: createdAssignment.id
        }
    });
}


    async update(id, data) {
        const dataTmp = await this.getById(id);
        const assignmentEdited = await dataTmp.update(data.assignment);
        return await models.Assignment.findOne({
            where: {
                id: assignmentEdited.id
            },
        });
    }

    async remove(id) {
        const dataTmp = await this.getById(id);
        return await dataTmp.destroy();
    }
}

module.exports = AssignmentService;