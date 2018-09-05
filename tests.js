const {exec} = require("child_process");
const chai = require("chai");
const {expect} = chai;
const chaiAsPromised = require("chai-as-promised");
const chaiLike = require("chai-like");


chai.should();
chai.use(chaiAsPromised);
chai.use(chaiLike);


const suite1 = require('./tests/1.setup.js');
const suite2 = require('./tests/2.connect.js');
const suite3 = require('./tests/3.create-model.js');
const suite4 = require('./tests/4.create-resource.js');
const suite5 = require('./tests/5.querying-resources.js');
const suite6 = require('./tests/6.updating-resources.js');
const suite7 = require('./tests/7.linking-resources.js');
const suite8 = require('./tests/8.disconnect.js');


const execScript = cmd => new Promise((res, rej) => {
    exec(cmd, {cwd: process.cwd()}, err => err ? rej(err) : res());
});


module.exports = async(Store, connOptions, beforeFunc, afterFunc) => {

    describe(`Testing Origami.Store.${connOptions.type}`, () => {
        const data = {
            Store,
            connOptions
        };

        if (beforeFunc) before(function() {
            this.timeout(10000)
            if (typeof beforeFunc === 'string') return execScript(beforeFunc);
            else return beforeFunc();
        })
        if (afterFunc) after(function() {
            this.timeout(10000)
            if (typeof afterFunc === 'string') return execScript(afterFunc);
            else return afterFunc();
        });

        suite1(data);
        suite2(data);
        suite3(data);
        suite4(data);
        suite5(data);
        suite6(data);
        suite7(data);
        // suite8(data);
    });
}
