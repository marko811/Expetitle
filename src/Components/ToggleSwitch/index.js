import React from 'react';
import {Switch} from 'react-native-switch';
import {Colors, Adjust} from '../../utils';

const ToggleSwitch = ({
  value,
  activeText = 'On',
  inActiveText = 'Off',
  wide = 3,
  ...props
}) => {
  return (
    <Switch
      value={value}
      activeText={activeText}
      inActiveText={inActiveText}
      activeTextStyle={{
        weight: 'bold',
        color: Colors.white,
        flex: 1,
        paddingHorizontal: 5,
      }}
      inactiveTextStyle={{
        weight: 'bold',
        color: Colors.text,
        flex: 1,
        paddingHorizontal: 5,
      }}
      circleSize={Adjust(26)}
      barHeight={Adjust(30)}
      circleBorderWidth={0}
      changeValueImmediately={false}
      backgroundActive={Colors.lightBlue}
      backgroundInactive={Colors.placeholder}
      circleActiveColor={Colors.placeholder}
      useNativeDriver={true}
      circleInActiveColor={Colors.placeholder}
      innerCircleStyle={{
        marginHorizontal: 5,
      }}
      outerCircleStyle={{
        padding: 0,
      }}
      switchLeftPx={10} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={10} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={wide} // multipled by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={30}
      {...props}
    />
  );
};

export default ToggleSwitch;
