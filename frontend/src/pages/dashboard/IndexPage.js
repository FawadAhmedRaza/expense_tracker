import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { AppAreaInstalled, AppNewAssets } from '../../sections/@dashboard/general/app';

export default function Dashboard() {
  const [expenseHeads, setExpenseHeads] = useState([]);
  const [amount, setAmount] = useState([]);
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    // getAllExpenseCategories()
    //   .then((res) => {
    //     const categories = res?.data?.data.map((cur) => cur.title);
    //     setExpenseHeads(categories);
    //     console.log(categories);
    //   })
    //   .catch((err) => console.log(err));
    // getAllTransactions()
    //   .then((res) => {
    //     const amount = res?.data?.data;
    //     setAmount(amount);
    //   })
    //   .catch((err) => console.log(err));
    // getAllAssets()
    //   .then((res) => {
    //     setAssets(res?.data?.data);
    //   })
    //   .catch((err) => console.log(err));
  }, []);

  // const groupedData = amount.reduce((acc, curr) => {
  //   const month = curr.month;
  //   if (!acc[month]) {
  //     acc[month] = [];
  //   }
  //   acc[month].push(curr);
  //   return acc;
  // }, {});
  const months = [
    '',
    'jan',
    'feb',
    'march',
    'april',
    'may',
    'jun',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  // const allKeys = Object.keys(groupedData);
  // const allValues = Object.values(groupedData);

  // const manupulate = allValues.map((cur, index) => ({
  //   month: months[allKeys[index]],
  //   data: [{ name: cur[index]?.expense_title, data: cur?.map(({ amount }) => amount) }],
  // }));
  const result = [];

  const groupedDataByMonth = amount.reduce((acc, curr) => {
    const month = months[curr.month];
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(curr);
    return acc;
  }, {});
  
  Object.entries(groupedDataByMonth).forEach(([month, expensesByMonth]) => {
    const groupedDataByExpenseTitle = expensesByMonth.reduce((acc, curr) => {
      const expenseTitle = curr.expense_title;
      if (!acc[expenseTitle]) {
        acc[expenseTitle] = [];
      }
      acc[expenseTitle].push(curr.amount);
      return acc;
    }, {});
  
    result.push({
      month,
      data: Object.entries(groupedDataByExpenseTitle).map(([expenseTitle, amounts]) => ({
        name: expenseTitle,
        data: amounts
      }))
    });
  });
  
  
  console.log(result,"expenseHeads");
  // console.log(manupulate, manupulate, 'manupulate');
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <AppAreaInstalled
          title="Expense"
          chart={{
            categories: expenseHeads,
            series: [
              ...result
            ],
          }}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12} my={2}>
        <AppNewAssets
          title="Assets"
          tableData={assets}
          tableLabels={[
            { id: 'id', label: 'Transaction ID' },
            { id: 'asset_name', label: 'Asset Name' },
            { id: 'book_value', label: 'Book Value' },
            { id: 'expense', label: 'Expense' },
            { id: 'balance', label: 'Balance' },
            //   { id: '' },
          ]}
        />
      </Grid>
    </>
  );
}
