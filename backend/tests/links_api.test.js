const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Link = require('../models/link')
const helper = require('./helper')

describe('Links already exist in DB', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        for (const user of helper.initialUsers) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(user.password, saltRounds)
            const updatedUser = new User({ ...user, password: passwordHash})
            await updatedUser.save()
        }
    
        await Link.deleteMany({})
        const users = await helper.usersInDb()
        for (const link of helper.initialLinks) {
            const newLink = new Link({ ...link, user: users[0].id })
            await newLink.save()
        } 
    })

    test('Links are returned in JSON format', async () => {
        await api.get('/api/links')
                .expect(200)
                .expect('Content-Type', /application\/json/)
    }, 100000)

    test('Correct number of Links are returned', async () => {
        const response = await api.get('/api/links')
        expect(response.body).toHaveLength(helper.initialLinks.length)
    }, 100000)
})

describe('Addition of new Link', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        for (const user of helper.initialUsers) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(user.password, saltRounds)
            const updatedUser = new User({ ...user, password: passwordHash})
            await updatedUser.save()
        }
    
        await Link.deleteMany({})
        const users = await helper.usersInDb()
        const newLink = new Link({ ...helper.initialLinks[0], user: users[0].id })
        await newLink.save()
    })

    test('Succeeds if authorized user logged in', async () => {
        const users = await helper.usersInDb()
        const startLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        const newLink = {
            ...helper.initialLinks[1],
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        await api.post('/api/links')
                .send(newLink)
                .set('Cookie', `jwtToken=${token}`)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        
        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(endLinks).toHaveLength(startLinks.length + 1)
        expect(endLinks).toContainEqual(newLink)
        expect(startLinks).not.toContainEqual(newLink)
    }, 100000)

    test('Fails if unauthorized user logged in', async () => {
        const users = await helper.usersInDb()
        const startLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        const newLink = {
            ...helper.initialLinks[1],
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'bbob',
                                    password: 'bobbybilly'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.post('/api/links')
                                .send(newLink)
                                .set('Cookie', `jwtToken=${token}`)
                                .expect(401)
                                .expect('Content-Type', /application\/json/)
        
        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(response.body.error).toContain('links can only be added by its authorized user' )
        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(newLink)
        expect(startLinks).not.toContainEqual(newLink)
    }, 100000)

    test('Fails if no user logged in', async () => {
        const users = await helper.usersInDb()
        const startLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        const newLink = {
            ...helper.initialLinks[1],
            user: users[0].id
        }

        const response = await api.post('/api/links')
                                .send(newLink)
                                .expect(401)
                                .expect('Content-Type', /application\/json/)
        
        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(response.body.error).toContain('no user logged in')
        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(newLink)
        expect(startLinks).not.toContainEqual(newLink)
    }, 100000)

    test('Fails with 400 if url is missing', async () => {
        const users = await helper.usersInDb()
        const startLinks = await helper.linksInDb()

        const newLink = {
            desc: 'Connect with me',
            position: 0,
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.post('/api/links')
                                .send(newLink)
                                .set('Cookie', `jwtToken=${token}`)
                                .expect(400)
        
        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(response.body.error).toContain('url required')
        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(newLink)
    }, 100000)

    test('Fails with 400 if desc is missing', async () => {
        const users = await helper.usersInDb()
        const startLinks = await helper.linksInDb()

        const newLink = {
            url: 'www.linkedin.com',
            position: 0,
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.post('/api/links')
                                .send(newLink)
                                .set('Cookie', `jwtToken=${token}`)
                                .expect(400)
        
        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(response.body.error).toContain('description required')
        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(newLink)
    }, 100000)

    test('Fails with 400 if position is missing', async () => {
        const users = await helper.usersInDb()
        const startLinks = await helper.linksInDb()

        const newLink = {
            url: 'www.linkedin.com',
            desc: 'Connect with me',
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.post('/api/links')
                                .send(newLink)
                                .set('Cookie', `jwtToken=${token}`)
                                .expect(400)
        
        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(response.body.error).toContain('position required')
        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(newLink)
    }, 100000)

    test('Fails with 400 if user is missing', async () => {
        const users = await helper.usersInDb()
        const startLinks = await helper.linksInDb()

        const newLink = {
            url: 'www.linkedin.com',
            desc: 'Connect with me',
            position: 0
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.post('/api/links')
                                .send(newLink)
                                .set('Cookie', `jwtToken=${token}`)
                                .expect(400)
        
        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(response.body.error).toContain('user required')
        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(newLink)
    }, 100000)
})

describe('Updating existing Link', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        for (const user of helper.initialUsers) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(user.password, saltRounds)
            const updatedUser = new User({ ...user, password: passwordHash})
            await updatedUser.save()
        }
    
        await Link.deleteMany({})
        const users = await helper.usersInDb()
        for (const link of helper.initialLinks) {
            const newLink = new Link({ ...link, user: users[0].id })
            await newLink.save()
        } 
    })

    test('Succeeds if authorized user logged in', async () => {
        const users = await helper.usersInDb()
        let startLinks = await helper.linksInDb()

        const updatedLink = {
            url: 'www.twitter.com',
            desc: 'Check out my Twitter',
            position: 1,
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        await api.put(`/api/links/${startLinks[0].id}`)
                .send(updatedLink)
                .set('Cookie', `jwtToken=${token}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        

        startLinks = startLinks.map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).toContainEqual(updatedLink)
        expect(startLinks).not.toContainEqual(updatedLink)
    }, 100000)

    test('Fails if unauthorized user logged in', async () => {
        const users = await helper.usersInDb()
        const startLinks = await helper.linksInDb()

        const updatedLink = {
            url: 'www.twitter.com',
            desc: 'Check out my Twitter',
            position: 1,
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'bbob',
                                    password: 'bobbybilly'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.put(`/api/links/${startLinks[0].id}`)
                .send(updatedLink)
                .set('Cookie', `jwtToken=${token}`)
                .expect(401)
                .expect('Content-Type', /application\/json/)

        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(updatedLink)
        expect(response.body.error).toContain('this link can only be updated by its authorized user')
    }, 100000)

    test('Fails if no user logged in', async () => {
        const users = await helper.usersInDb()
        let startLinks = await helper.linksInDb()

        const updatedLink = {
            url: 'www.twitter.com',
            desc: 'Check out my Twitter',
            position: 1,
            user: users[0].id
        }

        const response = await api.put(`/api/links/${startLinks[0].id}`)
                .send(updatedLink)
                .expect(401)
                .expect('Content-Type', /application\/json/)

        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(updatedLink)
        expect(response.body.error).toContain('no user logged in')
    }, 100000)

    test('Fails with 400 if url is missing', async () => {
        const users = await helper.usersInDb()
        const startLinks = await helper.linksInDb()

        const updatedLink = {
            desc: 'Check out my Twitter',
            position: 1,
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.put(`/api/links/${startLinks[0].id}`)
                .send(updatedLink)
                .set('Cookie', `jwtToken=${token}`)
                .expect(400)
                .expect('Content-Type', /application\/json/)

        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(updatedLink)
        expect(response.body.error).toContain('url required')
    }, 100000)

    test('Fails with 400 if desc is missing', async () => {
        const users = await helper.usersInDb()
        const startLinks = await helper.linksInDb()

        const updatedLink = {
            url: 'www.twitter.com',
            position: 1,
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.put(`/api/links/${startLinks[0].id}`)
                .send(updatedLink)
                .set('Cookie', `jwtToken=${token}`)
                .expect(400)
                .expect('Content-Type', /application\/json/)

        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(updatedLink)
        expect(response.body.error).toContain('description required')
    }, 100000)

    test('Fails with 400 if position is missing', async () => {
        const users = await helper.usersInDb()
        const startLinks = await helper.linksInDb()

        const updatedLink = {
            url: 'www.twitter.com',
            desc: 'Check out my Twitter',
            user: users[0].id
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.put(`/api/links/${startLinks[0].id}`)
                .send(updatedLink)
                .set('Cookie', `jwtToken=${token}`)
                .expect(400)
                .expect('Content-Type', /application\/json/)

        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(updatedLink)
        expect(response.body.error).toContain('position required')    
    }, 100000)

    test('Fails with 400 if user is missing', async () => {
        const startLinks = await helper.linksInDb()

        const updatedLink = {
            url: 'www.twitter.com',
            desc: 'Check out my Twitter',
            position: 1
        }

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.put(`/api/links/${startLinks[0].id}`)
                .send(updatedLink)
                .set('Cookie', `jwtToken=${token}`)
                .expect(400)
                .expect('Content-Type', /application\/json/)

        const endLinks = (await helper.linksInDb()).map(link => { 
            delete link.id 
            link.user = link.user.toString()
            return link
        })

        expect(endLinks).toHaveLength(startLinks.length)
        expect(endLinks).not.toContainEqual(updatedLink)
        expect(response.body.error).toContain('user required')        
    }, 100000)
})

describe('Deleting existing Link', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        for (const user of helper.initialUsers) {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(user.password, saltRounds)
            const updatedUser = new User({ ...user, password: passwordHash})
            await updatedUser.save()
        }
    
        await Link.deleteMany({})
        const users = await helper.usersInDb()
        for (const link of helper.initialLinks) {
            const newLink = new Link({ ...link, user: users[0].id })
            await newLink.save()
        } 
    })

    test('Succeeds if authorized user logged in', async () => {
        const startLinks = await helper.linksInDb()
        const linkToDelete = startLinks[0]

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        await api.delete(`/api/links/${linkToDelete.id}`)
                .set('Cookie', `jwtToken=${token}`)
                .expect(204)

        const endLinks = await helper.linksInDb()

        expect(endLinks).toHaveLength(startLinks.length - 1)
        expect(endLinks).not.toContainEqual(linkToDelete)
    })

    test('Fails if unauthorized user logged in', async () => {
        const startLinks = await helper.linksInDb()
        const linkToDelete = startLinks[0]

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'bbob',
                                    password: 'bobbybilly'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        const response = await api.delete(`/api/links/${linkToDelete.id}`)
                .set('Cookie', `jwtToken=${token}`)
                .expect(401)
                .expect('Content-Type', /application\/json/)

        const endLinks = await helper.linksInDb()

        expect(endLinks).toHaveLength(startLinks.length)
        expect(response.body.error).toContain('this link can only be deleted by its authorized user') 
    }, 100000)

    test('Fails if no user logged in', async () => {
        const startLinks = await helper.linksInDb()
        const linkToDelete = startLinks[0]

        const response = await api.delete(`/api/links/${linkToDelete.id}`)
                .expect(401)
                .expect('Content-Type', /application\/json/)

        const endLinks = await helper.linksInDb()

        expect(endLinks).toHaveLength(startLinks.length)
        expect(response.body.error).toContain('no user logged in')
    })

    test('Fails if link does not exist', async () => {
        const startLinks = await helper.linksInDb()

        const loggedIn = await api.post('/api/login')
                                .send({
                                    username: 'jsmith',
                                    password: 'password'
                                })
                                .expect(200)
        
        const token = loggedIn.headers['set-cookie'][0].match(/jwtToken=([^;]+)/)[1]

        await api.delete('/api/links/64c60a101ce9eaf0cd8dffe0')
                .set('Cookie', `jwtToken=${token}`)
                .expect(404)

        const endLinks = await helper.linksInDb()

        expect(endLinks).toHaveLength(startLinks.length)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})