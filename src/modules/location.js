function getUpdatedDistance({ lat, lng, _lat, _lng }) {
    if (lat === _lat && lng === _lng) {
        return 0;
    } else {
        let radlat1 = (Math.PI * lat) / 180;
        let radlat2 = (Math.PI * _lat) / 180;
        let theta = lng - _lng;
        let radtheta = (Math.PI * theta) / 180;
        let dist =
            Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        //KM로 변환
        return dist;
    }
}

export { getUpdatedDistance };
