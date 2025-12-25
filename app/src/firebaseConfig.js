export { analytics, app, auth } from './lib/firebaseConfig.js';

// Provide a harmless default export so Expo Router does not treat this file as a route missing a default React
export default function FirebaseConfig() {
  return null;
}
