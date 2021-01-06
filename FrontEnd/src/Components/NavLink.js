import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
//import { withNavigation } from 'react-navigation'
import { useNavigation } from '@react-navigation/native';

const NavLink = ({ routeName, text}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)} style={{alignItems: 'center'}}>
            <Text style={styles.link}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    link: {
        color: 'blue',
    }
});

export default NavLink;