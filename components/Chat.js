import React from 'react';
import { View, Text, Button, StyleSheet, Platform, KeyboardAvoidingView,} from 'react-native';
import { GiftedChat ,Bubble} from 'react-native-gifted-chat';
const firebase = require('firebase');
require('firebase/firestore');

//may not need this
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
          name: "", 
          color:'', 
          messages:[], 
          user:{}
        };

        // Your web app's Firebase configuration
        const firebaseConfig = {
          apiKey: "AIzaSyBIvOB4ZtGqvnbQihbgi35U5MLU-vJfDdA",
          authDomain: "chat-app-fef27.firebaseapp.com",
          projectId: "chat-app-fef27",
          storageBucket: "chat-app-fef27.appspot.com",
          messagingSenderId: "370863684831",
          appId: "1:370863684831:web:f36764ad2cabfdad56bd6a",
          measurementId: "G-PRJGNF95NQ"
        };

        if (!firebase.apps.length){
          firebase.initializeApp(firebaseConfig);
        }
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);

         // set firestore reference messages
        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.onSend = this.onSend.bind(this);
    }

    componentDidMount() {
      this.referenceChatMessages = firebase.firestore().collection('messages');
      this.unsubscribe = this.referenceChatMessages.onSnapshot(this.onCollectionUpdate)
    }
    
    componentWillUnmount() {
       this.unsubscribe();
    }

    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      // go through each document
      querySnapshot.forEach((doc) => {
        // get the QueryDocumentSnapshot's data
        let data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user,
        });
      });

      this.setState({ messages });
    }



      // add message to firestore
  addMessage = (message) => {
    this.referenceChatMessages.add({
      _id: message[0]._id,
      createdAt: message[0].createdAt,
      text: message[0].text || "",
      user: {
        _id: this.state.user._id,
        name: this.props.route.params.name,
      },
    });
  };

    onSend(messages = []) {
      if (Array.isArray(messages) && messages.length > 0) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        })),
        () => {
          this.addMessage(messages);
        }
      }
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
              _id: this.state.user._id,
            }}
          />
          { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
          }
      </View>
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







// import React from 'react';
// import { View, Text, Button, StyleSheet, Platform, KeyboardAvoidingView,} from 'react-native';
// import { GiftedChat ,Bubble} from 'react-native-gifted-chat';



// export default class Chat extends React.Component {
//     constructor(props){
//         super(props);
//         this.state = { name: "", color:'' };
      
//         this.state={
//           messages:[]
//         }
//     }

//     componentDidMount() {
//       this.setState({
//         messages: [
//           {
//             _id: 1,
//             text: 'Hello developer',
//             createdAt: new Date(),
//             user: {
//               _id: 2,
//               name: 'React Native',
//               avatar: 'https://placeimg.com/140/140/any',
//             },
//           },
//           {
//             _id: 2,
//             text: 'You have entered the chat',
//             createdAt: new Date(),
//             system: true,
//            },
//         ],
//       })
//     }

//     onSend(messages = []) {
//       this.setState(previousState => ({
//         messages: GiftedChat.append(previousState.messages, messages),
//       }))
//     }

//     renderBubble(props) {
//       return (
//         <Bubble
//           {...props}
//           wrapperStyle={{
//             right: {
//               backgroundColor: 'orangered'
//             }
//           }}
//         />
//       )
//     }



//   render() {
//     let color = this.props.route.params.color;
//     let name=this.props.route.params.name; //passes name from Screen1
//     this.props.navigation.setOptions({title:name});
//     return (
//       <View style={[styles.container, { backgroundColor: color }]}>
//           <GiftedChat
//             renderBubble={this.renderBubble.bind(this)}
//             messages={this.state.messages}
//             onSend={messages => this.onSend(messages)}
//             user={{
//               _id: 1,
//             }}
//           />
//           { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
//           }
//       </View>
      
//       // <View style={[styles.container, { backgroundColor: color }]}>
//       //   <Text>Hello Screen2!</Text>
//       //   <Button 
//       //       title="Go to start"
//       //       onPress={()=> this.props.navigation.navigate("Start")}
        
//       //   />
//       // </View>
//     )
//   }
// } 

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     // alignItems: 'center',
//     // justifyContent: 'center'
//   }
// });

