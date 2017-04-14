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
    },
    "// table https://codepenio/alassetter/pen/cyrfB/*** Table Styles **/table": {
        "maxWidth": 600
    },
    "table-fill": {},
    "th": {
        "color": "#D5DDE5",
        "background": "#1b1e24",
        "borderBottom": "4px solid #9ea7af",
        "borderRight": "1px solid #343a45",
        "fontSize": 23,
        "fontWeight": "100",
        "paddingTop": 8,
        "paddingRight": 8,
        "paddingBottom": 8,
        "paddingLeft": 8,
        "textAlign": "left",
        "textShadow": "0 1px 1px rgba(0, 0, 0, 0.1)",
        "verticalAlign": "middle"
    },
    "th:first-child": {
        "borderTopLeftRadius": 3
    },
    "th:last-child": {
        "borderTopRightRadius": 3,
        "borderRight": "none"
    },
    "tr": {
        "borderTop": "1px solid #C1C3D1",
        "borderBottom": "1px solid #C1C3D1",
        "color": "#666B85",
        "fontSize": 16,
        "fontWeight": "normal",
        "textShadow": "0 1px 1px rgba(256, 256, 256, 0.1)"
    },
    "tr:hover td": {
        "background": "#4E5066",
        "color": "#FFFFFF",
        "borderTop": "1px solid #22262e",
        "borderBottom": "1px solid #22262e"
    },
    "tr:first-child": {
        "borderTop": "none"
    },
    "tr:last-child": {
        "borderBottom": "none"
    },
    "tr:nth-child(odd) td": {
        "background": "#EBEBEB"
    },
    "tr:nth-child(odd):hover td": {
        "background": "#4E5066"
    },
    "tr:last-child td:first-child": {
        "borderBottomLeftRadius": 3
    },
    "tr:last-child td:last-child": {
        "borderBottomRightRadius": 3
    },
    "td": {
        "background": "#FFFFFF",
        "paddingTop": 5,
        "paddingRight": 5,
        "paddingBottom": 5,
        "paddingLeft": 5,
        "textAlign": "left",
        "verticalAlign": "middle",
        "fontWeight": "300",
        "fontSize": 18,
        "textShadow": "-1px -1px 1px rgba(0, 0, 0, 0.1)",
        "borderRight": "1px solid #C1C3D1"
    },
    "td:last-child": {
        "borderRight": 0
    },
    "thtext-left": {
        "textAlign": "left"
    },
    "thtext-center": {
        "textAlign": "center"
    },
    "thtext-right": {
        "textAlign": "right"
    },
    "tdtext-left": {
        "textAlign": "left"
    },
    "tdtext-center": {
        "textAlign": "center"
    },
    "tdtext-right": {
        "textAlign": "right"
    }
});