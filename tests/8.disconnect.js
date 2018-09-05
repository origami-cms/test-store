const {expect} = require('chai');

module.exports = data => {
    describe('Disconnect', () => {
        it('store.disconnect() should successfully disconnect from the server without errors', () => {
            expect(async () => await data.store.disconnect()).to.not.throw();
        });
    });
}
