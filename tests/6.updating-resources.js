const {expect} = require('chai');
const {uuidValidate} = require('../lib');
const {randomUser} = require('../fixtures');

module.exports = data => {
    describe('Updating resources', () => {
        it('model.update() should update a resource', async () => {
            const email = 'updated@example.com';
            let users = await data.modelUsers.update({ id: data.user.id }, { email });
            expect(users).to.be.a('array');
            expect(users.length).to.eq(1);
            expect(users[0].id).to.be.a('string');
            expect(users[0].email).to.eq(email);
        });
        it('model.update({..}, {...}, {upsert: true}) should upsert a resource', async () => {
            const email = 'upsert@example.com';
            let [u] = await data.modelUsers.update(randomUser(), { name: 'Jake', email }, { upsert: true });
            expect(uuidValidate(u.id)).to.eq(true)

            expect(u.id).to.be.a('string');
            expect(u.email).to.eq(email);
        });
        it('resource.save() should update a resource', async () => {
            expect(data.user.name).to.eq('Bob');
            data.user.name = 'Tom';
            expect(data.user.name).to.eq('Tom');
            data.user = await data.user.save();
            expect(data.user.save).to.be.a('function');
            expect(data.user.name).to.eq('Tom');

            const userCopy = await data.modelUsers.find({id: data.user.id});
            expect(userCopy.name).to.eq('Tom');
        });
        it('model.delete(id) should remove a resource', async () => {
            const res = await data.modelUsers.delete(data.user.id);
            expect(res).to.be.true;

            let u = await data.modelUsers.findOne({ id: data.user.id });

            expect(u).to.be.null;
        });
    });
}
