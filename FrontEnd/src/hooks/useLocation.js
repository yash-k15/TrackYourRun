import { useEffect, useState } from 'react'
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from 'expo-location'

export default ( shouldTrack, callback) => {
    const [error, setError ] = useState(null);

    useEffect(() => {
        let subscriber;
        const startWatching = async() => {
            try{
                const response = await requestPermissionsAsync();
                if(!response.granted) {
                    throw new Error('Location permission not granted')
                }
    
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000000,
                    distanceInterval: 10
                }, callback);       
            } catch(err) { 
                setError(err);
            }
        }

        if(shouldTrack) {
        startWatching();
        } else {
            if(subscriber) {
            subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if(subscriber) {
                subscriber.remove();
            }
        }
    }, [shouldTrack, callback])

    return [error];
}