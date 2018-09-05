const {expect} = require('chai');
const FIXTURES = require('../fixtures');

module.exports = data => {
    describe('Querying resources', () => {
        describe('model.find()', () => {
            it('model.find() should return a list of resources', async () => {
                const users = await data.modelUsers.find();
                expect(users).to.be.a('array');
                expect(users.length).to.eq(1);
                expect(users[0].id).to.eq(data.user.id);
            });
            it('model.find() should return multiple resources', async () => {
                await data.modelUsers.create(FIXTURES.randomUser());
                await data.modelUsers.create(FIXTURES.randomUser());
                await data.modelUsers.create(FIXTURES.randomUser());
                const users = await data.modelUsers.find();
                expect(users).to.be.a('array');
                expect(users.length).to.eq(4);
            });
            it('model.find() should not return hidden fields', async () => {
                let users = await data.modelUsers.find();
                expect(users[0].password).to.be.undefined
            });
            it('model.find({...}, {hidden: true}) should return hidden fields', async () => {
                let users = await data.modelUsers.find({}, { hidden: true });
                expect(users[0].password).to.be.a('string');
            });
            it('model.find() should return an empty list for wrong query', async () => {
                let users = await data.modelUsers.find({ name: 'Tom' });
                expect(users).to.be.a('array');
                expect(users.length).to.eq(0);
                expect(users).to.eql([]);
            });
            it('model.find() should throw error for invalid query', async () => {
                return expect(async () => await data.modelUsers.find(true))
                    .to.throw
            });
        });
        describe('model.find()', () => {
            it('model.findOne() should return one user', async () => {
                let u = await data.modelUsers.findOne({ id: data.user.id });
                u.should.like(data.user.toObject());
            });
            it('model.findOne() should return null for wrong query', async () => {
                let u = await data.modelUsers.findOne({ id: '123' });
                expect(u).to.be.null;
            });
        });
        describe('model.find()', () => {
            it('model.findById() should return one user', async () => {
                let u = await data.modelUsers.findById(data.user.id);
                u.should.like(data.user.toObject());
            });
            it('model.findById() should return null for wrong query', async () => {
                let u = await data.modelUsers.findById('123');
                expect(u).to.be.null;
            });
        });
    });
}
