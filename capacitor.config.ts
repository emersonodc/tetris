import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.emersonoliver.tetris',
  appName: 'Tetrix',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
