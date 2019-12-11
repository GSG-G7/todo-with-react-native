/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import Home from "./src/home";
import Todos from "./src/todo";
import Form from "./src/form";


const MainNavigator = createStackNavigator({
  Home,
  Todos,
  Form,
})
const App = createAppContainer(MainNavigator);

export default App;
