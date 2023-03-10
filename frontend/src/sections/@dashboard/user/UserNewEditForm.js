import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo,useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel,InputAdornment } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';
import { createProduct, getAllCategories } from '../../../api';

// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

const productTypes=['raw materail','finish good']

export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const navigate = useNavigate();
  const [categories,setCategries]=useState([])

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    name_en: Yup.string(),
    name_ur: Yup.string(),
    cat_id: Yup.number().required('Category is required'),
    sale_price: Yup.number().required('Sale Price is required'),
    trade_price: Yup.number(),
    lp_price: Yup.number(),
    cost_price: Yup.number(),
    image: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const defaultValues = useMemo(
    () => ({
      name_en:"",
      name_ur:"",
      cat_id:"",
      sale_price:0,
      trade_price:0,
      lp_price: 0,
      cost_price:0,
      image:""
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
 
  useEffect(()=>{
    const fetchCategories =async()=>{
      const data = await getAllCategories();
      setCategries(data.data)

    }
    fetchCategories()

  },[])

  const onSubmit = async (body) => {
    const formdata = new FormData();
    const { name_en, name_ur, cost_price, sale_price,cat_id,image } = body

    formdata.append('name_en', name_en)
    formdata.append('name_ur', name_ur)
    formdata.append('cat_id', cat_id)
    formdata.append('sale_price', sale_price)
    formdata.append('cost_price', cost_price)
    formdata.append('image', image)
    try {
     const res=  await createProduct(formdata);
      reset();
      enqueueSnackbar('Create success!' );
      console.log(res)
      // navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image', newFile);
      }
      console.log(file)
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
           

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="image"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name_en" label="Full English Name" />
              <RHFTextField name="name_ur" label="Full Urdu Name" />
              
              <RHFSelect name="cat_id" label="Categories" placeholder="Categories">
                <option value="" />
                {categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name_en}
                  </option>
                ))}
              </RHFSelect>

                <RHFSelect name="product_type" style={{textTransform:'capitalize'}} label="Product Type" placeholder="Product Type">
                <option value="" />
                {productTypes.map((option) => (
                  <option style={{textTransform:'capitalize'}} key={option} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField type='number'
               InputProps={{
                startAdornment: <InputAdornment position="start">Rs:</InputAdornment>,
              }} shrink='true' placeholder='00' name="sale_price" label="Sale Price" />
              <RHFTextField 
               InputProps={{
                  startAdornment: <InputAdornment position="start">Rs:</InputAdornment>,
                }} type='number' shrink='true' placeholder='00' name="trade_price" label="Trade Price" />
              <RHFTextField 
               InputProps={{
                  startAdornment: <InputAdornment position="start">Rs:</InputAdornment>,
                }} type='number' shrink='true' placeholder='00' name="lp_price" label="Last Purchase Price" />
              <RHFTextField  
              InputProps={{
                  startAdornment: <InputAdornment position="start">Rs:</InputAdornment>,
                }} type='number' shrink='true' placeholder='00' name="cost_price" label="Cost Price" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Create Product
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
