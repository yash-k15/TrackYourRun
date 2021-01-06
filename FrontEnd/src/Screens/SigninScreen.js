import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { Context as AuthContext } from '../Context/AuthContext';
import AuthForm from '../Components/AuthForm';
import NavLink from '../Components/NavLink';
import Spacer from '../Components/Spacer';

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

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
            headerText="Sign In for Tracker"
            errorMessage={state.errorMessage}
            onSubmit={signin}
            submitText="Sign In"
        />
        <Spacer />
        <NavLink 
            routeName='SignUp'
            text="Don't have an account? Go back to Sign Up"
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

// SigninScreen.navigationOptions = () => {
//     return {
//         headerShown: false
//     };
// }

SigninScreen.navigationOptions = () => {
    return {
      headerShown: false,
    };
  };

export default SigninScreen;