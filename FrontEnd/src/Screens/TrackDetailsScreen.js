import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Circle, Polyline } from 'react-native-maps';
import { Context as TrackContext } from '../Context/TrackContext';

const TrackDetailsScreen = ({route}) => {

    const { state } = useContext(TrackContext);
    const {_id} = route.params;
    const track = state.find(t => t._id === _id)
    const initialCoords = track.locations[0].coords
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{track.name}</Text>
            <MapView
                initialRegion={{
                    ...initialCoords,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }}
                style={styles.map}
            >
                <Circle 
                    center={track.locations[0].coords}
                    radius={10}
                    strokeColor= 'rgb(0, 0, 0)'
                    fillColor= 'rgb(10, 0, 0)'
                />
                <Circle 
                    center={track.locations[track.locations.length - 1].coords}
                    radius={10}
                    strokeColor= 'rgb(0, 0, 0)'
                    fillColor= 'rgb(10, 0, 0)'
                />
                <Polyline coordinates={track.locations.map(loc => loc.coords)}/>
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:30
    },

    header: {
        fontSize: 48,
        alignSelf: 'center',
        marginBottom: 20
    },

    map: {
        height: 300
    }
});

export default TrackDetailsScreen;