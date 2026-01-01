import { AuthProvider } from '../context/AuthContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        {/* SVG Filters for Color Blind Modes */}
        <div className="colorblind-filters" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <svg>
            <defs>
              {/* Deuteranopia filter - Red-green color blindness (green weak) */}
              <filter id="deuteranopia" colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0
                                                     0.7, 0.3, 0, 0, 0
                                                     0, 0.3, 0.7, 0, 0
                                                     0, 0, 0, 1, 0"/>
              </filter>
              {/* Protanopia filter - Red-green color blindness (red weak) */}
              <filter id="protanopia" colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0
                                                     0.558, 0.442, 0, 0, 0
                                                     0, 0.242, 0.758, 0, 0
                                                     0, 0, 0, 1, 0"/>
              </filter>
              {/* Tritanopia filter - Blue-yellow color blindness */}
              <filter id="tritanopia" colorInterpolationFilters="sRGB">
                <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0
                                                     0, 0.433, 0.567, 0, 0
                                                     0, 0.475, 0.525, 0, 0
                                                     0, 0, 0, 1, 0"/>
              </filter>
            </defs>
          </svg>
        </div>
        <Component {...pageProps} />
      </AccessibilityProvider>
    </AuthProvider>
  );
}

