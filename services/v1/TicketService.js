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
        const allTickets = await models.Ticket.findAndCountAll({
            order: [
                [sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']
            ],
            include: [
                {
                    model: models.Assignment,
                    as: 'assignment',
                    include: [{
                        model: models.User,
                        attributes: ['id', 'username', "name"],
                        as: 'tech'
                    },
                    {
                        model: models.User,
                        attributes: ['id', 'username', "name"],
                        as: 'admin'
                    }
                        ,
                    {
                        model: models.User,
                        attributes: ['id', 'username', "name"],
                        as: 'client'
                    }


                    ]
                }

            ],
            limit: perPage,
            offset: (page - 1) * perPage,
        })

        return allTickets

    }
    async getById(id) {
        const ticket = await models.Ticket.findByPk(id, {
            include: [{
                model: models.Comment,
                attributes: ['id', 'content', 'user_id'],
                as: 'comments',
                // You can include additional options here as needed
                include: [{
                    model: models.User,
                    attributes: ['id', 'username', "name"], // Include the user attributes you need
                    as: 'user'
                }],

            }, {
                model: models.Assignment,
                as: 'assignment'
            }]

        });

        if (!ticket) {
            throw new Error(`Ticket with id ${id} not found`);
        }

        return ticket;
    }
    async add(data) {
        try {
            const [user, type] = await Promise.all([
                models.User.findOne({
                    where: { id: data.ticket.user_id },
                    attributes: ['priority']
                }),
                models.Type.findOne({
                    where: { id: data.ticket.type_id },
                    attributes: ['priority']
                })
            ]);

            if (!user || !type) {
                throw new Error('User or Type not found');
            }

            data.ticket.priority = Math.min(user.priority, type.priority);

            const createdTicket = await models.Ticket.create(data.ticket);
            return await models.Ticket.findOne({
                where: { id: createdTicket.id }
            });
        } catch (error) {
            console.error('Error adding ticket:', error);
            throw error;
        }
    }

    async getCommentById(id) {
        const comment = await models.Comment.findByPk(id);

        if (!comment) {
            throw new Error(`Delete Comment with id ${id} not found`);
        }

        return comment;

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
        if (dataTmp.assignment.legnth != 0) {
            
            for (const assignmment of dataTmp.assignment) {

                const assignmmentTmp = await this.getAssignmById(assignmment.id);
                await assignmmentTmp.destroy();
            }

        }
        if (dataTmp.comments.length != 0) {
            for (const comment of dataTmp.comments) {
                const commentTmp = await this.getCommentById(comment.id);
                await commentTmp.destroy();
            }

        }
        return await dataTmp.destroy();
    }
    async getByUserId(id) {
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
                }
                ]
            }, {
                model: models.Assignment,
                as: 'assignment',
                include: [{
                    model: models.User,
                    attributes: ['id', 'username', "name"],
                    as: 'tech'
                },
                {
                    model: models.User,
                    attributes: ['id', 'username', "name"],
                    as: 'admin'
                }
                    ,
                {
                    model: models.User,
                    attributes: ['id', 'username', "name"],
                    as: 'client'
                }


                ]
            }]
        });
        if (!tickets.length) {
            return []
        }

        return tickets;

    }
    async getAssignmById(id) {
        const assignment = await models.Assignment.findByPk(id);

        if (!assignment) {
            throw new Error(`assignment with id ${id} not found`);
        }

        return assignment;

    }

}

module.exports = TicketService;