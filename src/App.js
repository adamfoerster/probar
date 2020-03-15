import React from 'react';
import RankingContextProvider from './contexts/RankingContext';
import Page from './components/Page';

function App() {
  return (
    <div className="App">
      <RankingContextProvider>
        <Page></Page>
      </RankingContextProvider>
    </div>
  );
}

export default App;
