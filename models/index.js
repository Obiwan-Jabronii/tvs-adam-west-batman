const User = require('./User');
const Reviews = require('./Reviews');
const Strain = require('./Strain');

User.hasMany(Reviews, {
    foreignKey: 'user_id'
});

Reviews.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Strain.hasMany(Reviews, {

})

Reviews.belongsTo(Strain, {

})


module.exports = { User, Reviews, Strain };