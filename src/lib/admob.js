import { Capacitor, registerPlugin } from '@capacitor/core';
import { AdMob, InterstitialAdPluginEvents } from '@capacitor-community/admob';

const AppOpenAd = registerPlugin('AppOpenAd');
const TEST_DEVICE_IDENTIFIERS = ['87298d42a1c642a6ce0892f9f11272d4'];
const SCORE_INTERSTITIAL_AD_ID = 'ca-app-pub-6541705647323354/7379475378';

function isNativeApp() {
  return Capacitor.isNativePlatform();
}

export async function initializeAdMob() {
  if (!isNativeApp()) return;

  console.log('[AppOpenAd] initialize');
  await Promise.all([
    AppOpenAd.initialize(),
    AdMob.initialize({
      initializeForTesting: true,
      testingDevices: TEST_DEVICE_IDENTIFIERS,
    }),
  ]);
  console.log('[AppOpenAd] initialize:done');
}

export async function showStartGameAd() {
  if (!isNativeApp()) return;

  console.log('[AppOpenAd] showStartGameAd:start');
  await new Promise(async (resolve) => {
    let settled = false;
    let cleanup = async () => {};

    const finish = async () => {
      if (settled) return;
      settled = true;
      console.log('[AppOpenAd] showStartGameAd:finish');
      await cleanup();
      resolve();
    };

    const handles = await Promise.all([
      AppOpenAd.addListener('startAdLoaded', () => {
        console.log('[AppOpenAd] event:startAdLoaded');
      }),
      AppOpenAd.addListener('startAdPresented', () => {
        console.log('[AppOpenAd] event:startAdPresented');
      }),
      AppOpenAd.addListener('startAdDismissed', () => {
        console.log('[AppOpenAd] event:startAdDismissed');
        return finish();
      }),
      AppOpenAd.addListener('startAdFailedToLoad', (event) => {
        console.log('[AppOpenAd] event:startAdFailedToLoad', event);
        return finish();
      }),
      AppOpenAd.addListener('startAdFailedToShow', (event) => {
        console.log('[AppOpenAd] event:startAdFailedToShow', event);
        return finish();
      }),
    ]);

    cleanup = async () => {
      await Promise.all(handles.map((handle) => handle.remove()));
    };

    try {
      console.log('[AppOpenAd] showStartGameAd:requestNative');
      await AppOpenAd.showStartAd();
      console.log('[AppOpenAd] showStartGameAd:nativeResolved');
    } catch (error) {
      console.error('[AppOpenAd] showStartGameAd:requestFailed', error);
      await finish();
    }
  });
  console.log('[AppOpenAd] showStartGameAd:done');
}

export async function showLevelInterstitialAd() {
  if (!isNativeApp()) return;

  console.log('[LevelInterstitial] start');

  await new Promise(async (resolve) => {
    let settled = false;
    let cleanup = async () => {};

    const finish = async () => {
      if (settled) return;
      settled = true;
      console.log('[LevelInterstitial] finish');
      await cleanup();
      resolve();
    };

    const handles = await Promise.all([
      AdMob.addListener(InterstitialAdPluginEvents.Loaded, async (info) => {
        console.log('[LevelInterstitial] event:loaded', info);
        try {
          await AdMob.showInterstitial();
          console.log('[LevelInterstitial] show:requested');
        } catch (error) {
          console.error('[LevelInterstitial] show:failed', error);
          await finish();
        }
      }),
      AdMob.addListener(InterstitialAdPluginEvents.Showed, () => {
        console.log('[LevelInterstitial] event:showed');
      }),
      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        console.log('[LevelInterstitial] event:dismissed');
        return finish();
      }),
      AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error) => {
        console.log('[LevelInterstitial] event:failedToLoad', error);
        return finish();
      }),
      AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, (error) => {
        console.log('[LevelInterstitial] event:failedToShow', error);
        return finish();
      }),
    ]);

    cleanup = async () => {
      await Promise.all(handles.map((handle) => handle.remove()));
    };

    try {
      console.log('[LevelInterstitial] prepare:start');
      await AdMob.prepareInterstitial({
        adId: SCORE_INTERSTITIAL_AD_ID,
      });
      console.log('[LevelInterstitial] prepare:requested');
    } catch (error) {
      console.error('[LevelInterstitial] prepare:failed', error);
      await finish();
    }
  });

  console.log('[LevelInterstitial] done');
}
