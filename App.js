// https://github.com/react-native-mapbox-gl/maps


import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import {featureCollection, feature} from '@turf/turf';

MapboxGL.setAccessToken("pk.eyJ1Ijoiam9zZWluZm9ybWF0aWNvMjAxNSIsImEiOiJjazdzNWFmYnIwY21uM3NvNHZoemg5ZmJqIn0.EHg5K9m_gdHJBnL1JcudYg");


// import userIcon from '../assets/example.png';
import otherUserIcon from './assets/image/userIcon.png';


const stylesMap ={
  icon: {
    iconImage: otherUserIcon,
    iconAllowOverlap: true,
    iconSize:0.08
  },
};

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      featureCollection: featureCollection([
      ]),
    };

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
    console.log(this.state.featureCollection)
  }
  onSourceLayerPress(e) {
    const feature = e.nativeEvent.payload;
    console.log('You pressed a layer here is your feature', feature); // eslint-disable-line
  }

  async onPress(e) {
    console.log(e);
    const aFeature = feature(e.geometry);
    console.log(aFeature);
    aFeature.id = `${Date.now()}`;

    this.setState({
      featureCollection: featureCollection([
        ...this.state.featureCollection.features,
        aFeature,
      ]),
    });

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
              // onPress={(feature) => this.onShapeSourceLayer(feature)}
              >
              
              <MapboxGL.SymbolLayer 
                id='exampleIconName' 
                minZoomLevel={1} 
                style={stylesMap.icon}/>
            
            </MapboxGL.ShapeSource>

          </MapboxGL.MapView>


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
  }
});

