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

class Login extends React.Component {
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
      const {navigate} = this.props.navigation;    
      return (
      <>
        <SafeAreaView style={{margin: 25, backgroundColor: "black", flex: 1}}>
          <View style={{ alignItems :"center", padding: 5}}>
            <Text style={{color: "red"}}
            >
                Register With 
                <Text color="blue">GOOGLE</Text>
            </Text>
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
  export default Login