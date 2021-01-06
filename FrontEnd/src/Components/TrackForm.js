import React, { useContext } from 'react';
import {Input, Button } from 'react-native-elements';
import { StyleSheet, View } from 'react-native'
import Spacer from './Spacer';
import { Context as LocationContext } from '../Context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const TrackForm = () => {

    const { state: {name, isRecording, locations }, startRecording, stopRecording, changeName } = useContext(LocationContext);

    const [saveTrack] = useSaveTrack();

    return (
        <View style={styles.container}>
            <Spacer />
            <Input value={name} onChangeText={changeName} placeholder= 'Enter name for the track' />
            <Spacer margin={1}/>

            {isRecording 
            ? <Button 
                icon={ <MaterialCommunityIcons
                    name='stop-circle'
                    size={25} 
                    style={{marginLeft: 20}}
                    />
                }
                iconRight
                title='Stop' 
                onPress={stopRecording}
                buttonStyle={styles.button} 
            />
            : <Button 
                icon={ <MaterialCommunityIcons
                    name='run-fast'
                    size={25} 
                    style={{marginLeft: 20}}
                    />
                }
                iconRight
                title='Start Recording' 
                onPress={startRecording}
                buttonStyle={styles.button}
            />
            }
            <Spacer margin={10}/>
            {!isRecording && locations.length
            ? <Button
                icon={ <MaterialIcons 
                    name='save-alt'
                    size={25}
                    style={{marginLeft: 20}}
                    />
                }
                iconRight
                title='Save Recording' 
                onPress={saveTrack}
            /> 
            : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    button: {
        height: 40,
    }
})

export default TrackForm;