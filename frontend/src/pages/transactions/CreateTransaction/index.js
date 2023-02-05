import PropTypes from 'prop-types';
import * as Yup from 'yup';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
// form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, InputAdornment, Box, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSelect, RHFTextField } from '../../../components/hook-form';
import {
  createExpenseCategory,
  createTransaction,
  getAllAssets,
  getAllExpenseCategories,
  getAllTransactions,
} from '../../../api';

const NewTransactionSchema = Yup.object().shape({
  description: Yup.string().optional(),
  date: Yup.date(),
  asset: Yup.string().required('Funding source is required'),
  expense_category: Yup.string().required(' Expense Category is required'),
  amount: Yup.number().required('Expense Title is required'),
});
export default function CreateTransaction() {
  const [expenses, setExpenses] = useState([]);
  const [assets, setAssets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(NewTransactionSchema),
  });

  const { reset, watch, setValue, getValues, handleSubmit, control } = methods;
  const values = watch();

  useEffect(() => {
    getAllAssets().then((res) => {
      setAssets(res.data.data);
    });
    getAllExpenseCategories().then((res) => {
      setExpenses(res.data.data);
    });

    getAllTransactions().then((res) => {
      setTransactions(res.data.data);
    });
  }, []);

  const onSubmit = async (data) => {
    const temp = {
      ...data,
      exp_id: data?.expense_category,
      asset_id: data.asset,
      expense_date: moment(data.date).format('YYYY-MM-DD HH:mm:ss'),
    };

    createTransaction(temp).then((res) => {
      enqueueSnackbar('Transaction has been created successfully!');
      reset();
    });
  };

  const rows = [...transactions];

  const columns = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { field: 'asset_name', headerName: 'Asset', width: 150 },
    { field: 'expense_title', headerName: 'Expense Title', width: 150 },
    { field: 'expense_date', headerName: 'Expense date', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 150 },
  ];

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Stack spacing={3}>
                    <Controller
                      name="date"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <DatePicker
                          label="Date"
                          value={values.date}
                          onChange={(newValue) => {
                            // console.log(newValue,"newValue")
                            setValue('date', newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                          )}
                        />
                      )}
                    />
                  </Stack>
                </Grid>
                <Grid item md={4}>
                  <Stack spacing={3}>
                    <RHFSelect
                      fullWidth
                      name="expense_category"
                      label="Expense Category"
                      InputLabelProps={{ shrink: true }}
                      SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                    >
                      {expenses?.map((option) => (
                        <MenuItem
                          key={option.id}
                          value={option.id}
                          sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                            '&:first-of-type': { mt: 0 },
                            '&:last-of-type': { mb: 0 },
                          }}
                        >
                          {option.title}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Stack>
                </Grid>
                <Grid item md={4}>
                  <Stack spacing={3}>
                    <RHFSelect
                      fullWidth
                      name="asset"
                      label="Funding Source"
                      InputLabelProps={{ shrink: true }}
                      SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                    >
                      {assets?.map((option) => (
                        <MenuItem
                          key={option.id}
                          value={option.id}
                          sx={{
                            mx: 1,
                            my: 0.5,
                            borderRadius: 0.75,
                            typography: 'body2',
                            textTransform: 'capitalize',
                            '&:first-of-type': { mt: 0 },
                            '&:last-of-type': { mb: 0 },
                          }}
                        >
                          {option?.asset_name}
                        </MenuItem>
                      ))}
                    </RHFSelect>
                  </Stack>
                </Grid>
                <Grid item md={8}>
                  <Stack spacing={3}>
                    <RHFTextField name="description" label="Description" />
                  </Stack>
                </Grid>
                <Grid item md={2}>
                  <Stack spacing={3}>
                    <RHFTextField name="amount" label="Amount" />
                  </Stack>
                </Grid>

                <Grid item md={2}>
                  <LoadingButton type="submit" variant="contained" size="large">
                    Create
                  </LoadingButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
      <Card sx={{ mt: 2 }}>
        <DataGrid autoHeight rows={rows} columns={columns} />
      </Card>
    </>
  );
}
