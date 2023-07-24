import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import EventCreationScreen from './screens/EventCreationScreen'
import EventResponseScreen from './screens/EventResponderScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import EntryScreen from './screens/EntryScreen'
import SettingsScreen from './screens/SettingsScreen'
import CreateGroupScreen from './screens/CreateGroupScreen'

//Amplify Stuff
import { Amplify, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './src/aws-exports';

const Stack = createNativeStackNavigator();

//Auth Configuration (Login stuff)
Amplify.configure(awsconfig);
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:04b66024-8cb8-4799-9bbf-8a03a3e937e1',

    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    //identityPoolRegion: 'XX-XXXX-X',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_HP2LSOYF8',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '3bhjhpkd0dk40q7i2tgjai8i8',

    //TODO: Implement later
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    //mandatorySignIn: false,

    //TODO: Implement later
    // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
    // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
    //signUpVerificationMethod: 'code', // 'code' | 'link'

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    /* cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      domain: '.yourdomain.com',
      // OPTIONAL - Cookie path
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
      sameSite: 'strict' | 'lax',
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      secure: true,
    },*/

    // OPTIONAL - customized storage object
    //storage: MyStorage,

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    //authenticationFlowType: 'USER_PASSWORD_AUTH',

    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    //clientMetadata: {myCustomKey: 'myCustomValue'},

    // OPTIONAL - Hosted UI configuration
    /*oauth: {
      domain: 'your_cognito_domain',
      scope: [
        'phone',
        'email',
        'profile',
        'openid',
        'aws.cognito.signin.user.admin',
      ],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    },*/
  },
});


// You can get the current config object
const currentConfig = Auth.configure();



export default function App() {
  this.state={
    userID:"",
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entry">
        <Stack.Screen options={{headerShown:false, presentation:'card'}} name = "Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen options={{headerShown:true, presentation:'card'}} name="Event Creation" component={EventCreationScreen} />
        <Stack.Screen options={{headerShown:true, presentation:'card'}} name="Event Response" component={EventResponseScreen} />
        <Stack.Screen options={{headerShown:false, presentation:'card'}} name="Entry" component={EntryScreen} />
        <Stack.Screen options={{headerShown:false, presentation:'card'}} name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown:false, presentation:'card'}} name="Registration" component={RegisterScreen} />
        <Stack.Screen options={{headerShown:false, presentation:'card'}} name="Settings" component={SettingsScreen} />
        <Stack.Screen options={{headerShown:false, presentation:'card'}} name="Groups" component={CreateGroupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

