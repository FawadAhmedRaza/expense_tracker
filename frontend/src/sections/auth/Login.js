import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// hooks
import { useAuthContext } from '../../auth/useAuthContext';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import AuthRegisterForm from './AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();
  const [isLogin,setIsLogin]=useState(true)

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4">{ isLogin?"Sign in":"Register to"} Expense Tracker</Typography>

        <Stack direction="row" spacing={0.5}>

          <Typography variant="body2">{isLogin?"New user?":" Already have an account?"}</Typography>
          <Link  component={RouterLink} onClick={()=>setIsLogin(!isLogin)} variant="subtitle2">
            {
              isLogin?
            "Create an account":" SignIn"
            }
          </Link>
        </Stack>

        <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip>
      </Stack>

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}
{
  isLogin?
  <AuthLoginForm />:
  <AuthRegisterForm/>
}
    

      {/* <AuthWithSocial /> */}
    </LoginLayout>
  );
}
