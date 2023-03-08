// import PropTypes from 'prop-types';
// import * as Yup from 'yup';
// import { useCallback, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// // form
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// // @mui
// import { LoadingButton } from '@mui/lab';
// import { Card, Chip, Grid, Stack, TextField, Typography, InputAdornment, Box } from '@mui/material';
// // routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
// // components
// import { useSnackbar } from '../../../components/snackbar';
// import FormProvider, { RHFTextField } from '../../../components/hook-form';
// import { createExpenseCategory } from '../../../api';

// export default function CreateExpenseHeads() {
//   const navigate = useNavigate();

//   const { enqueueSnackbar } = useSnackbar();

//   const NewExpensechema = Yup.object().shape({
//     title: Yup.string().required('Expense Title is required'),
//   });

//   const methods = useForm({
//     resolver: yupResolver(NewExpensechema),
//   });

//   const { reset, watch, setValue, getValues, handleSubmit } = methods;

//   const values = watch();

//   const onSubmit = async (data) => {
//     createExpenseCategory(data).then((res) => {
//       enqueueSnackbar('Expense category has been created successfully!');
//     });
//   };

//   return (
//     <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={12}>
//           <Card sx={{ p: 3 }}>
//             <Grid container spacing={2}>
//               <Grid item md={10}>
//                 <Stack spacing={3}>
//                   <RHFTextField name="title" label="Expense Category" />
//                 </Stack>
//               </Grid>

//               <Grid item md={2}>
//                 <LoadingButton type="submit" variant="contained" size="large">
//                   Create
//                 </LoadingButton>
//               </Grid>
//             </Grid>
//           </Card>
//         </Grid>
//       </Grid>
//     </FormProvider>
//   );
// }
