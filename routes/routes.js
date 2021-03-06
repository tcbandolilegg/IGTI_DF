const express = require('express');
const transactionRouter = express.Router();
const TransactionService = require('../services/transactionService');
const TransactionModel = require('../models/TransactionModel');

//retorna transaction de acordo com a queryParam yyyy-dd (ano-mes)
//se nao for passado periodo por parametro nao retorna nada
transactionRouter.get('/', async (req, res) => {
  const { period } = req.query;
  try {
    console.log(period);
    // se nao for passado periodo busca por todos os periodos de forma distinta
    if (typeof period === 'undefined') {
      const distinctTransactions = await TransactionService.findDistinctTransactions();
      res.send(distinctTransactions);
    } else {
      const transactions = await TransactionService.findTransactionByPeriod(
        period
      );
      res.send(transactions);
    }
  } catch (err) {
    res.send(err);
  }
});

//cria nova transaction
transactionRouter.post('/', async (req, res) => {
  const newTransaction = req.body;
  if (!newTransaction) res.send('Informe os dados da nova transaction');
  try {
    const InsertedTransaction = await TransactionService.createTransaction(
      newTransaction
    );
    res.send(InsertedTransaction);
  } catch (err) {
    res.send(err);
  }
});

//atualiza uma transaction, de acordo com os campos passados por parametro
transactionRouter.patch('/:id', async (req, res) => {
  const updateFields = req.body;
  const { id } = req.params;
  try {
    const updatedTransaction = await TransactionService.updateTransaction(
      id,
      updateFields
    );
    res.send(updatedTransaction);
  } catch (err) {
    res.send(err);
  }
});

//remove transacao de acordo com o id passado por parametro
transactionRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTransaction = await TransactionService.deleteTransaction(id);
    res.send(deletedTransaction);
  } catch (err) {
    res.send(err);
  }
});

transactionRouter.delete('/', async (req, res) => {
  try {
    const deleteAll = await TransactionModel.deleteMany({});
    res.end();
  } catch (err) {
    res.send(err);
  }
});

module.exports = transactionRouter;
