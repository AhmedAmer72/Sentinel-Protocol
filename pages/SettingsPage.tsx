
import React from 'react';
import PageWrapper from '../components/animations/PageWrapper';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useTheme } from '../components/providers/ThemeProvider';

const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <PageWrapper key="settings">
      <div className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Theme</span>
              <div className="flex items-center gap-2 rounded-md bg-black/40 p-1">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1 rounded text-sm ${theme === 'light' ? 'bg-white text-black' : 'text-white'}`}
                >
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1 rounded text-sm ${theme === 'dark' ? 'bg-white text-black' : 'text-white'}`}
                >
                  Dark
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default SettingsPage;
