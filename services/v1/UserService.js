const { models } = require('../../config/Sequelize');
const jwt = require('jsonwebtoken')
const Op = require('sequelize').Op;
const bcrypt = require('bcrypt');
const { config } = require('../../config/EnvConfig');
require('dotenv').config();

class UserService {
    constructor() {
        //
    }

    async getAll(params) {
        const { q, perPage, page, sortBy, sortDesc } = params;
        const queryLowered = q ? q.toLowerCase() : '';
        let where = {};
        if (q) {
            where = {
                [Op.or]: [
                    {
                        name: {
                            [Op.iLike]: `%${queryLowered}%`
                        },
                    },
                ]
            }
        }
        return await models.User.findAndCountAll({
            attributes: ['id', 'name'],
            where,
            order: [
                [sortBy, sortDesc === 'true' ? 'DESC' : 'ASC']
            ],
            limit: perPage,
            offset: (page - 1) * perPage,
        });
    }

    async add(data) {
        try {
            const existingUser = await models.User.findOne({ where: { username: data.username } });
            if (existingUser) {
                throw new Error('User already exists');
            }

            data.password = await bcrypt.hash(data.password, 10);
            console.log('Creating user with username:', data.username);
            const createdUser = await models.User.create(data);
            console.log('Created user with ID:', createdUser.id);

            return {
                id: createdUser.id,
                username: createdUser.username
            };
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    /* ******************************************
    * auth
    ********************************************/
    async login(data) {
        console.log('data,', data);
        try {
            const user = await models.User.findOne({ where: { username: data.username } });
            console.log('user:', user);

            if (!user) {
                throw new Error("User not found");
            }

            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            if (!isPasswordValid) {
                throw new Error("Invalid password");
            }
            if (user.token && user.tokenExpiration > new Date()) {
                return this.generateResponse(user)
            }
            else {
                const token = jwt.sign(
                    {
                        userId: user.id,
                        username: user.username,

                    },
                    config.jwt_key,
                    {
                        expiresIn: '5m'
                    }
                    
                )
                user.token = token
                user.tokenExpiration = new Date(Date.now() + 5 * 60 * 1000)
                await user.save()
                return this.generateResponse(user)
            }
        } catch (err) {
            console.log(err);
            throw new Error("Login failed");
        }
    }

    generateResponse(user) {
        return {
            id: user.id,
            username: user.username,
            token: user.token,
            tokenExpiration: user.tokenExpiration
        };
    }

}

module.exports = UserService;