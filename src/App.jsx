import { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLaunchSplash from '@/components/AppLaunchSplash';
import { initializeAdMob, showStartGameAd } from '@/lib/admob';
// Add page imports here
import Tetris from './pages/Tetris';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  const [isSplashMinTimeDone, setIsSplashMinTimeDone] = useState(false);
  const [isLaunchAdDone, setIsLaunchAdDone] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsSplashMinTimeDone(true);
    }, 1400);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!isSplashMinTimeDone || isLoadingPublicSettings || isLoadingAuth || authError || isLaunchAdDone) {
      return;
    }

    let isCancelled = false;

    const runLaunchAd = async () => {
      console.log('[AppLaunchAd] start');
      try {
        await showStartGameAd();
      } catch (error) {
        console.error('[AppLaunchAd] error', error);
      } finally {
        if (!isCancelled) {
          console.log('[AppLaunchAd] done');
          setIsLaunchAdDone(true);
        }
      }
    };

    runLaunchAd();

    return () => {
      isCancelled = true;
    };
  }, [authError, isLaunchAdDone, isLoadingAuth, isLoadingPublicSettings, isSplashMinTimeDone]);

  // Keep splash visible for a minimum duration and during app auth/bootstrap.
  if (!isSplashMinTimeDone || isLoadingPublicSettings || isLoadingAuth) {
    return <AppLaunchSplash />;
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  if (!isLaunchAdDone) {
    return <div className="fixed inset-0 bg-black" />;
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Tetris />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  useEffect(() => {
    initializeAdMob().catch((error) => {
      console.error('AdMob initialization failed', error);
    });
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
