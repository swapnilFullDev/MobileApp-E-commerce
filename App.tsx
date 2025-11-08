/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import AppContainer from './src/app/AppContainer';
import { AppProviders } from './src/app/AppProviders';
import { AppNavigator } from './src/navigation';

function App() {
  return (
    <AppProviders>
      <AppContainer>
        <AppNavigator />
      </AppContainer>
    </AppProviders>
  );
}

export default App;
