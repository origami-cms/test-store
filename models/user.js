module.exports = {
    properties: {
        id: 'uuid',
        age: {type: "number", required: false, min: 0, max: 120},
        name: {type: "string", required: true},
        email: {type: "email", unique: true, required: true},
        password: {type: "string", required: true, hidden: true},
        address: {type: "string", minlength: 4, maxlength: 50},
        country: {type: "string", required: true, default: "us"}
    }
}
