import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAjU_EWiqKNFwzSLrospKPX8fNB_jv1KeI",
  authDomain: "jobfind-2024.firebaseapp.com",
  projectId: "jobfind-2024",
  storageBucket: "jobfind-2024.appspot.com",
  messagingSenderId: "262468371716",
  appId: "1:262468371716:web:27a6537ce5b402f8ddfc51",
  measurementId: "G-B5THK127WR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, analytics, auth, provider };
