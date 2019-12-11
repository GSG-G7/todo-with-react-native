import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  Button,
  AsyncStorage,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
class Todos extends React.Component {
  static navigationOptions = {
    title: 'Todos',
  };
  state = {
    todos: [1, 2],
    text: '',
    isEditable: false,
    index: 0,
    isLoged: false,
  }
  async componentDidMount(){
    try {
      let todos = await AsyncStorage.getItem('TODO');
      let userId = await AsyncStorage.getItem('userId');
      if (userId) {
        this.setState({ isLoged: true})
      }
        todos = JSON.parse(todos);
        this.setState({todos})
      } catch (error) {
      console.log(error);
    }
  }

    handleClickAdd = async () => {
      const { text } = this.state;
      if (text) {  
        let todos = await AsyncStorage.getItem('TODO');
        todos = JSON.parse(todos);
        todos = [text, ...todos];
        this.setState({todos, text: ''});
        todos = JSON.stringify(todos);
        await AsyncStorage.setItem("TODO", todos); 
      }
    }

    handleDelete = async (index) => {
      let todos = await AsyncStorage.getItem('TODO');
      todos = JSON.parse(todos);
      todos.splice(index, 1);
      this.setState({ todos });
      todos = JSON.stringify(todos);
      await AsyncStorage.setItem('TODO', todos);
    }

    handleEdit = async (index) => {
      let todos = await AsyncStorage.getItem('TODO');
      todos = JSON.parse(todos);
      const { text } = this.state;
      todos[index] = text;
      this.setState({ todos, text: '', isEditable: false, index: -1 });
      todos = JSON.stringify(todos);
      await AsyncStorage.setItem('TODO', todos);
    }

    render(){    
      const { 
        state: {
          text, todos, isEditable, index: indexstate, isLoged
        }, handleClickAdd, handleDelete, handleEdit ,
        props: { navigation: { navigate }},

      } = this;   
      return (
      <>
        <SafeAreaView style={{margin: 25}}>
          <View  style={{ alignItems :"flex-start", padding: 5}}>
          <TextInput style={styles.text}
            placeholder="Type here to add todo!"
            onChangeText={(text) => this.setState({text, isEditable: false, index: -1})}
            value={!isEditable?text: ''}
            onSubmitEditing={({ nativeEvent: { text }}) =>{
              if (text) {
                handleClickAdd();
              }
            }}
          />
          </View>
          <View  style={{ alignItems :"flex-start", padding: 5}}>
          <TouchableOpacity style={[styles.button, {backgroundColor: "red"}]} onPress={() => handleClickAdd()}  >
            <Text style={[{color: 'white'}, styles.button]}>
              Add Todo
            </Text>
          </TouchableOpacity>
          </View>
            <ScrollView >
          <View style={{marginTop: 30, marginBottom: 100, padding: 20}}>
            {todos.map((item, index) => {           
              return <View  style={[styles.twoButtons,{margin: 20}]}>
               {(isEditable&&indexstate=== index)?(
               <TextInput style={styles.editText}
                  placeholder="Edit todo"
                  defaultValue={item}
                  onSubmitEditing={({ nativeEvent: { text }}) =>{
                    if (text) {
                      handleEdit(index);
                    }
                  }}
                  onChangeText={(text) => {
                    this.setState({text});
                  }
                  }
                />
                ):(<><Text onPress={() => this.setState(prev => ({isEditable: !prev.isEditable, index}))} >{item}</Text></>)}
               <View 
               style={{
                  flexDirection:"row",
                  paddingLeft: 10,
                  width:"90%",
                  justifyContent: "flex-start"
               }}>{(isEditable&&indexstate=== index)&&(
               <>
               <TouchableOpacity  style={[styles.button, {backgroundColor: 'red'}]} title="Delete" onPress={() => handleDelete(index)}>
                  <Text style={[{color: 'white'}, styles.button]}>Delete</Text>
               </TouchableOpacity>

               <TouchableOpacity style={[styles.button, {backgroundColor: 'gray'}]} color="gray" title="Edit" onPress={() => this.setState(prev => ({isEditable: !prev.isEditable, index: -1, text: ''}))}>
                  <Text style={[{color: 'white'}, styles.button]}>Hide</Text>
               </TouchableOpacity>
               </>)}
               </View>
             </View>
            })}
            </View>
            {isLoged&&
              <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} color="gray" title="Edit" onPress={() => {
                AsyncStorage.removeItem('userId');
                navigate('Home')
                }}>
                    <Text style={[{color: 'white', textAlign: 'center'}, styles.button]}>Logout</Text>
              </TouchableOpacity>
            }
            </ScrollView>

        </SafeAreaView>
      </>
    );
  }
  };
  const styles = StyleSheet.create({
    twoButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      height: 40
    },
    button: {
      marginHorizontal: 10,
      fontWeight: "bold",
      justifyContent: "center",
      borderRadius: 3,
      padding: 4,
      fontFamily: 'sans-serif',
    },
    editText: {
      width: "28%",
      textAlign: "left",
      height: 40,
      borderWidth: 1,
      borderColor: 'red',
      borderRadius: 3,
      padding: 4,
      fontFamily: 'sans-serif',
    },
    text: {
      width: "70%",
      textAlign: "center",
      height: 40,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: 'red'
    }
  });

  export default Todos