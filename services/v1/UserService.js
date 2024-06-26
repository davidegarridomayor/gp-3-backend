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
                        username: {
                            [Op.iLike]: `%${queryLowered}%`
                        },
                    },
                ]
            }
        }
        return await models.User.findAndCountAll({
            attributes: ['id', 'username', 'name','priority', 'role_id'],
            where,
            include: [{
                model: models.Role,
                as: 'role',
                attributes: ['name']

            }],
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
            console.log('Created user with ID:', createdUser);

            return {
                id: createdUser.id,
                username: createdUser.username,
                name: createdUser.name,
                roleId: createdUser.role_id,
                priority: createdUser.priority
            };
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async update(id, data) {
        const dataTmp = await this.getById(id);

        if (data.user.password) {
            const saltRounds = 10; 
            data.user.password = await bcrypt.hash(data.user.password, saltRounds);
        }
    
        await dataTmp.update(data.user);
        return await models.User.findOne({
            where: {
                id: id
            },
            include: [{
                model: models.Role,
                as: 'role' // Make sure this alias matches the one defined in your association
            }],
        });
    }
      async remove(id) {
        const dataTmp = await this.getById(id);
        return await dataTmp.destroy();
      }

    /* ******************************************
    * auth
    ********************************************/
    async login(data) {
        console.log('data', data);
        try {
            const user = await models.User.findOne({
                where: { username: data.username },
                include: [{
                    model: models.Role,
                    as: 'role' // Make sure this alias matches the one defined in your association
                }]
            });

            if (!user) {
                throw new Error("User not found");
            }

            const isPasswordValid = await bcrypt.compare(data.password, user.password);
            console.log('COMPARING THE PASS', isPasswordValid);
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
                const tokenExpiration = new Date(Date.now() + 5 * 60 * 1000);
                console.log('miau', user.id);
                await models.User.update(
                    { token, tokenExpiration },
                    { where: { id: user.id } }
                );
                
                user.token = token
                user.tokenExpiration = tokenExpiration
                return this.generateResponse(user)
            }
        } catch (err) {
            console.log(err);
            throw new Error("Login failed");
        }
    }

    async logout(id) {
        try {
            await models.User.update(
                { token: null },
                { where: { id: id } }
            );
            return { message: "Logout successful" };
        } catch (err) {
            console.log(err);
            throw new Error("Logout failed");
        }
    }

    generateResponse(user) {
        return {
            id: user.id,
            username: user.username,
            name: user.name,
            role_id: user.role_id,
            token: user.token,
            tokenExpiration: user.tokenExpiration,
            role_id: user.role.id,
            role: user.role.name
        };
    }
    async checkTokenUser(token) {
        try {
            const decode = jwt.decode(token, { complete: true });
            const user = await models.User.findOne({
                where: {
                    email: decode.payload.email,
                }
            });
            if (user.token === token && user.authTokenExpiration > new Date()) {
                return {
                    valid: true,
                    currentUser: user
                };
            } else {
                user.token = null;
                user.authTokenExpiration = null;
                await user.save();
            }
            return { valid: false, currentUser: user };
        } catch (err) {
            return { valid: false, currentUser: null }
        }
    }
    async checkAuth(id) {
        try {
            const user = await models.User.findOne({ where: { id: id } });
            
            if (!user) {
                throw new Error('User not found');
            }
    
            if (user.token && new Date(this.formatDate(user.tokenExpiration)) > new Date()) {
                return { isAuthenticated: true };
            } 
    
            await user.update(
                { token: null, tokenExpiration: null },
                { where: { id: id } }
            );
            
            return { isAuthenticated: false };
    
        } catch (error) {
            console.error('Error checking authentication:', error);
            return { isAuthenticated: false };
        }
    }
    formatDate(date) {
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        const milliseconds = ('00' + date.getMilliseconds()).slice(-3);
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
      }

      async getById(id) {
        const dataTmp = await models.User.findByPk(id);
        if(!dataTmp) {
          throw boom.notFound("Not found");
        }
        return dataTmp;
      }

}

module.exports = UserService;
