import React, { useState } from 'react';
import { Text, 
         View, 
         StyleSheet, 
         Button
} from 'react-native';
import customAxios from './customAxios';


function test() {

    const [state, setstate] = useState('')

    const testHello = () => {
        customAxios().then(res => {
            res.get('/hello')
                .then(res => {
                    setstate(res)
                })
                .catch(e => {
                    console.log(e)
                })
        })
    }
    
    return (
        <View style={styles.container}>
            <Text>{state}</Text>
            <Button onPress={testHello} title="hello" />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ffffff'
      },
})


export default test
