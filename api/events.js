const express = require('express');

function createRouter(db) {
  const router = express.Router();
  router.get('/event/', function (req, res, next) {
    db.query(
      'SELECT * FROM data',
      (error, results) => {
        if(error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });

  router.get('/vegpizza/', function (req, res, next) {
    db.query(
      'SELECT * FROM pizza where type = "Veg"',
      (error, results) => {
        if(error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
  });

router.get('/nonvegpizza/', function (req, res, next) {
    db.query(
      'SELECT * FROM pizza where type = "Non-Veg"',
      (error, results) => {
        if(error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
          console.log(results)
        }
      }
    );
});
  
  router.post('/details', (req, res, next) => {
    db.query(
      'INSERT INTO orders (oid,name, address,payment_method,order_date,uid,total,status) VALUES (?,?,?,?,?,?,?,?)',
      [req.body.oid, req.body.name, req.body.address, req.body.payment_method, req.body.order_date, req.body.uid
      ,req.body.total,req.body.status],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });

  // to fetch order details based on id
  router.get('/order/:oid', function (req, res, next) {
    db.query(
      'SELECT * FROM orders WHERE oid=?',
      [req.params.oid],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });


  router.get('/cancel/:oid', function (req, res, next) {
    db.query(
      'DELETE FROM orders WHERE oid=?',
      [req.params.oid],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });


  return router;
}

module.exports = createRouter;