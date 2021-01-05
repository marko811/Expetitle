import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInputMask} from 'react-native-masked-text';
import CheckBox from 'react-native-check-box';
import AppHeader from '../../Components/AppHeader/index';
import {Images, Colors} from '../../utils';
import ToggleSwitch from '../../Components/ToggleSwitch';
import ExpeModal from '../../Components/Modal';
import styles from './styles';
import tile from './tile.json';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyAddress: '',
      isCondo: true,
      zipCode: '',
      buyerPayForTitle: true,
      salesPrice: '',
      loanAmount: '',
      commissionRate: 6,
      propertyAddressEmpty: false,
      zipCodeEmpty: false,
      salesPriceEmpty: false,
      loanAmountEmpty: false,
      commissionRateEmpty: false,
      buyerRecordingFee: true, // DROPDOWN = DEFAULT TRUE
      sellerRecordingFee: false,
      addYourCommission: true,
      tilePurchaser: '', // BUYER OR SELLER BASED ON ZIP CODES
      floridaZipCode: false,
      showPayModal: false,
      showTaxModal: false,
      estimateFor: 'seller',
      annualPropertyTax: '',
      payoffLoan: '',
      sellerCredit: '',
      zipCodeDetails: {},
    };
  }

  reset() {
    return this.setState({
      propertyAddress: '',
      isCondo: true,
      zipCode: '',
      buyerPayForTitle: true,
      salesPrice: '',
      loanAmount: '',
      commissionRate: 6,
      tilePurchaser: '',
      zipCodeEmpty: false,
      salesPriceEmpty: false,
      loanAmountEmpty: false,
      commissionRateEmpty: false,
      buyerRecordingFee: true, // DROPDOWN = DEFAULT TRUE
      sellerRecordingFee: false,
      addYourCommission: true,
      isPercentageInputFocused: false,
      showPayModal: false,
      showTaxModal: false,
      estimateFor: 'seller',
      annualPropertyTax: '',
      payoffLoan: '',
      sellerCredit: '',
      zipCodeDetails: {},
    });
  }

  calculate = async () => {
    const {
      propertyAddress,
      zipCode,
      loanAmount,
      salesPrice,
      annualPropertyTax,
      commissionRate,
      tilePurchaser,
      estimateFor,
      sellerCredit,
      payoffLoan,
      buyerPayForTitle,
      zipCodeDetails,
      addYourCommission,
    } = this.state;
    let medium = 100000;
    let high = 1000000;
    let calcLow = 0.005;
    let calcMedium = 0.00575;
    let buyerRecordingFees = 0.0035; // Mortgage Doc Stamps // OLD lowRecordingFee
    let sellerRecordingFees = 0.007; // Deed Doc Stamps // highRecordingFee
    let recordingFeeSellerRecordingFees = 27; // Recording Fee
    let intangibleTaxBuyerRecordingFees = 40; // Intangible Tax
    let salesPriceInput = salesPrice.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    let loanAmountInput = loanAmount.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    let payoffLoanInput = payoffLoan.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

    let sellerCreditInput = sellerCredit.replace(
      /[&\/\\#,+()$~%.'":*?<>{}]/g,
      '',
    );

    // Decide the next screen name
    const redirectTo =
      estimateFor === 'seller'
        ? 'EstimatedSellerProceed'
        : 'EstimatedClosingCosts';
    // GENERATE ADDRESS
    const fullAddress =
      propertyAddress +
      ', ' +
      zipCodeDetails.City +
      ', ' +
      zipCodeDetails.State +
      ', ' +
      zipCode;

    // REALTOR COMMISSION RATE - BASED ON SALES PRICE //
    const commission = (commissionRate / 100) * salesPriceInput;
    if (salesPriceInput <= medium) {
      const price = salesPriceInput * calcMedium;
      if (zipCode.length == 0) {
        this.setState({zipCodeEmpty: true});
      }
      if (salesPriceInput.length == 0) {
        this.setState({salesPriceEmpty: true});
      }
      if (loanAmount.length == 0) {
        this.setState({loanAmountEmpty: true});
      }
      // LOAN PRICE * RECORDING FEE - LOW & HIGH - BUYER SIDE //
      const buyerRecordingFeeHigh =
        loanAmountInput * buyerRecordingFees + intangibleTaxBuyerRecordingFees;
      const highBuy = buyerRecordingFeeHigh;
      // SALES PRICE * RECORDING FEE - LOW & HIGH - SELLER SIDE //
      const sellerRecordingFeeHigh =
        salesPriceInput * sellerRecordingFees + recordingFeeSellerRecordingFees;
      const highSell = sellerRecordingFeeHigh;

      if (zipCode.length !== 0 && salesPriceInput.length !== 0) {
        await this.props.navigation.navigate(redirectTo, {
          titleInsurance: price,
          commissionRate: addYourCommission ? commission : null,
          // SELECTED TYPE //
          typeSeller: this.state.sellerRecordingFee === true ? 'seller' : '',
          typeBuyer: this.state.buyerRecordingFee === true ? 'buyer' : '',
          // BUYER RECORDING FEE //
          buyerRecordingFeeHigh: highBuy,
          // SELLER RECORDING FEE //
          sellerRecordingFeeHigh: highSell,
          // PROPERTY ADDRESS & ZIPCODE //
          address: fullAddress,
          tileType: tilePurchaser,
          salesPriceInput,
          loanAmountInput,
          annualPropertyTax,
          sellerCreditInput,
          payoffLoanInput,
          buyerPayForTitle,
        });
        // this.reset(); // RESET FIELDS
      }
    }

    // MEDIUM & HIGH //
    if (salesPriceInput > medium) {
      const med = medium * calcMedium;
      const sales = salesPriceInput - medium;
      const mul = sales * calcLow;
      const title = mul + med;
      // LOAN PRICE * RECORDING FEE - LOW & HIGH - BUYER SIDE //
      const buyerRecordingFeeHigh =
        loanAmountInput * buyerRecordingFees + intangibleTaxBuyerRecordingFees;
      const highBuy = buyerRecordingFeeHigh;
      // SALES PRICE * RECORDING FEE - LOW & HIGH - SELLER SIDE //
      const recordingFeeHigh =
        salesPriceInput * sellerRecordingFees + recordingFeeSellerRecordingFees;
      // const lowSell = recordingFeeLow; // + 168.5
      const highSell = recordingFeeHigh; // + 177

      if (zipCode.length == 0) {
        this.setState({zipCodeEmpty: true});
      }
      if (salesPriceInput.length == 0) {
        this.setState({salesPriceEmpty: true});
      }
      if (zipCode.length !== 0 && salesPriceInput.length !== 0) {
        this.props.navigation.navigate(redirectTo, {
          titleInsurance: title,
          commissionRate: addYourCommission ? commission : null,
          // SELECTED TYPE //
          typeSeller: this.state.sellerRecordingFee === true ? 'seller' : '',
          typeBuyer: this.state.buyerRecordingFee === true ? 'buyer' : '',
          // BUYER RECORDING FEE //
          buyerRecordingFeeHigh: highBuy,
          sellerRecordingFeeHigh: highSell,
          address: fullAddress,
          tileType: tilePurchaser,
          salesPriceInput,
          loanAmountInput,
          annualPropertyTax,
          sellerCreditInput,
          payoffLoanInput,
          buyerPayForTitle,
        });
        // this.reset(); // RESET FIELDS
      }
    }

    // HIGH //
    if (salesPriceInput > high) {
      const med = 100000 * 0.00575;
      const sales = salesPriceInput - medium - medium;
      const mul = sales * 0.005;
      const title = mul + med;
      // SALES PRICE * RECORDING FEE - LOW & HIGH - SELLER SIDE //
      const sellerRecordingFeeHigh =
        salesPriceInput * sellerRecordingFees + intangibleTaxBuyerRecordingFees;
      // const lowSell = sellerRecordingFeeLow // + 168.5;
      const highSell = sellerRecordingFeeHigh; // + 177;
      // LOAN PRICE * RECORDING FEE - LOW & HIGH - BUYER SIDE //
      const buyerRecordingFeeHigh =
        loanAmountInput * buyerRecordingFees + recordingFeeSellerRecordingFees;
      const highBuy = buyerRecordingFeeHigh;
      if (zipCode.length == 0) {
        this.setState({zipCodeEmpty: true});
      }
      if (salesPriceInput.length == 0) {
        this.setState({salesPriceEmpty: true});
      }
      if (zipCode.length !== 0 && salesPriceInput.length !== 0) {
        this.props.navigation.navigate(redirectTo, {
          titleInsurance: title,
          commissionRate: addYourCommission ? commission : null,
          // SELECTED TYPE //
          typeSeller: this.state.sellerRecordingFee === true ? 'seller' : '',
          typeBuyer: this.state.buyerRecordingFee === true ? 'buyer' : '',
          // BUYER RECORDING FEE //
          buyerRecordingFeeHigh: highBuy,
          // SELLER RECORDING FEE //
          sellerRecordingFeeHigh: highSell,
          address: fullAddress,
          tileType: tilePurchaser,
          salesPriceInput,
          loanAmountInput,
          annualPropertyTax,
          sellerCreditInput,
          payoffLoanInput,
          buyerPayForTitle,
        });
        // this.reset(); // RESET FIELDS
      }
    }
  };

  emptyFieldWarning() {
    return (
      <View style={{flexDirection: 'row', bottom: 8}}>
        <Image source={Images.warn} style={styles.warningIcon} />
        <Text style={styles.warningText}> This field is required</Text>
      </View>
    );
  }
  zipCodeWarning() {
    return (
      <View style={{flexDirection: 'row', bottom: 8}}>
        <Image source={Images.warn} style={styles.warningIcon} />
        <Text style={styles.warningText}> The zip code must be in Florida</Text>
      </View>
    );
  }

  render() {
    const {
      propertyAddress,
      isCondo,
      zipCode,
      showPayModal,
      salesPrice,
      estimateFor,
      showTaxModal,
      annualPropertyTax,
      payoffLoan,
      sellerCredit,
      commissionRate,
      tilePurchaser,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader
          showLeftIcon={false}
          // rightIcon={Images.history}
          onPressRight={() => this.props.navigation.navigate('EstimateHistory')}
          rightIconStyle={{
            height: 30,
            width: 30,
            marginRight: 100,
            resizeMode: 'contain',
          }}
          showRightIcon={styles.rightIconStyle}
          title={'Closing Estimate'}
        />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            style={{flex: 1}}>
            <View style={{paddingTop: 20, paddingBottom: 20}}>
              <Text style={styles.label}>Estimate For</Text>
              <DropDownPicker
                items={[
                  {
                    label: 'Buyer Side Only',
                    value: 'Buyer Side Only',
                  },
                  // {label: 'Seller Side Only', value: 'Seller Side Only'},
                  {
                    label: 'Both Buyer & Seller Side',
                    value: 'Both Buyer & Seller Side',
                  },
                  {
                    label: 'Seller Net Sheets',
                    value: 'Seller Net Sheets',
                    selected: true,
                  },
                ]}
                containerStyle={styles.dropDownContainer}
                placeholderStyle={styles.dropDownPlaceholder}
                labelStyle={styles.dropDownLabel}
                style={styles.dropDownStyle}
                itemStyle={{justifyContent: 'flex-start'}}
                dropDownStyle={{backgroundColor: '#F6F8FD'}}
                onChangeItem={item => {
                  if (item.value === 'Buyer Side Only') {
                    this.setState({
                      buyerRecordingFee: true,
                      sellerRecordingFee: false,
                      estimateFor: 'buyer',
                    });
                  } else if (item.value === 'Seller Net Sheets') {
                    this.setState({
                      sellerRecordingFee: true,
                      buyerRecordingFee: false,
                      estimateFor: 'seller',
                      addYourCommission: true,
                    });
                  } else if (item.value === 'Both Buyer & Seller Side') {
                    this.setState({
                      buyerRecordingFee: true,
                      sellerRecordingFee: true,
                      estimateFor: 'both',
                    });
                  }
                }}
              />
              <Text style={styles.label}>Property Address</Text>
              <TextInput
                placeholder={'Property Address'}
                style={styles.input}
                placeholderTextColor={'#CECECE'}
                onChangeText={address =>
                  this.setState({propertyAddress: address})
                }
                value={this.state.propertyAddress}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.zip.focus();
                }}
              />
              {this.state.propertyAddressEmpty && this.emptyFieldWarning()}
              {propertyAddress.length > 0 && (
                <View style={styles.toggleContainer}>
                  <ToggleSwitch
                    activeText="Condo"
                    inActiveText="SFH"
                    value={isCondo}
                    backgroundInactive={Colors.lightBlue}
                    wide={3.5}
                    onValueChange={val => this.setState({isCondo: val})}
                    style={{marginRight: 20}}
                    inactiveTextStyle={{
                      weight: 'bold',
                      color: Colors.white,
                      flex: 1,
                      paddingHorizontal: 5,
                    }}
                  />
                  <Text style={styles.toggleText}>
                    {isCondo
                      ? 'This property is a condo'
                      : 'This is a single family home'}
                  </Text>
                </View>
              )}
              <Text style={styles.label}>Zip Code</Text>
              <TextInputMask
                refInput={input => {
                  this.zip = input;
                }}
                type={'only-numbers'}
                placeholder={'Zip Code'}
                style={styles.input}
                placeholderTextColor={'#CECECE'}
                onChangeText={zipcode => {
                  this.setState({zipCode: zipcode});
                  if (zipCode.length > 1) {
                    this.setState({zipCodeEmpty: false});
                  }
                  var find = tile.tile.find(function(item) {
                    // BUYER: 33443 // SELLER: 32754
                    return item.Zip === zipcode;
                  });
                  if (find) {
                    this.setState({
                      tilePurchaser: find.tilePurchaser,
                      buyerPayForTitle: find.tilePurchaser === 'Buyer',
                      floridaZipCode: true,
                      zipCodeDetails: find,
                    });
                  } else {
                    this.setState({floridaZipCode: false});
                  }
                }}
                value={zipCode}
                maxLength={5}
                keyboardType={'number-pad'}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.sales.focus();
                }}
              />
              {this.state.zipCodeEmpty && this.emptyFieldWarning()}
              {zipCode.length > 0 && (
                <View style={styles.toggleContainer}>
                  <ToggleSwitch
                    activeText="Buyer"
                    inActiveText="Seller"
                    value={tilePurchaser === 'Buyer'}
                    onValueChange={val =>
                      this.setState({
                        tilePurchaser:
                          tilePurchaser === 'Buyer' ? 'Seller' : 'Buyer',
                      })
                    }
                    backgroundInactive={Colors.lightBlue}
                    style={{marginRight: 20}}
                    wide={3.5}
                    inactiveTextStyle={{
                      weight: 'bold',
                      color: Colors.white,
                      flex: 1,
                      paddingHorizontal: 5,
                    }}
                  />
                  <Text style={styles.toggleText}>
                    {'Pays for title insurance.'}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({showPayModal: !showPayModal})
                    }>
                    <Image source={Images.info} style={styles.infoIcon} />
                  </TouchableOpacity>
                  <ExpeModal
                    isVisible={showPayModal}
                    onModalWillHide={() => {
                      this.setState({showPayModal: false});
                    }}
                    icon={Images.recordingFee}
                    title="Who pays title insurance?"
                    content={[
                      'According to provision 9 of "AS IS" Residential Contract for Sale and Purchase.',
                    ]}
                  />
                </View>
              )}
              <Text style={styles.label}>Sales Price</Text>
              <TextInputMask
                refInput={input => {
                  this.sales = input;
                }}
                placeholder={'$0'}
                placeholderTextColor={'#CECECE'}
                style={styles.input}
                type={'money'}
                options={{
                  precision: 0,
                  separator: '.',
                  delimiter: ',',
                  unit: '$',
                  suffixUnit: '',
                }}
                maxLength={12}
                keyboardType={'number-pad'}
                returnKeyType="next"
                onSubmitEditing={() => {
                  this.loan.focus();
                }}
                value={salesPrice}
                onChangeText={salesprice => {
                  this.setState({
                    salesPrice: salesprice,
                    annualPropertyTax: Math.round(
                      salesprice.replace(/,|\$/g, '') * 0.0098,
                    ),
                  });
                  if (salesPrice.length > 1) {
                    this.setState({salesPriceEmpty: false});
                  }
                }}
              />
              {this.state.salesPriceEmpty && this.emptyFieldWarning()}
              {estimateFor !== 'seller' && (
                <>
                  <Text style={styles.label}>Loan Amount</Text>
                  <TextInputMask
                    refInput={input => {
                      this.loan = input;
                    }}
                    placeholder={'$0'}
                    placeholderTextColor={'#CECECE'}
                    style={styles.input}
                    type={'money'}
                    options={{
                      precision: 0,
                      separator: '.',
                      delimiter: ',',
                      unit: '$',
                      suffixUnit: '',
                    }}
                    maxLength={12}
                    keyboardType={'number-pad'}
                    returnKeyType="done"
                    value={this.state.loanAmount}
                    onChangeText={loanamount => {
                      this.setState({loanAmount: loanamount});
                      if (this.state.loanAmount.length > 1) {
                        this.setState({loanAmountEmpty: false});
                      }
                    }}
                  />
                </>
              )}
              {estimateFor !== 'seller' && (
                <CheckBox
                  onClick={() => {
                    this.setState({
                      addYourCommission: !this.state.addYourCommission,
                    });
                  }}
                  isChecked={this.state.addYourCommission}
                  checkedImage={
                    <Image source={Images.check} style={styles.checkboxIcon} />
                  }
                  unCheckedImage={
                    <Image
                      source={Images.uncheck}
                      style={styles.checkboxIcon}
                    />
                  }
                  rightText={'Add realtor commission'}
                  rightTextStyle={styles.label}
                />
              )}

              {this.state.addYourCommission === true ||
              estimateFor === 'seller' ? (
                <View>
                  <Text style={styles.label}>
                    {estimateFor === 'seller'
                      ? 'Listing Sales Commission'
                      : 'Commission Rate'}
                  </Text>
                  {!this.state.isPercentageInputFocused ? (
                    <TextInput
                      placeholder={'6%'}
                      placeholderTextColor={'#CECECE'}
                      style={styles.input}
                      onFocus={() =>
                        this.setState({isPercentageInputFocused: true})
                      }
                      maxLength={5}
                      keyboardType={'number-pad'}
                      returnKeyType="done"
                      value={
                        commissionRate.toString().length
                          ? `${commissionRate}%`
                          : commissionRate
                      }
                      onChangeText={commissionRate => {
                        this.setState({commissionRate: commissionRate});
                        if (commissionRate.length > 1) {
                          this.setState({commissionRateEmpty: false});
                        }
                      }}
                    />
                  ) : (
                    <TextInputMask
                      placeholder={'6%'}
                      placeholderTextColor={'#CECECE'}
                      autoFocus={this.state.isPercentageInputFocused}
                      onBlur={() =>
                        this.setState({isPercentageInputFocused: false})
                      }
                      style={styles.input}
                      maxLength={4}
                      type={'only-numbers'}
                      keyboardType={'number-pad'}
                      returnKeyType="done"
                      value={commissionRate}
                      onChangeText={commissionRate => {
                        this.setState({commissionRate: commissionRate});
                        if (commissionRate.length > 1) {
                          this.setState({commissionRateEmpty: false});
                        }
                      }}
                    />
                  )}
                </View>
              ) : null}
              {estimateFor === 'seller' && (
                <>
                  <Text style={styles.label}>Payoff Loan(s)</Text>
                  <TextInputMask
                    refInput={input => {
                      this.sales = input;
                    }}
                    placeholder={'$0.00'}
                    placeholderTextColor={'#CECECE'}
                    style={styles.input}
                    type={'money'}
                    options={{
                      precision: 0,
                      separator: '.',
                      delimiter: ',',
                      unit: '$',
                      suffixUnit: '',
                    }}
                    maxLength={12}
                    keyboardType={'number-pad'}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.loan.focus();
                    }}
                    value={payoffLoan}
                    onChangeText={text => {
                      this.setState({payoffLoan: text});
                      if (payoffLoan.length > 1) {
                        this.setState({payoffLoanEmpty: false});
                      }
                    }}
                  />
                  {this.state.salesPriceEmpty && this.emptyFieldWarning()}

                  <Text style={styles.label}>Seller Credit</Text>
                  <TextInputMask
                    refInput={input => {
                      this.loan = input;
                    }}
                    placeholder={'$0'}
                    placeholderTextColor={'#CECECE'}
                    style={styles.input}
                    type={'money'}
                    options={{
                      precision: 0,
                      separator: '.',
                      delimiter: ',',
                      unit: '$',
                      suffixUnit: '',
                    }}
                    maxLength={12}
                    keyboardType={'number-pad'}
                    returnKeyType="done"
                    value={sellerCredit}
                    onChangeText={text => {
                      this.setState({sellerCredit: text});
                      if (sellerCredit.length > 1) {
                        this.setState({sellerCreditEmpty: false});
                      }
                    }}
                  />
                  <View style={styles.toggleContainer}>
                    <Text style={styles.label}>Annual Property Taxes</Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({showTaxModal: !showTaxModal})
                      }>
                      <Image source={Images.info} style={styles.infoIcon} />
                    </TouchableOpacity>
                    <ExpeModal
                      isVisible={showTaxModal}
                      onModalWillHide={() => {
                        this.setState({showTaxModal: false});
                      }}
                      icon={Images.info}
                      title="Annual property taxes"
                      content={[
                        'Annual property taxes are about .98% in Florida, but may change based on assessed value or your location. This is an editable field if you know what the annual property taxes in your area are. ',
                      ]}
                    />
                  </View>
                  <TextInputMask
                    refInput={input => {
                      this.loan = input;
                    }}
                    placeholder={'$0'}
                    placeholderTextColor={'#CECECE'}
                    style={styles.input}
                    type={'money'}
                    options={{
                      precision: 0,
                      separator: '.',
                      delimiter: ',',
                      unit: '$',
                      suffixUnit: '',
                    }}
                    maxLength={12}
                    keyboardType={'number-pad'}
                    returnKeyType="done"
                    value={annualPropertyTax}
                    onChangeText={text => {
                      this.setState({annualPropertyTax: text});
                      if (this.state.annualPropertyTax.length > 1) {
                        this.setState({aptEmpty: false});
                      }
                    }}
                  />
                </>
              )}

              <TouchableOpacity
                onPress={() =>
                  this.state.floridaZipCode === true
                    ? this.calculate()
                    : alert('Zip code must be in Florida')
                }
                style={styles.buttonStyle}>
                <Text style={styles.buttonTitle}>Generate Estimate</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom: 80}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Calculator;
