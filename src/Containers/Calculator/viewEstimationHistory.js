import React from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {Adjust, Metrics, Images} from '../../utils/index';
import 'intl';
import 'intl/locale-data/jsonp/en';
import styles from './styles';

class ViewEstimationHistory extends React.Component {
  constructor(props) {
    super(props);
    const {data, zipCode} = this.props.route.params;
    this.state = {
      data: data,
    };
  }

  render() {
    const {address, estimaton, total_price} = this.props.route.params;
    let filtered = this.state.data.filter(function(item) {
      return item != null;
    });
    return (
      <View style={styles.safeView}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.topView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: Platform.OS === 'android' ? Adjust(20) : Adjust(50),
                position: 'absolute',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => this.props.navigation.goBack()}>
                <Image source={Images.left} style={styles.backIcon} />
              </TouchableOpacity>
              {total_price ? (
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() =>
                    this.props.navigation.navigate('ShareEstimationProceeds', {
                      data: filtered,
                      address,
                      total_price,
                    })
                  }>
                  <Image source={Images.share} style={styles.shareIcon} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() =>
                    this.props.navigation.navigate('ShareEstimation', {
                      data: filtered,
                      address,
                      estimation: [
                        {low: estimaton[0].low},
                        {high: estimaton[1].high},
                      ],
                    })
                  }>
                  <Image source={Images.share} style={styles.shareIcon} />
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: Platform.OS === 'android' ? Adjust(60) : Adjust(100),
              }}>
              <Text style={styles.title}>Estimated {`\n`} Closing Costs</Text>
              <Text style={styles.estimatedCost}>{`$${low} - $${high}`}</Text>
            </View>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.estimationBreak}>Estimation Breakdown</Text>
            <View style={styles.flatlistView}>
              {filtered[0].initial === 'B' || 'S' ? (
                <View>
                  <FlatList
                    data={filtered}
                    renderItem={({item, index}) => (
                      <View style={styles.flatlistSubview}>
                        <View
                          style={{
                            height: 25,
                            width: 25,
                            backgroundColor: item.color,
                            borderRadius: 5,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              alignSelf: 'center',
                              color: '#FFF',
                              fontFamily: 'Poppins-SemiBold',
                            }}>
                            {item.initial}
                          </Text>
                        </View>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                      </View>
                    )}
                  />
                  <Text style={styles.typeOfEstimate}>
                    S - Seller, B - Buyer, SP - Split
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={filtered}
                  renderItem={({item}) => (
                    <View style={styles.flatlistSubview}>
                      <View
                        style={{
                          height: 25,
                          width: 25,
                          backgroundColor: item.color,
                          borderRadius: 5,
                        }}
                      />
                      <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
                  )}
                />
              )}
            </View>
            <View style={{marginTop: Adjust(25)}}>
              <Text style={styles.savingNoteText}>
                You save up to{' '}
                <Text style={styles.savingPercentNoteText}>25%</Text> in closing
                costs by using Expetitle.
              </Text>
              <Text style={styles.notetext}>
                * Note this is simply for rough quoting purposes. For a full
                closing disclosure, contact closing@expetitle.com or call
                954-302-7532.
              </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Calculator')}
                style={styles.reCalculate}>
                <Text style={styles.buttonTitle}>Recalculate</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}} />
        </ScrollView>
      </View>
    );
  }
}

export default ViewEstimationHistory;
