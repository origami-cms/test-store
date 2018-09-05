module.exports.uuidValidate = require("uuid-validate");

// https://github.com/manishsaraan/email-validator/blob/master/index.js#L3
module.exports.isEmail = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


module.exports.wrap = func => new Promise(async (res, rej) => {
    try {
        res(await func());
    } catch (e) {
        rej(e);
    }
});
