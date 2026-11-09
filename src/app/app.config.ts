import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideDatabase,
  getDatabase
} from '@angular/fire/database';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'TU_API_KEY',
        authDomain: 'TU_AUTH_DOMAIN',
        databaseURL: 'TU_DATABASE_URL',
        projectId: 'TU_PROJECT_ID',
        storageBucket: 'TU_STORAGE_BUCKET',
        messagingSenderId: 'TU_SENDER_ID',
        appId: 'TU_APP_ID'
      })
    ),

    provideDatabase(() => getDatabase())
  ]
};