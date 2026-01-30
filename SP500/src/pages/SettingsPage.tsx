import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '../components/common';
import { Layout, Header, Footer } from '../components/layout';
import './SettingsPage.css';

export interface UserSettings {
  defaultInitialCapital: number;
  theme: 'light' | 'dark' | 'system';
  educationalMode: boolean;
  showChartTooltips: boolean;
  confirmTrades: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  defaultInitialCapital: 10000,
  theme: 'light',
  educationalMode: true,
  showChartTooltips: true,
  confirmTrades: true,
};

const STORAGE_KEY = 'sp500_user_settings';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (savedSettings) {
      try {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) });
      } catch {
        // Use defaults if parsing fails
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      setSettings(DEFAULT_SETTINGS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleClearAllData = () => {
    if (confirm('⚠️ WARNING: This will delete ALL your games, transactions, and settings. This cannot be undone. Are you sure?')) {
      if (confirm('This is your last chance to cancel. Delete everything?')) {
        localStorage.clear();
        window.location.href = '/';
      }
    }
  };

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Layout
      header={<Header />}
      footer={<Footer />}
      maxWidth="narrow"
    >
      <div className="settings-page">
        <div className="settings-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1>⚙️ Settings</h1>
        </div>

        {saved && (
          <div className="settings-saved-toast">
            ✅ Settings saved successfully!
          </div>
        )}

        <Card title="Game Defaults" className="settings-section">
          <div className="setting-item">
            <div className="setting-info">
              <label htmlFor="initial-capital">Default Initial Capital</label>
              <p className="setting-description">
                Starting cash amount for new games
              </p>
            </div>
            <div className="setting-control">
              <Input
                id="initial-capital"
                type="number"
                value={settings.defaultInitialCapital}
                onChange={(e) => updateSetting('defaultInitialCapital', Number(e.target.value))}
                min={1000}
                max={1000000}
                step={1000}
              />
            </div>
          </div>
        </Card>

        <Card title="Appearance" className="settings-section">
          <div className="setting-item">
            <div className="setting-info">
              <label>Theme</label>
              <p className="setting-description">
                Choose your preferred color theme
              </p>
            </div>
            <div className="setting-control">
              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value as 'light' | 'dark' | 'system')}
                className="settings-select"
              >
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="system">💻 System</option>
              </select>
            </div>
          </div>
        </Card>

        <Card title="Trading" className="settings-section">
          <div className="setting-item">
            <div className="setting-info">
              <label>Confirm Trades</label>
              <p className="setting-description">
                Show confirmation dialog before executing trades
              </p>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.confirmTrades}
                  onChange={(e) => updateSetting('confirmTrades', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Chart Tooltips</label>
              <p className="setting-description">
                Show price details when hovering over chart
              </p>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.showChartTooltips}
                  onChange={(e) => updateSetting('showChartTooltips', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </Card>

        <Card title="Learning" className="settings-section">
          <div className="setting-item">
            <div className="setting-info">
              <label>Educational Mode</label>
              <p className="setting-description">
                Show helpful tips and explanations throughout the app
              </p>
            </div>
            <div className="setting-control">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={settings.educationalMode}
                  onChange={(e) => updateSetting('educationalMode', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </Card>

        <div className="settings-actions">
          <Button onClick={handleSave} variant="primary">
            💾 Save Settings
          </Button>
          <Button onClick={handleReset} variant="secondary">
            🔄 Reset to Defaults
          </Button>
        </div>

        <Card title="Danger Zone" variant="outlined" className="settings-section danger-zone">
          <div className="setting-item">
            <div className="setting-info">
              <label>Clear All Data</label>
              <p className="setting-description">
                Delete all games, transactions, and settings. This cannot be undone.
              </p>
            </div>
            <div className="setting-control">
              <Button onClick={handleClearAllData} variant="danger" size="small">
                🗑️ Delete Everything
              </Button>
            </div>
          </div>
        </Card>

        <div className="settings-footer">
          <p>S&P 500 Trading Simulator v1.0.0</p>
          <p>Built for educational purposes only</p>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
