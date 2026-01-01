import { AuthProvider } from '../context/AuthContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <Component {...pageProps} />
      </AccessibilityProvider>
    </AuthProvider>
  );
}

