window.onload = function() {
    const url = 'http://www.mapquestapi.com/geocoding/v1/reverse?key=dO3a4FAviRC1A3StSlMVtX2L3XfRQvcd&location=81.1496,-37.3159&includeRoadMetadata=true&includeNearestIntersection=true';
    fetch(url).then(response => response.json())
        .then(console.log)
}


//some changes for trial