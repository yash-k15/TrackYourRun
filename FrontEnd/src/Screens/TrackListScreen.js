import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Context as TrackContext } from '../Context/TrackContext';

const TrackListScreen = ({ navigation }) => {

    const { state, fetchTracks } = useContext(TrackContext);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          fetchTracks();
        });
    
        return unsubscribe;
      }, [navigation]);

    return (
            <FlatList style={styles.container}
                ListHeaderComponent={
                    <>
                     <Text style={styles.header}>Tracks</Text>
                    </>
                }
                data={state}
                keyExtractor={item => item._id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('TrackDetails', {_id: item._id})}>
                          <ListItem bottomDivider style={styles.tiles}>
                           <ListItem.Content>
                             <ListItem.Title>
                               {item.name}
                             </ListItem.Title>
                           </ListItem.Content>
                           <ListItem.Chevron />
                          </ListItem>
                         </TouchableOpacity>
                         )
                }}
            />
    );  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:40
    },

    header: {
        fontSize: 48,
        alignSelf: 'center',
        marginBottom: 10
    },

    tiles: {
        borderBottomWidth: 1,
        marginVertical: 1,
        borderBottomColor: 'black'
    }
});
 
export default TrackListScreen;