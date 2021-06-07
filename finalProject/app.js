async function fetchUserInfo() {
    const url = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=dO3a4FAviRC1A3StSlMVtX2L3XfRQvcd&location=81.1496,-37.3159&includeRoadMetadata=true&includeNearestIntersection=true';
    let ResponseBody = await fetch(url);
    let json = await ResponseBody.json();

}
////changes

//    const url = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=dO3a4FAviRC1A3StSlMVtX2L3XfRQvcd&location=81.1496,-37.3159&includeRoadMetadata=true&includeNearestIntersection=true';