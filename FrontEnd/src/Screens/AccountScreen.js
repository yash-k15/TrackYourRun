import React, { useContext}  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-elements';
import { Context as AuthContext } from '../Context/AuthContext';
import { Entypo } from '@expo/vector-icons'
import Spacer from '../Components/Spacer';

const AccountScreen = () => {
    const { signout } = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <Text style={{fontSize: 48, alignSelf:'center', marginTop: 30}}>Account</Text>
            <Spacer margin={50}/>
            <Button 
                icon={ <Entypo
                    name='log-out'
                    size={20} 
                    style={{marginLeft: 15}}
                    />
                }
                iconRight
                buttonStyle={styles.button}
                title="Sign Out" 
                onPress={signout} 
            /> 
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 30,
        height: 45
    }
});

export default AccountScreen;