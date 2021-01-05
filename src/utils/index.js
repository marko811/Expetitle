// @flow

import Colors from "./Colors";
import Images from "./Images";
import Metrics from "./Metrics";
import Fonts from "./Fonts";
import { Dimensions } from "react-native";
import Validation from "./Validation";
import NavigationToBase from "./NavigationToBase";
const ScreenWidht = Dimensions.get("window").width;
const Adjust = number => (number * ScreenWidht) / 375;

export { Colors, Adjust, Images, Metrics, Fonts, Validation, NavigationToBase };
