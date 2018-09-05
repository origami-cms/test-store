const {expect} = require('chai');
const schemaPosts = require('../models/Post');
const schemaComments = require('../models/comment');
const {uuidValidate, wrap} = require('../lib');
const FIXTURES = require('../fixtures');

module.exports = data => {
    describe('Linking resources', () => {
        it('store.model() should create model with `isA`', async () => {
            data.modelPosts = await data.store.model('post', schemaPosts);
            data.modelComments = await data.store.model('comment', schemaComments);
        });
        it('model.create() should fail to create resource with wrong foreign key', async () => {
            return expect(wrap(() => data.modelPosts.create(FIXTURES.randomPost({ author: 123 }))))
                .to.be.eventually.rejectedWith(/User does not exist with that ID/);
        });

        describe('Linking with `isA`', async () => {
            it('model.create() should create resource with `isA` foreign key', async () => {
                data.user = await data.modelUsers.create(FIXTURES.user);
                data.post = await data.modelPosts.create(FIXTURES.randomPost({ author: data.user.id }));
                expect(data.post.id).to.be.a('string');
            });
            it('resource.save() should fail to update resource with wrong `isA` foreign key', async () => {
                return expect(wrap(async () => {
                    data.post.author = 123;
                    await data.post.save();
                })).to.be.eventually.rejectedWith(/User does not exist with that ID/);
            });
            it('model.create() should create resource with `isA` foreign key', async () => {
                data.post = await data.modelPosts.create(FIXTURES.randomPost({ author: data.user.id }));
                expect(data.post.id).to.be.a('string');
            });
            it('model.find({..}, {include: [...]}) should populate nested `isA` resource', async () => {
                const [p] = await data.modelPosts.find({}, { include: ['author'] });
                expect(p.author.id).to.be.a('string');
                expect(uuidValidate(p.author.id)).to.eq(true);
                p.author.should.like(data.user.toObject());
            });
            it('model.findOne({..}, {include: [...]}) should populate nested `isA` resource', async () => {
                const p = await data.modelPosts.findOne({}, { include: ['author'] });
                expect(p.author.id).to.be.a('string');
                expect(uuidValidate(p.author.id)).to.eq(true);
                p.author.should.like(data.user.toObject());
            });
            it('model.findOne({..}, {include: \'...\'}) should populate nested `isA` resource with include as string', async () => {
                const p = await data.modelPosts.findOne({}, { include: 'author' });
                expect(p.author.id).to.be.a('string');
                expect(uuidValidate(p.author.id)).to.eq(true);
                p.author.should.like(data.user.toObject());
            });
        });
        describe('Linking with `isMany`', async () => {
            it('model.create() should create resource with `isMany` foreign keys', async () => {
                const comment1 = await data.modelComments.create({ message: 'Hello, World!', author: data.user.id });
                const comment2 = await data.modelComments.create({ message: 'How is your day going?', author: data.user.id });

                data.post = await data.modelPosts.create(FIXTURES.randomPost({
                    author: data.user.id,
                    comments: [comment1.id, comment2.id]
                }));
                expect(data.post.id).to.be.a('string');;
                expect(data.post.comments).to.be.a('array');
                expect(data.post.comments[0]).to.be.a('string');
                expect(uuidValidate(data.post.comments[0])).to.eq(true);
                expect(data.post.comments[1]).to.be.a('string');
                expect(uuidValidate(data.post.comments[1])).to.eq(true);
            });
            it('model.find({..}, {include: [...]}) should populate nested `isMany` resources', async () => {
                const p = await data.modelPosts.find({ id: data.post.id }, {
                    include: ['comments']
                });
                expect(p.author).to.be.a('string');
                expect(uuidValidate(p.author)).to.eq(true);
                expect(p.comments).to.be.a('array');
                expect(uuidValidate(p.comments[0].id)).to.eq(true);
                expect(p.comments[0].message).to.be.a('string');
                expect(uuidValidate(p.comments[1].id)).to.eq(true);
                expect(p.comments[1].message).to.be.a('string');
            });
            it('model.findOne({..}, {include: [...]}) should populate nested `isMany` resources', async () => {
                const p = await data.modelPosts.findOne({ id: data.post.id }, {
                    include: ['comments']
                });
                expect(p.author).to.be.a('string');
                expect(uuidValidate(p.author)).to.eq(true);
                expect(p.comments).to.be.a('array');
                expect(uuidValidate(p.comments[0].id)).to.eq(true);
                expect(p.comments[0].message).to.be.a('string');
                expect(uuidValidate(p.comments[1].id)).to.eq(true);
                expect(p.comments[1].message).to.be.a('string');
            });
            it('model.findOne({..}, {include: \'...\'}) should populate nested `isMany` resources with include as string', async () => {
                const p = await data.modelPosts.findOne({ id: data.post.id }, {
                    include: 'comments'
                });
                expect(p.author).to.be.a('string');
                expect(uuidValidate(p.author)).to.eq(true);
                expect(p.comments).to.be.a('array');
                expect(uuidValidate(p.comments[0].id)).to.eq(true);
                expect(p.comments[0].message).to.be.a('string');
                expect(uuidValidate(p.comments[1].id)).to.eq(true);
                expect(p.comments[1].message).to.be.a('string');
            });
        });
    });
}
