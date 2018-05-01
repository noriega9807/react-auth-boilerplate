const request = require('supertest');

const { ObjectId } = require('mongodb');

const { app } = require('./../../../server/server');

const { User } = require('./../../../server/models/user');

const {
    users,
    populateUsers
} = require('./../fixtures/seed');

beforeEach(populateUsers);

describe('GET /users/me', () => {
    test('should return user if authenticated', (done) => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    });

    test('should return a 401 if not authenticated', (done) => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect((res) => {
                expect(res.body).toEqual({});
            })
            .end(done);
    });
});

describe('POST /users', () => {
    test('should create a user', (done) => {
        var email = 'example@example.com';
        var password = 'prueba123';

        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeDefined();
                expect(res.body._id).toBeDefined();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {

                if (err) {
                    return done(err);
                }

                User.findOne({
                    email
                }).then((user) => {
                    expect(user).toBeDefined();
                    done();
                }).catch((e) => {
                    return done(e);
                });
            });
    });

    test('should return validation errors if request invalid', (done) => {
        var email = 'exampleexample.com';
        var password = 'a123';

        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(400)
            .end(done);
    });

    test('should not create user if mail in use', (done) => {
        var email = users[0].email;
        var password = 'prueba123';

        request(app)
            .post('/users')
            .send({
                email,
                password
            })
            .expect(400)
            .end(done);
    });
});

describe('POST /users/login', () => {
    test('Should login user and return token', (done) => {
        var email = users[1].email;
        var password = users[1].password;

        request(app)
            .post('/users/login')
            .send({
                email,
                password
            })
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeDefined();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens[1]).toBeDefined();
                    done();
                }).catch((e) => {
                    return done(e);
                });
            });
    });

    test('Should reject invalid login', (done) => {
        var email = users[1].email;
        var password = 'algo';

        request(app)
            .post('/users/login')
            .send({
                email,
                password
            })
            .expect(400)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeUndefined();
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((e) => {
                    return done(e);
                });
            });
    });
});

describe('DELETE /users/me/token', () => {
    test('Should remove auth token on log out', (done) => {
        request(app)
            .delete('/users/me/token')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                User.findById(users[1]._id).then((user) => {
                    expect(user.tokens.length).toBe(1);
                    done();
                }).catch((e) => {
                    return done(e);
                });
            });
    });

});