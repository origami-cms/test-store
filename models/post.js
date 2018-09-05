module.exports = {
    properties: {
        id: 'uuid',
        title: 'string',
        content: 'string',
        author: {isA: 'user'},
        comments: {isMany: 'comment', default: []}
    }
}
