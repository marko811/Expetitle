import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import styles from './styles';
import Moment from 'moment';
import {Images} from '../../utils';

import ImportantDateItem from '../ImportantDateItem/index';
export default class ImportantDates extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let highlight = this.props.stagelist[this.props.highlightIndex];

    return (
      <View style={styles.impDatesContainer}>
        <View style={styles.impDatesHeading}>
          <Image source={Images.Calandar} style={styles.headerImage} />
          <Text allowFontScaling={false} style={styles.impDatesHeadingText}>Important Dates</Text>
        </View>
        <View style={styles.datesContainer}>
          {this.props.ImportantDates.map((ImpDate, index) => {
            return (
              <View key={index}>
                {!ImpDate.deleted && ImpDate.date !== null && (
                  <View style={styles.dateRow}>
                    <ImportantDateItem
                      highlight={
                        highlight !== undefined &&
                        highlight.index === ImpDate.stageListIndex
                      }
                      ImpDate={ImpDate}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
