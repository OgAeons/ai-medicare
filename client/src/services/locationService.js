// Function to get user's current location
const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject('Unable to access your location');
                }
            );
        } else {
            reject('Geolocation is not supported by this browser');
        }
    });
};

// Function to reverse geocode coordinates to get area name
const reverseGeocode = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const area =
            data?.address?.city || data?.address?.suburb || data?.address?.state || 'Unknown Area';
        return area;
    } catch (error) {
        console.error('Error in reverse geocoding:', error);
        return 'Unknown Area';
    }
};

// Function to fetch user location and reverse geocode it
export const fetchUserLocation = async () => {
    try {
        const { latitude, longitude } = await getCurrentLocation();
        const area = await reverseGeocode(latitude, longitude);
        return { latitude, longitude, area };
    } catch (error) {
        console.error('Error fetching location:', error);
        return null;
    }
};
