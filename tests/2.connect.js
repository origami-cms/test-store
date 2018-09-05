const {expect} = require('chai');

module.exports = data => {
    describe('Connect', () => {
        it('store.connect() should connect without errors', async () => {
            await data.store.connect();
            expect(data.store._connection).to.not.be.undefined;
        });
    });
}
