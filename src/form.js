import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import PasswordInput from 'react-native-password-strength-meter';
import firebase from '../firebase';
class Form extends React.Component {

  state = {
    input: { 
      email: "",
      password: "",
    },
    error: '',
    isLoged: true,
  }
  async componentDidMount () {
    const { props: { navigation: { push }} } = this;
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      push('Todos', {
        form: false
      });
    } else {
      this.setState({isLoged: false});
    }
  }
  static navigationOptions = {
    title: "Enter Page",
    headerLeft: null

  };

  handleButton = async () => {
    const f = JSON.stringify(this.props.navigation);
    const { state: { input: { email, password }}, props: { navigation: { push, state:{
      params: {
        form
      }
    }
    }
  }
  } = this;
  try {
    if (form === "login") {
      const { user: { uid }} = await firebase.auth().signInWithEmailAndPassword(email, password);
      await AsyncStorage.setItem("userId", uid)
      push('Todos');
    } else {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      push('Form', {
        form: "login"
      });
    }    
  } catch (error) {
    this.setState({ error })
  }
}
handleEmail = (text) => this.setState(prev => ({ input: { ...prev.input, email: text }}));
handlePassword = (text) => this.setState(prev => ({input: { ...prev.input,password: text }}));


  render(){
    const { 
      state: {
        input: { email, password },
        isLoged,
        error
      },
      handleButton,
      handleEmail,
      handlePassword,
      props: {
        navigation: {
          state:{
            params: {
              form
            }
          }
        }
      }
    } = this;    
    return (
    <>
      {!isLoged&&<SafeAreaView style={{margin: 25, flex: 1}}>
        <Text>{error&&<Text>{ error.message }</Text>}</Text>
        <View style={{ alignItems :"center", padding: 5, marginTop: 100}}>
        <TextInput style={styles.text}
          placeholder="Email"
          underlineColorAndroid='rgb(238,238,238)'
          onChangeText={handleEmail}
          keyboardType="email-address"
          returnKeyType='next'
        />
        <View style={{width: "50%", alignItems: "center", marginBottom: 60}}>
        <PasswordInput
          placeholder="Password"
          containerWrapperStyle={{ width: 260}}
          meterType='text'
          width="2%"
          onChangeText={handlePassword}
        />
        </View>
        </View>
        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={handleButton}  >
            <Text style={[{color: 'white'}, styles.button]}>
              {form}
            </Text>
          </TouchableOpacity>
      </SafeAreaView>}
    </>
  );}
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
    },
    button: {
      marginHorizontal: 10,
      fontWeight: "bold",
      justifyContent: "center",
      borderRadius: 3,
      textAlign: "center",
      padding: 4,
      fontFamily: 'sans-serif',
    },
    text: {
      width: "70%",
      textAlign: "left",
      height: 70,
      borderRadius: 3,

    }
  });
  export default Form;