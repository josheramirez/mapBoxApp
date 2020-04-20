// https://github.com/react-native-mapbox-gl/maps


import React, { Component } from "react";
import { StyleSheet, View, Dimensions, Text, Button, TouchableHighlight, TouchableOpacity} from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {featureCollection, feature} from '@turf/turf';
import Bubble from './Bubble';
MapboxGL.setAccessToken("pk.eyJ1Ijoiam9zZWluZm9ybWF0aWNvMjAxNSIsImEiOiJjazdzNWFmYnIwY21uM3NvNHZoemg5ZmJqIn0.EHg5K9m_gdHJBnL1JcudYg");


// import userIcon from '../assets/example.png';
import otherUserIcon from './assets/image/userIcon.png';
import userIcon from './assets/image/userThis.png';

var markers=[
  [-73.970895, 40.723279],
  [-74.0037382718885,40.97053006323466],
  [-74.037382718885,41],

]

var puntos=markers.map((marker)=>(
    {
      type:"Feature",
      properties:{icon:"myIcon"},
      geometry:{type:"Point",coordinates:marker}
    }
    )
  )

const featureCollections = {
  type: 'FeatureCollection',
  features: puntos,
};

const userFeature = {
  type:"Feature",
  properties:{icon:"myIcon"},
  geometry:{type:"Point",coordinates:  [-74.03582718885,41.5]}
}

const stylesMap ={
  icon: {
    iconImage: otherUserIcon,
    iconAllowOverlap: true,
    iconSize:0.08
  },
  iconUser: {
    iconImage: userIcon,
    iconAllowOverlap: true,
    iconSize:0.08
  }
};

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // featureCollection: featureCollection([
      // ]),
      featureCollection:featureCollections,
    
    
    };

    this.onPress=this.onPress.bind(this);
    this.onPress=this.onPress.bind(this);
  }

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
   // console.log(this.state.featureCollection)
    // this.setState({
    //   featureCollection: featureCollection([
    //     ...this.state.featureCollection.features,
    //     feature({"geometry":{"coordinates":[-74.08796,40.6998],"type":"Point"}})
    //   ]),
    // });
    // console.log("feature collections"+JSON.stringify(this.state.featureCollection))
    // console.log("puntos"+JSON.stringify(puntos))
  }
  onSourceLayerPress(event) {
    // console.log(event)

    const feature = event
    // console.log('JSON feature', JSON.stringify(feature)); // eslint-disable-line
    // console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
  
    this.setState({
      latitude: event.coordinates.latitude,
      longitude: event.coordinates.longitude,
      screenPointX: event.point.x,
      screenPointY: event.point.y,
    });
  }


  get hasValidLastClick() {
    return (
      typeof this.state.latitude === 'number' &&
      typeof this.state.longitude === 'number'
    );
  }

  renderLastClicked() {
    if (!this.hasValidLastClick) {
      // return (
      //   <Bubble>
      //     <Text>Click the map!</Text>
      //   </Bubble>
      // );
      return null
    }

    return (
      <Bubble>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>Screen Point X: {this.state.screenPointX}</Text>
        <Text>Screen Point Y: {this.state.screenPointY}</Text>
        <TouchableHighlight
            style={styles.submit}
            onPress={() => {}}
            underlayColor='#fff'>
            <Text style={[styles.submitText]}>Ir en Ayuda</Text>
          </TouchableHighlight>
      </Bubble>
    );
  }
  async onPress(e) {
    // console.log(e);
    // const aFeature = feature(e.geometry);
    // console.log(aFeature);
    // aFeature.id = `${Date.now()}`;

    // this.setState({
    //   featureCollection: featureCollection([
    //     ...this.state.featureCollection.features,
    //     aFeature,
    //   ]),
    // });
    // console.log(JSON.stringify(e))
   
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>

          <MapboxGL.MapView
            ref={(c) => this._map = c}
            onPress={this.onPress}
            style={{ flex: 1 }}
          >
          <MapboxGL.Camera
            zoomLevel={9}
            centerCoordinate={[-73.970895, 40.723279]}
          />

            <MapboxGL.ShapeSource
              id='exampleShapeSource'
              hitbox={{width: 20, height: 20}}
               shape={this.state.featureCollection}
               onPress={(feature) => this.onSourceLayerPress(feature)}
              >
              
              <MapboxGL.SymbolLayer 
                id='exampleIconName' 
                minZoomLevel={1} 
                style={stylesMap.icon}/>
          
            </MapboxGL.ShapeSource>

            <MapboxGL.ShapeSource
              id='userIcon'
              hitbox={{width: 20, height: 20}}
               shape={userFeature}
               onPress={(feature) => this.onSourceLayerPress(feature)}>
              
              <MapboxGL.SymbolLayer 
                id='userIcon' 
                minZoomLevel={1} 
                style={stylesMap.iconUser}/>
          
            </MapboxGL.ShapeSource>

          </MapboxGL.MapView>

          {this.renderLastClicked()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: height,
    width: width,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  },
  submit:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
paddingHorizontal:15,
paddingVertical:10,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
  }
});

