const sequelize = require('../../config/Sequelize');
const { models } = sequelize
const { Op } = require('sequelize')
const { config } = require('../../config/EnvConfig')

class TicketService {
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

        return await models.Ticket.findAndCountAll({
            order: [
                [sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']
            ],
            limit: perPage,
            offset: (page - 1) * perPage,
        })

    }
    async getById(id) {
        const dataTmp = await models.Ticket.findByPk(id);
        if (!dataTmp) {
            throw new Error(`Ticket with id ${id} not found`);
        }
        return dataTmp;
    }
    async add(data) {
        const createdTicket = await models.Ticket.create(data.ticket);
        return await models.Ticket.findOne({
            where: {
                id: createdTicket.id
            }
        })
    }


    async update(id, data) {
        const dataTmp = await this.getById(id);
        await dataTmp.update(data.ticket);
        return await models.Ticket.findOne({
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

module.exports = TicketService;