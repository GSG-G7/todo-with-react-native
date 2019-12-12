import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import firebase from '../firebase';
class Todos extends React.Component {
  static navigationOptions = {
    title: 'Todos',
    headerLeft: null
  };
  state = {
    todos: [1, 2],
    text: '',
    isEditable: false,
    index: 0,
    userId: -1,
    isLoged: false,
  }
  getDataFromFireBase = (isEditable, index) => {
    const db = firebase.firestore();
    try {
      let todos = [];
      db.collection("todos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            todos = [...todos, {id: doc.id ,...doc.data()}];
        });
        this.setState(() => {
          if (index === -1) {
            return ({ todos, text: "", isEditable, index })
          }
          return ({ todos, text: "" })
        })
    })
      } catch (error) {
        console.log(error);
      }
  }
  componentDidMount(){
    try {
      let userId = AsyncStorage.getItem('userId');
      const db = firebase.firestore();
      let todos = [];
      db.collection("todos").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            todos = [...todos, {id: doc.id ,...doc.data()}];
        });
        return todos;
    }).then((todos) => {
      if (userId) {
        this.setState({ isLoged: true, userId, todos })
      }
    });
      } catch (error) {
      console.log(error);
    }
  }

    handleClickAdd = async () => {
      const db = firebase.firestore();
      const uid = await AsyncStorage.getItem('userId');
      const { text } = this.state;
      await db.collection("todos").add({ text, uid })
      this.getDataFromFireBase();
      }
    
    handleDelete = async (id) => {
      const db = firebase.firestore();
      db.collection("todos").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
        this.getDataFromFireBase();
      })
    }

    handleEdit = async (id) => {
      const db = firebase.firestore();
      const { text } = this.state;
      db.collection("todos").doc(id).update({ text }).then(() => {
        console.log("Document successfully deleted!");
        this.getDataFromFireBase(false, -1);
        AsyncStorage.removeItem('TODO');
      })

    }

    render(){    
      const { 
        state: {
          text, todos, isEditable, index: indexstate, isLoged, userId
        }, handleClickAdd, handleDelete, handleEdit ,
        props: { navigation: { push }},
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

            {/* map */}
            {userId!==-1&&todos.map(({id, text, uid}, index) => {
              console.log("item", todos);
              
              if (index !== 0 && uid === userId._55) {
                return <View  style={[styles.twoButtons,{margin: 20}]}>
               {(isEditable&&indexstate=== index)?(
               <TextInput style={styles.editText}
                  placeholder="Edit todo"
                  defaultValue={text}
                  onSubmitEditing={({ nativeEvent: { text }}) =>{
                    if (text) {
                      handleEdit(id);
                    }
                  }}
                  onChangeText={(text) => {
                    this.setState({text});
                  }
                  }
                />
                ):(<><Text onPress={() => this.setState(prev => ({isEditable: !prev.isEditable, index}))} >{text}</Text></>)}
               <View 
               style={{
                  flexDirection:"row",
                  paddingLeft: 10,
                  width:"90%",
                  justifyContent: "flex-start"
               }}>{(isEditable&&indexstate=== index)&&(
               <>
               <TouchableOpacity  style={[styles.button, {backgroundColor: 'red'}]} title="Delete" onPress={() => handleDelete(id)}>
                  <Text style={[{color: 'white'}, styles.button]}>Delete</Text>
               </TouchableOpacity>

               <TouchableOpacity style={[styles.button, {backgroundColor: 'gray'}]} color="gray" title="Edit" onPress={() => this.setState(prev => ({isEditable: !prev.isEditable, index: -1, text: ''}))}>
                  <Text style={[{color: 'white'}, styles.button]}>Hide</Text>
               </TouchableOpacity>
               </>)}
               </View>
             </View>
              }   
              
            })}
            </View>
            {isLoged&&
              <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} color="gray" title="Edit" onPress={() => {
                AsyncStorage.removeItem('userId');
                push('Home')
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