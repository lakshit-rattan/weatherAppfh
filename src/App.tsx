import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/theme';
import ApplicationNavigator from './navigators/Application';
import './translations';
import { storage } from './storage';

export const queryClient = new QueryClient();


function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider storage={storage}>
				<ApplicationNavigator />
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
