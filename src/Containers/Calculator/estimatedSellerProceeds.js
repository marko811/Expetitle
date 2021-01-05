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
import AsyncStorage from '@react-native-community/async-storage';
import {Images, Adjust} from '../../utils/index';
import 'intl';
import 'intl/locale-data/jsonp/en';
import styles from './styles';

// ADD ESTIMATION TO HISTORY
let Tasks = {
  convertToArrayOfObject(tasks, callback) {
    return callback(
      tasks ? tasks.split('||').map((task, i) => ({key: i, text: task})) : [],
    );
  },
  convertToStringWithSeparators(tasks) {
    return tasks.map(task => task.text).join('||');
  },
  all(callback) {
    return AsyncStorage.getItem('TASKS', (err, tasks) =>
      this.convertToArrayOfObject(tasks, callback),
    );
  },
  save(tasks) {
    AsyncStorage.setItem('TASKS', this.convertToStringWithSeparators(tasks));
  },
};

class EstimatedClosingCosts extends React.Component {
  constructor(props) {
    super(props);
    const {
      salesPriceInput,
      titleInsurance,
      loanAmountInput,
      annualPropertyTax,
      commissionRate,
      payoffLoanInput,
      buyerPayForTitle,
    } = props.route.params;
    this.state = {
      salesPriceInput,
      titleInsurance: buyerPayForTitle ? 0 : titleInsurance,
      closingFee: 399,
      titleSearchFee: 200,
      lienSearchFee: 100,
      estoppelFees: 200,
      recordingFee: 19,
      docStamps: salesPriceInput * 0.007,
      loanAmountInput,
      payoffLoanInput,
      proratedTaxes: this.getProratedTaxes(annualPropertyTax),
      sellerCommissions: commissionRate * 0.5,
      buyerCommissions: commissionRate * 0.5,
      tasks: [],
      total: '---',
    };
  }

  componentDidMount() {
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
    } = this.state;
    const {params} = this.props.route;
    const total =
      salesPriceInput -
      titleInsurance -
      closingFee -
      titleSearchFee -
      lienSearchFee -
      estoppelFees -
      recordingFee -
      docStamps -
      payoffLoanInput -
      proratedTaxes -
      sellerCommissions -
      buyerCommissions -
      params.sellerCreditInput;

    this.setState({total});

    Tasks.all(tasks => {
      const newTask = {
        key: tasks.length,
        text: JSON.stringify({
          ...params,
          address: params.address,
          total_price: total,
        }),
      };
      if (tasks) {
        tasks.push(newTask);
        Tasks.save(tasks);
      } else {
        Tasks.save([newTask]);
      }
    });
  }

  getProratedTaxes = annualPropertyTax => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return Math.round((annualPropertyTax * day) / 365);
  };

  onPressShareButton = () => {
    const {address} = this.props.route.params;
    this.props.navigation.navigate('ShareEstimationProceeds', {
      address,
      data: this.state,
    });
  };

  render() {
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
    } = this.state;
    const {buyerPayForTitle} = this.props.route.params;
    return (
      <View style={styles.safeView}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.topView}>
            <View style={styles.shareButtonContainer}>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => this.props.navigation.goBack()}>
                <Image source={Images.left} style={styles.backIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => this.onPressShareButton()}>
                <Image source={Images.share} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: Platform.OS === 'android' ? Adjust(60) : Adjust(100),
              }}>
              <Text style={styles.title}>Estimated {`\n`} Seller Proceeds</Text>
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
                onPress={() => this.props.navigation.goBack()}
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

export default EstimatedClosingCosts;
