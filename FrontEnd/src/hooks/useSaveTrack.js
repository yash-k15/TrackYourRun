import { useContext } from 'react';
import { Context as TrackContext } from '../Context/TrackContext';
import { Context as LocationContext } from '../Context/LocationContext';
import { useNavigation } from '@react-navigation/native';

export default () => {
    const { createTrack } = useContext(TrackContext);
    const { state: {name, locations }, reset} = useContext(LocationContext);

    const navigation = useNavigation();

    const saveTrack = async () => {
        await createTrack(name, locations);
        reset();
        navigation.navigate('TrackList') 
    }

    return [saveTrack];
}