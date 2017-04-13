import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "html": {
        "fontFamily": "'Roboto', sans-serif"
    },
    "body": {
        "fontSize": 13,
        "lineHeight": 20
    },
    "message": {
        "marginTop": 20,
        "color": "#7acb14"
    },
    "warn": {
        "marginTop": 20,
        "color": "#fedd00",
        "fontWeight": "bold"
    },
    "error": {
        "marginTop": 20,
        "color": "#ff6e5b",
        "fontWeight": "bold"
    }
});