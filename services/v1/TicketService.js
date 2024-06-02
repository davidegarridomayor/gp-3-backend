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
        const ticket = await models.Ticket.findByPk(id, {
            include: [{
                model: models.Comment,
                attributes: ['id', 'content', 'user_id'],
                as: 'comment',
                // You can include additional options here as needed
                include: [{
                    model: models.User,
                    attributes: ['id', 'username', "name"], // Include the user attributes you need
                    as: 'user'
                }]
            }]
        });
    
        if (!ticket) {
            throw new Error(`Ticket with id ${id} not found`);
        }
    
        return ticket;
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
    async getByUserId(id){
        const tickets = await models.Ticket.findAll({
            where: {
                user_id: id
            },
            include: [{
                model: models.Comment,
                attributes: ['id', 'content', 'user_id'],
                as: 'comments',
                include: [{
                    model: models.User,
                    attributes: ['id', 'username', "name"],
                    as: 'user'
                }]
            }]
        });

        if (!tickets.length) {
            throw new Error(`No tickets found for user with id ${id}`);
        }

        return tickets;

    }
}

module.exports = TicketService;