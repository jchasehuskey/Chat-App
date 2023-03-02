import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';


export default class Chat extends React.Component {
    constructor(props){
        super(props);
        this.state={name:''};
    }




  render() {
    let color = this.props.route.params.color;
    let name=this.props.route.params.name; //passes name from Screen1
    this.props.navigation.setOptions({title:name});
    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <Text>Hello Screen2!</Text>
        <Button 
            title="Go to start"
            onPress={()=> this.props.navigation.navigate("Start")}
        
        />
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center'
  }
});