const {expect} = require('chai');

module.exports = data => {
    describe('Setup', () => {
        it('new Store() should instantiate without errors', async () => {
            data.store = new data.Store(data.connOptions);
        });
        it('store._options should have correct options', async () => {
            expect(data.store._options).to.eql(data.connOptions);
        });
    });
}
