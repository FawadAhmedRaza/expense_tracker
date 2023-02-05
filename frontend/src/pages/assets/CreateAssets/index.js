import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, InputAdornment, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { createAsset } from '../../../api';

export default function CreateAssets() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewAssetSchema = Yup.object().shape({
    asset_name: Yup.string().required('Asset name is required'),
    book_value: Yup.number().required('Book value is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewAssetSchema),
  });

  const { reset, watch, setValue, getValues, handleSubmit } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    createAsset(data).then((res) => {
      enqueueSnackbar('Asset has been created successfully!');
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Stack spacing={3}>
                  <RHFTextField name="asset_name" label="Asset Name" />
                </Stack>
              </Grid>
              <Grid item md={3}>
                <Stack spacing={3}>
                  <RHFTextField name="book_value" label="Book Value" />
                </Stack>
              </Grid>
              <Grid item md={2}>
                <LoadingButton type="submit" variant="contained" size="large">
                  Create Asset
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
