import { useState } from 'react';
import { Alert, Button, FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

interface IToDo { 
  id: number;
  name: string;
}
export default function App() {
  const [todo, setToDo] = useState('');
  const [listToDo, setListToDo] = useState<IToDo[]>([]);

  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddToDo = () => { 
    if (!todo) {
      Alert.alert('Lỗi input', 'Please enter a todo',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ]
      )
      return;
    }
    setListToDo([...listToDo,
      { id: randomInteger(1, 1000), name: todo }]);
    setToDo('');
  }

  const deleteToDo = (id: number) => {
    setListToDo(listToDo.filter(item => item.id !== id));
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/*header*/}
        <Text style={styles.header}>Minh Hien Mobile App</Text>

        {/* form */}
        <View style={styles.body}>
          <TextInput style={styles.todoInput}
            onChangeText={(value) => setToDo(value)}
            value={todo}
          />
          <Button title='Add ToDo'
            onPress={handleAddToDo} />
        </View>

        {/* list todo */}
        <View style={styles.body}>
          <FlatList
            data={listToDo}
            keyExtractor={item => item.id + ""}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => deleteToDo(item.id)}
                  style={({ pressed }) => [
                    {
                      backgroundColor: pressed ? 'lightgray' : 'white',
                    },
                  ]}
                >
                  <Text style={styles.todoItem}>{item.name}</Text>
                </Pressable>
              )
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
      
    
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'orange',
    paddingHorizontal: 20,
    textAlign: 'center',
    fontSize: 40,
  },
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  todoInput: {
    borderBottomWidth: 1,
    borderBottomColor: "green",
    padding: 5,
    margin: 15,
  },
  todoItem: {
    fontSize: 20,
    marginVertical: 5,
    marginBottom: 10,
    borderStyle: "dashed",
    borderWidth: 1,
    padding: 5,
  },
  body: {
    padding: 10,
  },
});
