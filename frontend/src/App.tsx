import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PageLayout } from './components/PageLayout';
import { AuthenticatedTemplate } from '@azure/msal-react';
import { ProfileContent } from './components/ProfileContent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. A website by Syam,
          Victor, Muhammed, Vivian, Derek, Jennifer!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <PageLayout>
          <AuthenticatedTemplate>
            <ProfileContent />
          </AuthenticatedTemplate>
        </PageLayout>
      </header>
    </div>
  );
}

export default App;
