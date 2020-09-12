const express = require('express');
const TransactionRouter = express.Router();

const services = require("../services/transactionService.js");

//console.log("Entarando em routers");

TransactionRouter.get('/', services.findAll);
TransactionRouter.get('/period/', services.findAllForPeriod);
TransactionRouter.post('/', services.create);
TransactionRouter.delete('/:id', services.remove);
TransactionRouter.put('/:id', services.update);


module.exports = TransactionRouter;
