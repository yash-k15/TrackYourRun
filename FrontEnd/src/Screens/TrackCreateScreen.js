import '../_mockLocation'; 
import React, { useCallback, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native'
import Map from '../Components/Map';
import { Context as LocationContext } from '../Context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../Components/TrackForm';
import Spacer from '../Components/Spacer';


const TrackCreateScreen = () => {
    const { addLocation, state: { isRecording } } = useContext(LocationContext);
    const callback = useCallback((location) => {
        addLocation(location, isRecording)}, [isRecording])

    const [error] = useLocation( useIsFocused() || isRecording, callback);
    
   
    return (  
        
        <SafeAreaView forceInset={{top: 'always'}}>
            <Text style={styles.header}>Track Your Movement</Text>
            <Spacer margin={10}/>
            <Map />
            {error && <Text>Please Enable location services</Text>}
            <TrackForm />
        </SafeAreaView>
    );
}
   
// TrackCreateScreen.navigationOptions = {
//     title: 'Create Track',
//     tabBarIcon: <FontAwesome name='plus' size={20}/>
// }
 
const styles = StyleSheet.create({
    text: {
        alignSelf: 'center'
    },
    header: {
        fontSize: 38,
        alignSelf: 'center',
        marginTop: 10
    }
});

export default TrackCreateScreen;