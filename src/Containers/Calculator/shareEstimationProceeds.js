import React from 'react';
import {
  View,
  FlatList,
  StatusBar,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import {Adjust, Metrics} from '../../utils/index';
import 'intl';
import 'intl/locale-data/jsonp/en';
import styles from './styles';

class ShareEstimationProceeds extends React.Component {
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
    const {address, data} = this.props.route.params;
    const addresses = address.split(', ');
    const {
      salesPriceInput,
      titleInsurance,
      closingFee,
      titleSearchFee,
      lienSearchFee,
      estoppelFees,
      recordingFee,
      docStamps,
      payoffLoanInput,
      proratedTaxes,
      sellerCommissions,
      buyerCommissions,
      total,
    } = data;
    return (
      <View style={styles.safeView}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <ViewShot ref="viewShot" options={{format: 'jpg', quality: 0.9}}>
            <View style={styles.topView}>
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
                  Estimated Seller Proceeds
                </Text>
                <Text style={styles.estimatedCost}>
                  ${new Intl.NumberFormat().format(total)}
                </Text>
              </View>
            </View>
            <View style={styles.bottomView}>
              <Text style={styles.estimationBreak}>Estimation Breakdown</Text>
              <View style={styles.flatlistView}>
                <View style={styles.flatlistSubview}>
                  <View
                    style={[styles.breakDownRect, {backgroundColor: '#FE7D80'}]}
                  />
                  <View>
                    <Text style={styles.itemTitle}>Sales Price</Text>
                    <Text style={styles.itemPrice}>
                      Contract Price: $
                      {new Intl.NumberFormat().format(salesPriceInput)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flatlistView}>
                <View style={styles.flatlistSubview}>
                  <View
                    style={[styles.breakDownRect, {backgroundColor: '#ffd437'}]}
                  />
                  <View>
                    <Text style={styles.itemTitle}>Title Charges</Text>
                    {titleInsurance > 0 && (
                      <Text style={styles.itemPrice}>
                        Title Insurance: $
                        {new Intl.NumberFormat().format(titleInsurance)}
                      </Text>
                    )}
                    <Text style={styles.itemPrice}>
                      Closing Fee: ${new Intl.NumberFormat().format(closingFee)}
                    </Text>
                    <Text style={styles.itemPrice}>
                      Title Search Fee: $
                      {new Intl.NumberFormat().format(titleSearchFee)}
                    </Text>
                    <Text style={styles.itemPrice}>
                      Lien Search Fee: $
                      {new Intl.NumberFormat().format(lienSearchFee)}
                    </Text>
                    <Text style={styles.itemPrice}>
                      Estoppel Fees: $
                      {new Intl.NumberFormat().format(estoppelFees)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flatlistView}>
                <View style={styles.flatlistSubview}>
                  <View
                    style={[styles.breakDownRect, {backgroundColor: '#00cac1'}]}
                  />
                  <View>
                    <Text style={styles.itemTitle}>Recording Fees</Text>
                    <Text style={styles.itemPrice}>
                      Recording Fees: $
                      {new Intl.NumberFormat().format(recordingFee)}
                    </Text>
                    <Text style={styles.itemPrice}>
                      Doc Stamps: ${new Intl.NumberFormat().format(docStamps)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flatlistView}>
                <View style={styles.flatlistSubview}>
                  <View
                    style={[styles.breakDownRect, {backgroundColor: '#54C88C'}]}
                  />
                  <View>
                    <Text style={styles.itemTitle}>Payoffs</Text>
                    <Text style={styles.itemPrice}>
                      Payoff Loans: $
                      {new Intl.NumberFormat().format(payoffLoanInput)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flatlistView}>
                <View style={styles.flatlistSubview}>
                  <View
                    style={[styles.breakDownRect, {backgroundColor: '#a17cce'}]}
                  />
                  <View>
                    <Text style={styles.itemTitle}>Property Taxes</Text>
                    <Text style={styles.itemPrice}>
                      Taxes (Prorated): $
                      {new Intl.NumberFormat().format(proratedTaxes)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flatlistView}>
                <View style={styles.flatlistSubview}>
                  <View
                    style={[styles.breakDownRect, {backgroundColor: '#7D93B4'}]}
                  />
                  <View>
                    <Text style={styles.itemTitle}>Commissions</Text>
                    <Text style={styles.itemPrice}>
                      Seller Commissions: $
                      {new Intl.NumberFormat().format(sellerCommissions)}
                    </Text>
                    <Text style={styles.itemPrice}>
                      Buyer Commissions: $
                      {new Intl.NumberFormat().format(buyerCommissions)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{marginTop: Adjust(25)}}>
                <Text style={styles.shareBottomNote}>
                  In order to get a full quote or see who pays what, email us at
                  closing@expetitle.com.
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

export default ShareEstimationProceeds;
