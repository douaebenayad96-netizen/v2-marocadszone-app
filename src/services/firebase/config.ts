
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAL4aYU-jILezsww-iklbm8LDSVYTd_hpQ",
  authDomain: "marocadszone-2298a.firebaseapp.com",
  projectId: "marocadszone-2298a",
  storageBucket: "marocadszone-2298a.firebasestorage.app",
  messagingSenderId: "119454322506",
  appId: "1:119454322506:web:d9bd82c0705b9f54d4fbb3",
  measurementId: "G-9NR7JVRE4Q"
};

// Initialize Firebase - avoid duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();

// Optional: Add scopes for more user info
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Facebook specific scopes
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Twitter specific scopes  
twitterProvider.addScope('tweet.read');
twitterProvider.addScope('users.read');

// Set custom parameters for better user experience
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

facebookProvider.setCustomParameters({
  display: 'popup'
});

export default app;
