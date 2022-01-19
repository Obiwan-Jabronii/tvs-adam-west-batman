const User = require('./User');
const Review = require('./Review');
const Strain = require('./Strain');

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Strain.hasMany(Review, {

})

Review.belongsTo(Strain, {

})


module.exports = { User, Review, Strain };