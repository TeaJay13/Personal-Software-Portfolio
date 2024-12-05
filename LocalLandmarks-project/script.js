require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
], function (Map, MapView, FeatureLayer) {
  
  // List of landmarks with types and image URLs
  const locations = [
    { name: "Idaho Falls River Walk", coords: [-112.0453, 43.4938], description: "A scenic 5-mile walk along the Snake River featuring beautiful waterfalls.", type: "Park", imageUrl: "https://www.idahofallsidaho.gov/ImageRepository/Document?documentID=2442" },
    { name: "Museum of Idaho", coords: [-112.0342, 43.4937], description: "A museum showcasing Idaho's history, culture, and science exhibits.", type: "Museum", imageUrl: "https://www.rexburgonline.com/wp-content/uploads/2017/05/23509290_1509444702472991_2140457728630182502_o.jpg" },
    { name: "Idaho Falls Zoo at Tautphaus Park", coords: [-112.0189, 43.4802], description: "A family-friendly zoo with animals from around the world.", type: "Zoo", imageUrl: "https://www.utahsadventurefamily.com/wp-content/uploads/2020/08/Idaho-Falls-Zoo-1-1024x683.jpeg" },
    { name: "Tautphaus Park", coords: [-112.0185, 43.4805], description: "One of the largest parks in Idaho Falls, featuring playgrounds and sports facilities.", type: "Park", imageUrl: "https://www.idahofallsidaho.gov/ImageRepository/Document?documentID=16589" },
    { name: "Melaleuca Field", coords: [-112.0152, 43.4982], description: "A popular baseball stadium and home to the Idaho Falls Chukars.", type: "Stadium", imageUrl: "https://static.wixstatic.com/media/2e2e5a_09658b76d1854044afcfa0ac69304e16~mv2.jpg/v1/crop/x_0,y_120,w_1600,h_947/fill/w_544,h_314,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/Idaho%20Falls%20Melaleuca%20003.jpg" },
    { name: "East Idaho Aquarium", coords: [-112.0318, 43.4951], description: "An interactive aquarium featuring marine life exhibits and activities.", type: "Aquarium", imageUrl: "https://www.joonsquareusa.com/usermanage/image/business/east-idaho-aquarium-bonneville-id-2774/east-idaho-aquarium-bonneville-id-eastidahoaquarium-05.jpg" },
    { name: "Hell’s Half Acre Lava Field", coords: [-112.4356, 43.5284], description: "A unique lava field created by ancient volcanic activity.", type: "Landmark", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Hells_Half_Acre.jpg" },
    { name: "Craters of the Moon National Monument", coords: [-113.5165, 43.4166], description: "A surreal volcanic landscape ideal for hiking and exploring.", type: "Park", imageUrl: "https://www.nps.gov/nps-audiovideo/legacy/crmo/DAAF5326-0946-5342-E79698BEB31B515D/crmo-CratersOfTheMoonScenicLoopAndTrails_splash.jpg" },
    { name: "Historic Downtown Idaho Falls", coords: [-112.0356, 43.4921], description: "A charming area with restaurants, shops, and historic architecture.", type: "Historic", imageUrl: "https://downtownidahofalls.com/wp-content/uploads/2023/09/img_0273-1024x614.jpg" },
    { name: "Eagle Rock Fountain", coords: [-112.0349, 43.4943], description: "A prominent local monument and popular photography spot.", type: "Landmark", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtO8zybnbusGilrHoDXMZLTojiB-GxQudZQA&s" },
    { name: "Grand Teton Mall", coords: [-111.9725, 43.4771], description: "A regional shopping destination featuring retail stores and eateries.", type: "Shopping", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ31Jyb5KOHpFKE4BUpIr0R34iToK-WRi_iaQ&s" },
    { name: "Swan Valley Overlook", coords: [-111.2726, 43.4325], description: "A breathtaking viewpoint offering stunning views of the valley.", type: "Viewpoint", imageUrl: "https://www.nps.gov/common/uploads/cropped_image/1C1DF3A6-D15C-3CFE-A8E19C0F3DEF2D0F.jpg?width=465&height=261&mode=crop&quality=90" },
    { name: "Heise Hot Springs", coords: [-111.6791, 43.6491], description: "Natural hot springs with pools, ziplining, and camping options.", type: "Hot Springs", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFEGZ4PWKIm6pe6FTE3cFU8MtbTLMCbCshLg&s" },
    { name: "Rexburg Rapids Water Park", coords: [-111.7891, 43.8289], description: "A family water park featuring slides, pools, and a lazy river.", type: "Water Park", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcNRezQ2gP9UXjYoJSDmHykwxlR7dMcehOvw&s" },
    { name: "Rigby Lake (Jefferson County Lake)", coords: [-111.9155, 43.6746], description: "A recreational lake offering swimming, kayaking, and picnicking.", type: "Lake", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6cq7NY1jkGZWONs76JVa0dU17m2lCguNsBA&s" },
    { name: "Yellowstone Bear World", coords: [-111.8310, 43.7831], description: "A drive-through wildlife park featuring bears and other animals.", type: "Zoo", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWb7zRLni7BQrEyFvZbSZNs28_lTcTzfnrNg&s" },
    { name: "Idaho Potato Museum", coords: [-112.3477, 43.1896], description: "A quirky museum dedicated to the history and significance of Idaho potatoes.", type: "Museum", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpIHrRj0TCVJp5nWzxCevtbFsCE5ZgwQ1zPw&s" },
    { name: "Snake River Greenbelt", coords: [-112.0504, 43.4958], description: "A trail system that offers views of the river, wildlife, and local scenery.", type: "Park", imageUrl: "https://cloudfront.traillink.com/photos/idaho-falls-greenbelt_174721_sc.jpg" },
    { name: "Bear Lake State Park", coords: [-111.3313, 42.2892], description: "A picturesque lake with turquoise waters ideal for boating and fishing.", type: "Lake", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8JY3kYgZKmVkUVLH6yasRDsw32tcozSSg9g&s" },
    { name: "St. Anthony Sand Dunes", coords: [-111.6678, 43.9744], description: "A vast area of sand dunes popular for ATV riding and sandboarding.", type: "Landmark", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZmfRfPGScyzueWX4-TIS5hh74sLIOkYsRbw&s" }
  ];

  // Create the map
  const map = new Map({
    basemap: "streets-navigation-vector"
  });

  // Create the map view
  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-112.0342, 43.4937], // Centered in Idaho Falls
    zoom: 7 // Adjust zoom level to fit landmarks
  });

  // Create features from locations
  const features = locations.map((location, index) => ({
    geometry: {
      type: "point",
      longitude: location.coords[0],
      latitude: location.coords[1]
    },
    attributes: {
      id: index,
      name: location.name,
      description: location.description,
      type: location.type,
      imageUrl: location.imageUrl
    }
  }));

  // Create the FeatureLayer with popups
  const featureLayer = new FeatureLayer({
    source: features,
    objectIdField: "id",
    fields: [
      { name: "id", type: "oid" },
      { name: "name", type: "string" },
      { name: "description", type: "string" },
      { name: "type", type: "string" },
      { name: "imageUrl", type: "string" }
    ],
    popupTemplate: {
      title: "{name}",
      content: `
        <p>{description}</p>
        <img src="{imageUrl}" alt="{name}" style="width:100%;max-height:200px;">
      `
    }
  });

  // Add the feature layer to the map
  map.add(featureLayer);

  // Filter function for buttons
  function filterMarkers(type) {
    featureLayer.definitionExpression = type ? `type = '${type}'` : null;
  }

  // Attach event listeners to buttons
  document.getElementById("filter-buttons").addEventListener("click", (event) => {
    const type = event.target.getAttribute("data-type");
    if (type !== null) filterMarkers(type);
  });
});