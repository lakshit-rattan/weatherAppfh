import 'react-native-gesture-handler';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from './navigators/Application';
import { storage } from './storage';

function App() {
	return (
		<ThemeProvider storage={storage}>
			<ApplicationNavigator />
		</ThemeProvider>
	);
}

export default App;
