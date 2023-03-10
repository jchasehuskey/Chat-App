import React from 'react';
import { View, Text, Button , TextInput, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';


const backgroundColors = {
  black: { backgroundColor: '#000000'},
  grey: { backgroundColor: '#8a95a5'},
  purple: { backgroundColor: '#474056'},
  green: { backgroundColor: '#94ae89'}
}

export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", color:'' };
      }


  render() {
    const { black, purple, grey, green } = backgroundColors;
    return (
      <View style={styles.container}>
        <ImageBackground 
          source={require('../assets/background-img.png')}
          style={[styles.container, styles.image]}
          >
          <View style={styles.inputcontainer}>
              <Text>Hello Screen1!</Text>
              <TextInput 
                style={styles.nameBox}
                onChangeText={(name)=> this.setState({name})}
                value={this.state.name}
                placeholder="Your Name"
              />
              <View>
                <Text style={styles.chooseColor}>Choose your background color</Text>
                <View style={styles.colorWrapper}>
                  <TouchableOpacity style={[styles.color, backgroundColors.black]}
                    onPress={() =>
                      this.setState({ color: black.backgroundColor })
                    }
                  />
                  <TouchableOpacity style={[styles.color, backgroundColors.grey]}
                    onPress={() =>
                      this.setState({ color: grey.backgroundColor })
                    }
                  />
                  <TouchableOpacity style={[styles.color, backgroundColors.purple]}
                    onPress={() =>
                      this.setState({ color: purple.backgroundColor })
                    }
                  />
                  <TouchableOpacity style={[styles.color, backgroundColors.green]}
                    onPress={() =>
                      this.setState({ color: green.backgroundColor })
                    }
                  />
                </View>
             </View>
              
             <TouchableOpacity
              style={[styles.nameBox, styles.chatButton]}
              onPress={() =>
                this.props.navigation.navigate('Chat',
                  {
                    name: this.state.name,
                    color: this.state.color
                  })
              }
             >
              
              <Text
                style={[styles.colorText, styles.chatBoxText]}>Start Chatting</Text>

             </TouchableOpacity> 
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({


  container:{
    flex:1,
  },

  image: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  inputcontainer: { 
    backgroundColor: '#fff',
    marginBottom: 15,
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20, 
    position:'absolute',
    bottom:0
 
  }, 


  nameBox: {
    height: 50,
    width: '88%',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 2,
    color: '#757083',
    opacity: 50,
    fontSize: 16,
    fontWeight: '300',
    paddingLeft: 10
 },

  chooseColor:{
    fontSize:16,
    fontWeight:'300',
    color:' #757083',
    opacity:100
  },

  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10
  },

  colorWrapper:{
    flexDirection:'row'
  },

  chatButton:{
    backgroundColor: '#757083',
    justifyContent: 'center'
  },
  chatBoxText: {
    color: '#fff',
    fontWeight: '600',
  
  }, 
  colorText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100
  },

});