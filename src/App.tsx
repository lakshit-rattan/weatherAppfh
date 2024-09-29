import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import ApplicationNavigator from './navigators/Application';
import { store } from './redux/store';

function App() {
	return (
		<Provider store={store}>
			<ApplicationNavigator />
		</Provider>
	);
}

export default App;
