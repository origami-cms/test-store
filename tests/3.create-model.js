const {expect} = require('chai');
const schemaUser = require('../models/user');
const {wrap} = require('../lib');

module.exports = data => {
    describe('Create model', () => {
        it('store.models should start with no models', async () => {
            expect(data.store.models).to.eql({});
        });

        it('store.model() should throw error when getting model before setup', async () => {
            try {
                await data.store.model('user');
            } catch(e) {
                expect(e.message).to.eq('Origami.Store: No model with name \'user\'');
            }
        });

        it('store.model() should setup model', async() => {
            data.modelUsers = await data.store.model('user', schemaUser);
            expect(data.store.model('user')).to.not.be.undefined;
        });

        it('store.model() result has right methods', () => {
            expect(data.modelUsers.create).to.be.a('function');
            expect(data.modelUsers.find).to.be.a('function');
            expect(data.modelUsers.findById).to.be.a('function');
            expect(data.modelUsers.update).to.be.a('function');
            expect(data.modelUsers.delete).to.be.a('function');
        });
    });
}
