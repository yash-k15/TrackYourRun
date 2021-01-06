import React, { useContext, useEffect } from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Spacer from '../Components/Spacer'; 
import { Context as AuthContext } from '../Context/AuthContext';
import AuthForm from '../Components/AuthForm';
import NavLink from '../Components/NavLink';

const SignupScreen = () => {
    const {state, signup, clearErrorMessage, tryLocalSignin } = useContext(AuthContext);

    // useEffect(() => {
    //     tryLocalSignin();
    // }, [])

    useFocusEffect(
        React.useCallback(() => {
            return () => clearErrorMessage();
        }, [])
    )

    return (
        <SafeAreaView>
        <ScrollView>
        <View style={styles.container}>
        
        <AuthForm 
            headerText="Sign Up for Tracker"
            errorMessage={state.errorMessage}
            onSubmit={signup}
            submitText="Sign Up"
        />
        <Spacer />
        <NavLink 
            routeName='SignIn'
            text="Already have an Account? Sign in instead"
        />
        </View>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        marginTop: 100,
        marginBottom: 50,
        marginHorizontal: 25
    }
});

// SignupScreen.navigationOptions = () => {
//     return {
//         header: null
//     };
// }

export default SignupScreen;