import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage
} from 'react-native';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
    state = {
      isLoged: false,
    }
    async componentDidMount(){
      const userId = await AsyncStorage.getItem("userId");    
      if (userId) {
        this.setState({isLoged: true});
      } else {
        this.setState({isLoged: false});
      }
    }
    render(){    
      const {
        props: { navigation: { navigate }},
        state: { isLoged }
    } = this;    
      return (
      <>
        <SafeAreaView style={{margin: 25, flex: 1}}>
          <View style={{ alignItems :"center", padding: 5}}>
            <Text style={styles.title}>Welcome in to the Best Todo App</Text>
            {!isLoged?
              <>
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
              </>
            :
            <View style={{ padding: 5}}>
              <Button color="gray" onPress={() => navigate('Todos')} title="Go To Todo" />
            </View>
            }
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