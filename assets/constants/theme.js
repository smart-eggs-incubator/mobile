import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
const COLORS = {
  primary: "#f2ab12",
  secondary: "#444262",
  tertiary: "#FF7754",
  gray: "#83829A",
  gray2: "#C1C0C8",
  orangeDegrade: '#ff880079',
  rougeDegrade: '#f3365c63',

  white: "#FFF",
  lightWhite: "#FAFAFC",
  lightBlue: "#A2B3EF",
  lightOpacity: "#f2f4f734",
  lightOpacity2: "#e0e4ebe9",
  blue: "#4d1fe6",
  opacity0: "#ff880000",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
  window: Dimensions.get('window').height,
};


const FONT_SIZES = {
  h1: StyleSheet.create({
    h1: {
      fontSize: 40,
      fontWeight: "bold"
    }
  }),
  h2: StyleSheet.create({
    h2: {
      fontSize: 30,
      // fontWeight: "bold"
    }
  })
}
const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS, FONT_SIZES };
