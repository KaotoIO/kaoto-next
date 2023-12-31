import { mountStoreDevtool } from 'simple-zustand-devtools';
import { useSchemasStore } from './schemas.store';

let isDevMode = true;
try {
  isDevMode = NODE_ENV === 'development';
} catch (error) {
  console.warn('NODE_ENV is not defined');
}

if (isDevMode) {
  mountStoreDevtool('Schemas Store', useSchemasStore);
}

export * from './schemas.store';
