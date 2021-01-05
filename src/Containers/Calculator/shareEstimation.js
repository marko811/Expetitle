import React from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {Adjust, Metrics} from '../../utils/index';
import 'intl';
import 'intl/locale-data/jsonp/en';
import styles from './styles';

class ShareEstimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.route.params.data,
      address: this.props.route.params.address,
    };
  }

  componentDidMount() {
    this.refs.viewShot.capture().then(uri => {
      setTimeout(() => {
        Share.open({url: uri})
          .then(res => {
            if (res.app === res.app) {
              this.props.navigation.navigate('Calculator');
            }
          })
          .catch(err => {
            this.props.navigation.navigate('Calculator');
            err && console.log(err, 'err');
          });
      }, 1000);
    });
  }

  render() {
    const {address} = this.state;
    const addresses = address.split(', ');
    const low = this.props.route.params.estimation[0].low;
    const high = this.props.route.params.estimation[1].high;
    const BothBuyerAndSeller = this.props.route.params.bothBuyerSeller;
    return (
      <View style={styles.safeView}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <ViewShot ref="viewShot" options={{format: 'jpg', quality: 0.9}}>
            <View style={styles.headerAddress}>
              <View style={styles.addressTextView}>
                <Text allowFontScaling={false} style={styles.addressText}>
                  {addresses[0]}
                </Text>
                <Text allowFontScaling={false} style={styles.addressText}>
                  {`${addresses[1]}, ${addresses[2]}, ${addresses[3]}`}
                </Text>
              </View>
            </View>
            <View style={styles.shareEstimatedClosingCostView}>
              <Text style={styles.shareEstimatedClosingCost}>
                Estimated Closing Costs
              </Text>
              <Text style={styles.shareEstimatedDataText}>
                {'$'}
                {low} - {'$'}
                {high}
              </Text>
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.estimationBreak}>Estimation Breakdown</Text>
              <FlatList
                data={this.state.data}
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
                        {(this.state.data[0].initial === 'B') === true
                          ? item.initial
                          : null}
                        {(this.state.data[0].initial === 'S') === true
                          ? item.initial
                          : null}
                      </Text>
                    </View>
                    <Text style={styles.itemPrice}>{item.title}</Text>
                  </View>
                )}
              />
              {(this.state.data[0].initial === 'B') === true ? (
                <Text style={styles.typeOfEstimate}>
                  S - Seller, B - Buyer, SP - Split
                </Text>
              ) : null}
              {(this.state.data[0].initial === 'S') === true ? (
                <Text style={styles.typeOfEstimate}>
                  S - Seller, B - Buyer, SP - Split
                </Text>
              ) : null}
              <View>
                <Text style={styles.shareBottomNote}>
                  In order to get a full quote or see who pays what, email us at
                  closing@expetitle.com
                </Text>
              </View>
            </View>
          </ViewShot>
          <View style={{marginBottom: Platform.OS === 'ios' ? 120 : 120}} />
        </ScrollView>
      </View>
    );
  }
}

export default ShareEstimation;
