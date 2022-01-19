const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Review, Strain } = require('../../models');


router.get('/', (req, res) => {
    Strain.findAll({
      attributes: [
        'id',
        '_url',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Review,
          attributes: ['id', 'review_text', 'strain_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbStrainData => res.json(dbStrainData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/:id', (req, res) => {
    Strain.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'strain_url',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Review,
          attributes: ['id', 'review_text', 'strain_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbStrainData => {
        if (!dbStrainData) {
          res.status(404).json({ message: 'No strain found with this id' });
          return;
        }
        res.json(dbStrainData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.post('/', (req, res) => {
    Review.create({
      title: req.body.title,
      review_url: req.body.review_url,
      user_id: req.session.user_id
    })
      .then(dbStrainData => res.json(dbStrainData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router