React Native Weather Application

The application is now fully integrated with Redux and Redux-Saga, as per the requirements. Below are the key highlights:

	•	Redux + Saga Integration: The app now manages states, including weather data and user interactions, using Redux and Redux-Saga. This ensures efficient handling of asynchronous API calls and state updates.

	•	Offline Data Storage (Bonus Point): Leveraging Redux along with react-native-mmkv, the app now caches weather data. Users can view the last fetched weather data even when offline. Additionally, upon app startup, the weather for the last searched city is automatically displayed.

	•	Best Practices: Care has been taken in updating and refining the file structure, along with type safeties in order to use all the best practices that I am aware of. The application is fully working and compatible with android & iOS devices.


Requirements: 
-> Node v20 <br/>
Step 1 : run yarn install <br/>
Step 2 : Create a .env file by copying content from .env.example file <br/>
Step 3 : run 'yarn start --reset-cache' <br/>
Step 4 : enter 'a' after metro runs for android (ensure emulator/device is connected via 'adb devices') <br/>
Step 5 : App tested working for iOS on XCode 16.0 <br/>

Link for APK - https://drive.google.com/file/d/1h_2NqHwaoF0fracvw00IeR0RH0pi1uwQ/view?usp=sharing
