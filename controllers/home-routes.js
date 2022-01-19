const router = require('express').Router();
const sequelize = require('../config/connection');
const { Strain, User, Review } = require('../models');

router.get('/', (req, res) => {
    Strain.findAll({
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
        const strains = dbStrainData.map(strain => strain.get({ plain: true }));
  
        res.render('homepage', {
          strains,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/strain/:id', (req, res) => {
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
  
        const strain = dbStrainData.get({ plain: true });
  
        res.render('single-strain', {
          strain,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
  module.exports = router;