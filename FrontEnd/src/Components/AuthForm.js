import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText, errorMessage, onSubmit, submitText}) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <>
            <Spacer>
            <Text h3 style={{alignSelf: 'center'}}>{headerText}</Text>
        </Spacer>
        <Spacer margin= {20}/>
            <Input 
                label='Email Address'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                autoCorrect={false} 
            />
        
            <Input 
                secureTextEntry
                label='Password' 
                value={password}
                onChangeText={setPassword}
                autoCapitalize='none'
                autoCorrect={false}
            />
            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <Spacer margin={10}>
            <Button 
                title={submitText} 
                onPress={() => onSubmit({email, password})}    
            />
        </Spacer>
        </>
    );

}

const styles = StyleSheet.create({
    error: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15
    }
});

export default AuthForm;