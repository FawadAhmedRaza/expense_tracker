// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// locales
import ThemeLocalization from './locales';
// components
import { StyledChart } from './components/chart';
import SnackbarProvider from './components/snackbar';
import { ThemeSettings } from './components/settings';
import { MotionLazyContainer } from './components/animate';
import AuthGuard from './auth/AuthGuard';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthGuard>
      <MotionLazyContainer>
        <ThemeProvider>
          <ThemeSettings>
            <ThemeLocalization>
              <SnackbarProvider>
                <StyledChart />
                <Router />
              </SnackbarProvider>
            </ThemeLocalization>
          </ThemeSettings>
        </ThemeProvider>
      </MotionLazyContainer>
    </AuthGuard>
  );
}
