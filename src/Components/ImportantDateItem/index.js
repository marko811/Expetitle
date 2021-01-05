import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text} from 'react-native';
import styles from './styles';
import Moment from 'moment';
import {Images} from '../../utils';

function ImportantDateItem(props) {
  //   const [hover, setHover] = useState(false);
  let name = 'EffectiveDate';
  let imgUrl = '';
  if (props.ImpDate.name === 'Effective Date') {
    imgUrl = props.highlight
      ? require(`../../assets/images/important_dates_icons/blue/EffectiveDate.png`)
      : require(`../../assets/images/important_dates_icons/grey/EffectiveDate.png`);
  } else if (props.ImpDate.name === 'Initial Deposit') {
    imgUrl = props.highlight
      ? require(`../../assets/images/important_dates_icons/blue/InitialDeposit.png`)
      : require(`../../assets/images/important_dates_icons/grey/InitialDeposit.png`);
  } else if (props.ImpDate.name === 'Inspection Period Ends') {
    imgUrl = props.highlight
      ? require(`../../assets/images/important_dates_icons/blue/InspectionPeriodEnds.png`)
      : require(`../../assets/images/important_dates_icons/grey/InspectionPeriodEnds.png`);
  } else if (props.ImpDate.name === 'Additional Deposit') {
    imgUrl = props.highlight
      ? require(`../../assets/images/important_dates_icons/blue/AdditionalDeposit.png`)
      : require(`../../assets/images/important_dates_icons/grey/AdditionalDeposit.png`);
  } else if (props.ImpDate.name === 'Title Search Deadline') {
    imgUrl = props.highlight
      ? require(`../../assets/images/important_dates_icons/blue/TitleSearchDeadline.png`)
      : require(`../../assets/images/important_dates_icons/grey/TitleSearchDeadline.png`);
  } else if (props.ImpDate.name === 'Loan Approval') {
    imgUrl = props.highlight
      ? require(`../../assets/images/important_dates_icons/blue/LoanApproval.png`)
      : require(`../../assets/images/important_dates_icons/grey/LoanApproval.png`);
  } else if (props.ImpDate.name === 'Closing Date') {
    imgUrl = props.highlight
      ? require(`../../assets/images/important_dates_icons/blue/ClosingDate.png`)
      : require(`../../assets/images/important_dates_icons/grey/ClosingDate.png`);
  }
  return (
    <View style={styles.ImpDateItemContainer}>
      <View style={styles.iconContainer}>
        <Image source={imgUrl} style={styles.imgDateImg} />
      </View>
      <View style={styles.nameContainer}>
        <Text
        allowFontScaling={false}
          style={
            props.highlight
              ? styles.dateNameStyleHighlight
              : styles.dateNameStyle
          }>
          {props.ImpDate.name}:{' '}
        </Text>
        <Text
        allowFontScaling={false}
          style={
            props.highlight ? styles.dateStyleHighlights : styles.dateStyle
          }>
          {Moment(props.ImpDate.date).format('MMMM DD, YYYY')}
        </Text>
      </View>
    </View>
  );
}

export default ImportantDateItem;
