import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAccessibility } from '../context/AccessibilityContext';
import { Settings as SettingsIcon, Type, Eye, Zap, Palette, RotateCcw } from 'lucide-react';

export default function Settings() {
  const { settings, updateSetting, resetSettings } = useAccessibility();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <SettingsIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Settings</h1>
                <p className="text-gray-600">Customize your Pennywise experience</p>
              </div>
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
            <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-4">
              <h2 className="text-emerald-900">Accessibility Options</h2>
              <p className="text-emerald-700 text-sm mt-1">
                Adjust these settings to make Pennywise easier to use
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {/* Font Size */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Type className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">Text Size</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Adjust the size of all text throughout the app
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button
                        onClick={() => updateSetting('fontSize', 'small')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          settings.fontSize === 'small'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-sm">Small</span>
                      </button>
                      <button
                        onClick={() => updateSetting('fontSize', 'medium')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          settings.fontSize === 'medium'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-base">Medium</span>
                      </button>
                      <button
                        onClick={() => updateSetting('fontSize', 'large')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          settings.fontSize === 'large'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-lg">Large</span>
                      </button>
                      <button
                        onClick={() => updateSetting('fontSize', 'extra-large')}
                        className={`px-4 py-3 rounded-lg border-2 transition-all ${
                          settings.fontSize === 'extra-large'
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl">Extra Large</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* High Contrast */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900">High Contrast Mode</h3>
                      <button
                        onClick={() => updateSetting('highContrast', !settings.highContrast)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.highContrast ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={settings.highContrast}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Increase contrast between text and background for better readability
                    </p>
                  </div>
                </div>
              </div>

              {/* Reduced Motion */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900">Reduced Motion</h3>
                      <button
                        onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.reducedMotion ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={settings.reducedMotion}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Minimize animations and transitions throughout the app
                    </p>
                  </div>
                </div>
              </div>

              {/* Enhanced Focus Indicators */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-gray-900">Enhanced Focus Indicators</h3>
                      <button
                        onClick={() => updateSetting('focusIndicators', !settings.focusIndicators)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.focusIndicators ? 'bg-emerald-500' : 'bg-gray-300'
                        }`}
                        role="switch"
                        aria-checked={settings.focusIndicators}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.focusIndicators ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Show prominent outlines when navigating with keyboard
                    </p>
                  </div>
                </div>
              </div>

              {/* Color Blind Mode */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Palette className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">Color Blind Friendly Mode</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Adjust colors to accommodate different types of color vision deficiency
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <button
                        onClick={() => updateSetting('colorBlindMode', 'none')}
                        className={`px-4 py-3 rounded-lg border-2 text-left transition-all ${
                          settings.colorBlindMode === 'none'
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <span className="text-gray-900">None</span>
                        <p className="text-xs text-gray-600 mt-1">Standard colors</p>
                      </button>
                      <button
                        onClick={() => updateSetting('colorBlindMode', 'deuteranopia')}
                        className={`px-4 py-3 rounded-lg border-2 text-left transition-all ${
                          settings.colorBlindMode === 'deuteranopia'
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <span className="text-gray-900">Deuteranopia</span>
                        <p className="text-xs text-gray-600 mt-1">Red-green (green weak)</p>
                      </button>
                      <button
                        onClick={() => updateSetting('colorBlindMode', 'protanopia')}
                        className={`px-4 py-3 rounded-lg border-2 text-left transition-all ${
                          settings.colorBlindMode === 'protanopia'
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <span className="text-gray-900">Protanopia</span>
                        <p className="text-xs text-gray-600 mt-1">Red-green (red weak)</p>
                      </button>
                      <button
                        onClick={() => updateSetting('colorBlindMode', 'tritanopia')}
                        className={`px-4 py-3 rounded-lg border-2 text-left transition-all ${
                          settings.colorBlindMode === 'tritanopia'
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <span className="text-gray-900">Tritanopia</span>
                        <p className="text-xs text-gray-600 mt-1">Blue-yellow</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-900 mb-1">Reset All Settings</h3>
                <p className="text-gray-600 text-sm">
                  Restore all accessibility settings to their default values
                </p>
              </div>
              <button
                onClick={resetSettings}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-blue-900 mb-2">💡 Accessibility Tip</h3>
            <p className="text-blue-700 text-sm">
              These settings are saved automatically and will persist across sessions. 
              You can also use your browser's built-in accessibility features in combination 
              with these settings for the best experience.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
