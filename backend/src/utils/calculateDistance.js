
const deg2rad = (deg) => {
    return deg * (Math.PI/180);
}

module.exports = function getDistanceFromLatLonInKm(centercoordinates, pointCoordinates) {
    const radius = 6371; // Radius of the earth in km

    const { latitude: lat1, longitude: lon1 } = centercoordinates;
    const { latitude: lat2, longitude: lon2 } = pointCoordinates;

    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1); 

    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
    const center = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = radius * center; // Distance in km

    return distance;
};
