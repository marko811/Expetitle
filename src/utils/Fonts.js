import { Dimensions } from "react-native";

const type = {
  base: "Avenir",
  bold: "Avenir-Medium"
};

const size = {
  h1: (38 * Dimensions.get("window").width) / 375,
  h2: (34 * Dimensions.get("window").width) / 375,
  h3: (30 * Dimensions.get("window").width) / 375,
  h4: (22 * Dimensions.get("window").width) / 375,
  h5: (20 * Dimensions.get("window").width) / 375,
  h6: (19 * Dimensions.get("window").width) / 375,
  large: (18 * Dimensions.get("window").width) / 375,
  regular: (16 * Dimensions.get("window").width) / 375,
  default: (15 * Dimensions.get("window").width) / 375,
  medium: (14 * Dimensions.get("window").width) / 375,
  small: (12 * Dimensions.get("window").width) / 375,
  tiny: (8.5 * Dimensions.get("window").width) / 375,
  heading: (22 * Dimensions.get("window").width) / 375
};

const style = {
  description: {
    fontFamily: type.base,
    fontSize: size.small
  },
  caption: {
    fontFamily: type.base,
    fontSize: 13
  },
  productName: {
    fontFamily: type.bold,
    fontSize: size.large
  },
  input: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  heading: {
    fontFamily: type.bold,
    fontSize: size.heading,
    fontWeight: "bold"
  },
  subHeading: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style
};
