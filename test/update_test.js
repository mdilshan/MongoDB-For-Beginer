const assert = require('assert');
const User = require('../src/user');

describe('Updating records' , (done) => {
    let joe;

    beforeEach(done => {
        joe = new User({name : 'Joe', likes: 0});
        joe.save()
            .then(() => done());
    });

    function assertName(operation, done){
        operation
            .then(() => User.find({}))
            .then(users => {
                assert(users.length === 1);
                assert(users[0].name === 'Alex');
                done();
            });
    }

    it('instance type using set n save', (done) => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('a model instance can update', (done) => {
        assertName(joe.update({ name: 'Alex' }), done);
    })

    it('A model class can update', done => {
        assertName(
            User.update({ name : 'Joe' }, { name : 'Alex' }),
            done
        );    
    })

    it('A model class can update one record', done => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe' }, {name: 'Alex'}),
            done
        )    
    })
    it('A model class can find a record with an id and update', done => {
        assertName(
            User.findByIdAndUpdate(joe._id, {name: 'Alex'}),
            done
        )
    })
    //mongoDB update operators. These are use for giving instruction to mongoDB. Therefore we don't need to request existing data to the server before update them. We can send the instruction to the mongoDB to just do updates
    //xit <=== will not run
    it('A user can have their likes incremented by 1', (done) => {
        User.update({ name: 'Joe' }, { $inc:{likes: 1} })
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user.likes === 1);
                done();
            })
    });
});
