import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  StatusBar,
  Button
} from 'react-native';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
    state = {
      todos: [1, 2, 3],
      text: '',
      isEditable: false,
      index: 0
    }
    
    render(){    
      const { navigation: { navigate }} = this.props;    
      return (
      <>
        <SafeAreaView style={{margin: 25, flex: 1}}>
          <View style={{ alignItems :"center", padding: 5}}>
            <Text style={styles.title}>Welcome in to the Best Todo App</Text>
            <View style={{ padding: 5}}>
              <Button color="blue" onPress={() => navigate('Form', {
                form: "login"
              })} title="Login" />
            </View>
            <View style={{ padding: 5}}>
              <Button color="red" onPress={() => navigate('Form', {
                form: "register"
              })} title="Register" />
            </View>
            <View style={{ padding: 5}}>
              <Button color="gray" onPress={() => navigate('Todos')} title="Go To Todo" />
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
  };
  const styles = StyleSheet.create({
    title: {
      fontFamily: 'sans-serif',
      fontSize: 32,
      color: "red",
      textAlign: "center",
      marginVertical: 60,
      marginTop: 140,
      marginHorizontal: 10,
    }
  });
  export default Home