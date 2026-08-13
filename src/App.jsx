import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Toaster } from "@/components/ui/toaster"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import AppLaunchSplash from '@/components/AppLaunchSplash';
import { initializeAdMob, showStartGameAd } from '@/lib/admob';
import PrivacyPolicy from "./pages/PrivacyPolicy";
// Add page imports here
import TetrixGame from './pages/Tetrix';

const AppShell = () => {
  const [isSplashMinTimeDone, setIsSplashMinTimeDone] = useState(false);
  const [isLaunchAdDone, setIsLaunchAdDone] = useState(() => Capacitor.getPlatform() !== 'ios');

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setIsSplashMinTimeDone(true);
    }, 1400);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (Capacitor.getPlatform() !== 'ios') {
      setIsLaunchAdDone(true);
      return;
    }

    if (!isSplashMinTimeDone || isLaunchAdDone) {
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
  }, [isLaunchAdDone, isSplashMinTimeDone]);

  if (!isSplashMinTimeDone || !isLaunchAdDone) {
    return <AppLaunchSplash />;
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<TetrixGame />} />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
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
    <Router>
      <AppShell />
      <Toaster />
    </Router>
  )
}

export default App
