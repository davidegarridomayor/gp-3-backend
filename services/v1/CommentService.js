const sequelize = require('../../config/Sequelize');
const { models } = sequelize
const { Op } = require('sequelize')
const { config } = require('../../config/EnvConfig');

class CommentService {
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

        return await models.Comment.findAndCountAll({
            order: [
                [sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']
            ],
            limit: perPage,
            offset: (page - 1) * perPage,
        })

    }
    async getById(id) {
        console.log('find this id', id);
        const dataTmp = await models.Comment.findByPk(id);
        if (!dataTmp) {
            throw new Error(`Comment with id ${id} not found`);
        }
        return dataTmp;
    }
async add(data) {
    console.log('data', data);
    console.log('new comment', data.comment);
    const createdComment = await models.Comment.create(data.comment);
    console.log('created role', createdComment);

    return await models.Comment.findOne({
        where: {
            id: createdComment.id
        }
    });
}


    async update(id, data) {
        const dataTmp = await this.getById(id);
        const commentEdited = await dataTmp.update(data.commment);
        return await models.Comment.findOne({
            where: {
                id: commentEdited.id
            },
        });
    }

    async remove(id) {
        const dataTmp = await this.getById(id);
        return await dataTmp.destroy();
    }
}

module.exports = CommentService;