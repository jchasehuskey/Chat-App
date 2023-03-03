import React from 'react';
import { View, Text, Button, StyleSheet, Platform, KeyboardAvoidingView,} from 'react-native';
import { GiftedChat ,Bubble} from 'react-native-gifted-chat';



export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = { name: "", color:'' };
      
        this.state={
          messages:[]
        }
    }

    componentDidMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 2,
            text: 'You have entered the chat',
            createdAt: new Date(),
            system: true,
           },
        ],
      })
    }

    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }

    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: 'orangered'
            }
          }}
        />
      )
    }



  render() {
    let color = this.props.route.params.color;
    let name=this.props.route.params.name; //passes name from Screen1
    this.props.navigation.setOptions({title:name});
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
          <GiftedChat
            renderBubble={this.renderBubble.bind(this)}
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
          }
      </View>
      
      // <View style={[styles.container, { backgroundColor: color }]}>
      //   <Text>Hello Screen2!</Text>
      //   <Button 
      //       title="Go to start"
      //       onPress={()=> this.props.navigation.navigate("Start")}
        
      //   />
      // </View>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: 'center',
    // justifyContent: 'center'
  }
});