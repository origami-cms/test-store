const {expect} = require('chai');
const schemaMultipleTypes = require('../models/multipleTypes');
const {uuidValidate, isEmail, wrap} = require('../lib');
const FIXTURES = require('../fixtures');

module.exports = data => {
    describe('Create resource', () => {
        it('model.create() should create a resource', async () => {
            data.user = await data.modelUsers.create(FIXTURES.user);
            expect(data.user.id).to.be.a('string');
            expect(uuidValidate(data.user.id)).to.eq(true);
        });
        it('model.create() should use defaults', async () => {
            expect(data.user.country).to.eq('us');
        });
        it('model.create() should have createdAt as Date', async () => {
            expect(data.user.createdAt).to.be.a('date')
        });
        it('model.create() should have updatedAt as Date', async () => {
            expect(data.user.updatedAt).to.be.a('date')
        });
        it('model.create() should have deletedAt as null', async () => {
            expect(data.user.deletedAt).to.be.eq(null);
        });

        // Removed

        // it('model.create() should allow for multiple types on a property', async () => {
        //     let modelMultipleTypes = await data.store.model('multipleTypes', schemaMultipleTypes);
        //     const type1 = await modelMultipleTypes.create({ multiple: 'test' });
        //     const type2 = await modelMultipleTypes.create({ multiple: 123 });
        //     expect(type1.multiple).to.be.a('string').and.eq('test');
        //     expect(type2.multiple).to.be.a('number').and.eq(123);
        // });

        it('model.create() should have valid properties', async () => {
            expect(data.user.createdAt).to.be.a('date', 'createdAt is not a Date');
            expect(data.user.email)
                .to.be.a('string', 'email is not a string')
                .and.match(isEmail, 'email is not a valid email')
            expect(data.user.age).to.be.a('number', 'age is not a number')
        });
        it('model.create() should not return hidden fields', async () => {
            expect(data.user.password).to.be.undefined
        });
        it('model.create() should fail with duplicate unique field (email)', async () => {
            return expect(wrap(() => data.modelUsers.create(FIXTURES.user)))
                .to.be.eventually.rejectedWith(/Duplicate field 'email' on model 'user'/);
        });
        it('model.create() should fail with required field (name)', async () => {
            return expect(wrap(() => data.modelUsers.create(FIXTURES.randomUser({ name: '' }))))
                .to.be.eventually.rejectedWith(/Required field 'name' is missing on model 'user'/);
        });
        it('model.create() should fail with minimum number field (age)', async () => {
            return expect(wrap(() => data.modelUsers.create(FIXTURES.randomUser({ age: -10 }))))
                .to.be.eventually.rejectedWith(/Field 'age' should be above '0', not '-10' on model 'user'/);
        });
        it('model.create() should fail with maximum number field (age)', async () => {
            return expect(wrap(() => data.modelUsers.create(FIXTURES.randomUser({ age: 200 }))))
                .to.be.eventually.rejectedWith(/Field 'age' should be below '120', not '200' on model 'user'/);
        });
        it('model.create() should fail with minimum string field (address)', async () => {
            return expect(wrap(() => data.modelUsers.create(FIXTURES.randomUser({ address: 'aa' }))))
                .to.be.eventually.rejectedWith(/Field 'address' should be longer than '4' characters, not '2' on model 'user'/);
        });
        it('model.create() should fail with maximum string field (address)', async () => {
            return expect(wrap(() => data.modelUsers.create(FIXTURES.randomUser({ address: 'a'.repeat(100) }))))
                .to.be.eventually.rejectedWith(/Field 'address' should be shorter than '50' characters, not '100' on model 'user'/);
        });
    });
}
