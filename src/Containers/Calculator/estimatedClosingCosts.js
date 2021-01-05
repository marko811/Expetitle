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
      titleInsurance,
      commissionRate,
      typeBuyer,
      typeSeller,
      buyerRecordingFeeHigh,
      sellerRecordingFeeHigh,
      tileType,
    } = this.props.route.params;
    // Buyer Type And Seller Type Recording Fee //
    let buyerFeeHigh = typeBuyer === 'buyer' ? buyerRecordingFeeHigh : 0;
    let sellerFeeHigh = typeSeller === 'seller' ? sellerRecordingFeeHigh : 0;
    // Title Purchaser - Different Conditions //
    let BuyerTile_BuyerSide = tileType === 'Buyer' && typeBuyer === 'buyer';
    let BuyerTile_SellerSide = tileType === 'Buyer' && typeSeller === 'seller';
    let SellerTile_SellerSide =
      tileType === 'Seller' && typeSeller === 'seller';
    let SellerTile_BuyerSide = tileType === 'Seller' && typeBuyer === 'buyer';
    let BothBuyerAndSellerType =
      typeBuyer === 'buyer' && typeSeller === 'seller';

    // 1 // Regular Estimation //
    // LOW : Title Ins. + Settlement + Survey + Notary + Endorsements + Buyer Rec. + Seller Rec. //
    // HIGH : Title Ins. + Settlement + Survey + Notary + Endorsements + Buyer Rec. + Seller Rec. //
    let lowEstimateCostExtras =
      typeBuyer === 'buyer' && typeSeller === 'seller' ? 1348 : 999;
    let highEstimateCostExtras =
      typeBuyer === 'buyer' && typeSeller === 'seller' ? 1598 : 1199;
    let lowEstimation =
      titleInsurance + lowEstimateCostExtras + sellerFeeHigh + buyerFeeHigh;
    let highEstimation =
      titleInsurance + highEstimateCostExtras + sellerFeeHigh + buyerFeeHigh;

    // 2 // Title + Settlement Fee + Survey Fee + Notary Fee + Endorsements Fee + Buyer Recording Fee //
    let lowBuyerTileBuyerSide = BuyerTile_BuyerSide
      ? titleInsurance + 399 + 250 + 100 + 200 + buyerRecordingFeeHigh
      : 0;
    let highBuyerTileBuyerSide = BuyerTile_BuyerSide
      ? titleInsurance + 399 + 400 + 200 + 200 + buyerRecordingFeeHigh
      : 0;

    // 3 // Seller Recording Fee //
    let lowBuyerTileSellerSide = BuyerTile_SellerSide
      ? sellerRecordingFeeHigh
      : 0;
    let highBuyerTileSellerSide = BuyerTile_SellerSide
      ? sellerRecordingFeeHigh
      : 0;

    // 4 // Title + Seller Recording Fee //
    let lowSellerTileSellerSide = SellerTile_SellerSide
      ? titleInsurance + sellerRecordingFeeHigh
      : 0;
    let highSellerTileSellerSide = SellerTile_SellerSide
      ? titleInsurance + sellerRecordingFeeHigh
      : 0;

    // 5 // Settlement Fee + Survey Fee + Notary Fee + Endorsements Fee + Buyer Recording Fee //
    let lowSellerTileBuyerSide = SellerTile_BuyerSide
      ? 399 + 250 + 100 + 200 + buyerRecordingFeeHigh
      : 0;
    let highSellerTileBuyerSide = SellerTile_BuyerSide
      ? 399 + 400 + 200 + 200 + buyerRecordingFeeHigh
      : 0;

    this.state = {
      data: [
        SellerTile_BuyerSide
          ? null
          : BuyerTile_SellerSide
          ? null
          : {
              title:
                'Title Insurance: ' +
                '$' +
                new Intl.NumberFormat().format(Math.round(titleInsurance)),
              color: '#FE7D80',
            },
        SellerTile_SellerSide
          ? null
          : BuyerTile_SellerSide
          ? null
          : {
              title: BothBuyerAndSellerType
                ? 'Settlement Fee: $798'
                : 'Settlement Fee: $399',
              color: '#ffd437',
            },
        SellerTile_SellerSide
          ? null
          : BuyerTile_SellerSide
          ? null
          : {
              title: 'Survey: $250 - $400',
              color: '#00cac1',
            },
        SellerTile_SellerSide
          ? null
          : BuyerTile_SellerSide
          ? null
          : {
              title: 'Notary: $100 - $200',
              color: '#a17cce',
            },
        SellerTile_SellerSide
          ? null
          : BuyerTile_SellerSide
          ? null
          : {
              title: 'Endorsements: < $200',
              color: '#428ed3',
            },
        SellerTile_SellerSide
          ? null
          : BuyerTile_SellerSide
          ? null
          : typeBuyer === 'buyer'
          ? {
              title:
                'Buyer Recording Fees: ' +
                '$' +
                new Intl.NumberFormat().format(
                  Math.round(buyerRecordingFeeHigh),
                ),
              color: '#54C88C',
            }
          : null,
        typeSeller === 'seller'
          ? {
              title:
                'Seller Recording Fees: ' +
                '$' +
                new Intl.NumberFormat().format(
                  Math.round(sellerRecordingFeeHigh),
                ),
              color: '#F2545B',
            }
          : null,
        commissionRate > 1
          ? {
              title:
                'Realtor Commission: ' +
                '$' +
                new Intl.NumberFormat().format(
                  Math.round(this.props.route.params.commissionRate),
                ),
              color: '#7D93B4',
            }
          : null,
      ],
      // BOTH BUYER AND SELLER SIDE ESTIMATION BREAKDOWN //
      bothBuyerAndSellerData: [
        {
          title:
            'Title Insurance: ' +
            '$' +
            new Intl.NumberFormat().format(Math.round(titleInsurance)),
          color: '#FE7D80',
          initial: tileType === 'Buyer' ? 'B' : 'S',
        },
        {
          title: BothBuyerAndSellerType
            ? 'Settlement Fee: $798'
            : 'Settlement Fee: $399',
          color: '#ffd437',
          initial: 'SP',
        },
        {
          title: 'Survey: $250 - $400',
          color: '#00cac1',
          initial: 'B',
        },
        {
          title: 'Notary: $100 - $200',
          color: '#a17cce',
          initial: 'B',
        },
        {
          title: 'Endorsements: < $200',
          color: '#428ed3',
          initial: 'S',
        },
        typeBuyer === 'buyer'
          ? {
              title:
                'Buyer Recording Fees: ' +
                '$' +
                new Intl.NumberFormat().format(
                  Math.round(buyerRecordingFeeHigh),
                ),
              color: '#54C88C',
              initial: 'B',
            }
          : null,
        typeSeller === 'seller'
          ? {
              title:
                'Seller Recording Fees: ' +
                '$' +
                new Intl.NumberFormat().format(
                  Math.round(sellerRecordingFeeHigh),
                ),
              color: '#F2545B',
              initial: 'S',
            }
          : null,
        commissionRate > 1
          ? {
              title:
                'Realtor Commission: ' +
                '$' +
                new Intl.NumberFormat().format(
                  Math.round(this.props.route.params.commissionRate),
                ),
              color: '#7D93B4',
              initial: 'S',
            }
          : null,
      ],
      estimation: titleInsurance,
      tilePurchaserEstimation: [{low: ''}, {high: ''}],
      tasks: [], // STORE ESTIMATION HISTORY
      text: '', // STRINGIFY ESTIMATION DATA
      multiCombinationOff: false, // TILE PURCHASER TYPE CONDITIONS OFF

      // ESTIMTION BREAK DOWN ON DIFFERENT CONDITIONS //
      estimation_BuyerTile_BuyerSide: [
        {
          low: new Intl.NumberFormat().format(
            Math.round(lowBuyerTileBuyerSide),
          ),
        },
        {
          high: new Intl.NumberFormat().format(
            Math.round(highBuyerTileBuyerSide),
          ),
        },
      ],
      estimation_BuyerTile_SellerSide: [
        {
          low: new Intl.NumberFormat().format(
            Math.round(lowBuyerTileSellerSide),
          ),
        },
        {
          high: new Intl.NumberFormat().format(
            Math.round(highBuyerTileSellerSide),
          ),
        },
      ],
      estimation_SellerTile_SellerSide: [
        {
          low: new Intl.NumberFormat().format(
            Math.round(lowSellerTileSellerSide),
          ),
        },
        {
          high: new Intl.NumberFormat().format(
            Math.round(highSellerTileSellerSide),
          ),
        },
      ],
      estimation_SellerTile_BuyerSide: [
        {
          low: new Intl.NumberFormat().format(
            Math.round(lowSellerTileBuyerSide),
          ),
        },
        {
          high: new Intl.NumberFormat().format(
            Math.round(highSellerTileBuyerSide),
          ),
        },
      ],
      fullEstimation: [
        {low: new Intl.NumberFormat().format(Math.round(lowEstimation))},
        {high: new Intl.NumberFormat().format(Math.round(highEstimation))},
      ],
    };

    // CONSTANTS //
    if (BuyerTile_BuyerSide === true) {
      setTimeout(
        function() {
          this.setState({
            tilePurchaserEstimation: [
              {
                low: new Intl.NumberFormat().format(
                  Math.round(lowBuyerTileBuyerSide),
                ),
              },
              {
                high: new Intl.NumberFormat().format(
                  Math.round(highBuyerTileBuyerSide),
                ),
              },
            ],
          });
          this.setState({multiCombinationOff: true});
        }.bind(this),
        1,
      );
    }
    if (BuyerTile_SellerSide) {
      setTimeout(
        function() {
          this.setState({
            tilePurchaserEstimation: [
              {
                low: new Intl.NumberFormat().format(
                  Math.round(lowBuyerTileSellerSide),
                ),
              },
              {
                high: new Intl.NumberFormat().format(
                  Math.round(highBuyerTileSellerSide),
                ),
              },
            ],
          });
          this.setState({multiCombinationOff: true});
        }.bind(this),
        1,
      );
    }
    if (SellerTile_SellerSide === true) {
      setTimeout(
        function() {
          this.setState({
            tilePurchaserEstimation: [
              {
                low: new Intl.NumberFormat().format(
                  Math.round(lowSellerTileSellerSide),
                ),
              },
              {
                high: new Intl.NumberFormat().format(
                  Math.round(highSellerTileSellerSide),
                ),
              },
            ],
          });
          this.setState({multiCombinationOff: true});
        }.bind(this),
        1,
      );
    }
    if (SellerTile_BuyerSide === true) {
      setTimeout(
        function() {
          this.setState({
            tilePurchaserEstimation: [
              {
                low: new Intl.NumberFormat().format(
                  Math.round(lowSellerTileBuyerSide),
                ),
              },
              {
                high: new Intl.NumberFormat().format(
                  Math.round(highSellerTileBuyerSide),
                ),
              },
            ],
          });
          this.setState({multiCombinationOff: true});
        }.bind(this),
        1,
      );
    }
    this.addTask();
  }

  componentDidMount() {
    Tasks.all(tasks => this.setState({tasks: tasks || []}));
  }

  addTask = async () => {
    const {typeBuyer, typeSeller, tileType, address} = this.props.route.params;
    let BuyerTile_BuyerSide = tileType === 'Buyer' && typeBuyer === 'buyer';
    let BuyerTile_SellerSide = tileType === 'Buyer' && typeSeller === 'seller';
    let SellerTile_SellerSide =
      tileType === 'Seller' && typeSeller === 'seller';
    let SellerTile_BuyerSide = tileType === 'Seller' && typeBuyer === 'buyer';
    let BothBuyerAndSellerType =
      typeBuyer === 'buyer' && typeSeller === 'seller';
    var AddInHistory = {
      address,
      date: Date.now(),
      data: BothBuyerAndSellerType
        ? this.state.bothBuyerAndSellerData
        : this.state.data,
      estimation:
        BothBuyerAndSellerType === true
          ? this.state.fullEstimation
          : BuyerTile_BuyerSide
          ? this.state.estimation_BuyerTile_BuyerSide
          : BuyerTile_SellerSide
          ? this.state.estimation_BuyerTile_SellerSide
          : SellerTile_SellerSide
          ? this.state.estimation_SellerTile_SellerSide
          : SellerTile_BuyerSide
          ? this.state.estimation_SellerTile_BuyerSide
          : null,
    };
    setTimeout(
      function() {
        this.setState({text: JSON.stringify(AddInHistory)});
      }.bind(this),
      1,
    );
    setTimeout(
      function() {
        let notEmpty = this.state.text.trim().length > 0;
        if (notEmpty) {
          this.setState(
            prevState => {
              let {tasks, text} = prevState;
              return {
                tasks: tasks.concat({key: tasks.length, text: text}),
                text: '',
              };
            },
            () => Tasks.save(this.state.tasks),
          );
        }
      }.bind(this),
      1000,
    );
  };

  render() {
    const {typeBuyer, typeSeller, tileType, address} = this.props.route.params;
    const {
      fullEstimation,
      estimation_BuyerTile_BuyerSide,
      estimation_BuyerTile_SellerSide,
      estimation_SellerTile_SellerSide,
      estimation_SellerTile_BuyerSide,
      tilePurchaserEstimation,
    } = this.state;
    // Estimation Breakdown //
    let filtered = this.state.data.filter(function(item) {
      return item != null;
    });
    // Both Buyer & Seller Estimation Breakdown //
    let filteredBothBuyerAndSeller = this.state.bothBuyerAndSellerData.filter(
      function(item) {
        return item != null;
      },
    );
    let BuyerTile_BuyerSide = tileType === 'Buyer' && typeBuyer === 'buyer';
    let BuyerTile_SellerSide = tileType === 'Buyer' && typeSeller === 'seller';
    let SellerTile_SellerSide =
      tileType === 'Seller' && typeSeller === 'seller';
    let SellerTile_BuyerSide = tileType === 'Seller' && typeBuyer === 'buyer';
    let BothBuyerAndSellerType =
      typeBuyer === 'buyer' && typeSeller === 'seller';
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
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() =>
                  this.props.navigation.navigate('ShareEstimation', {
                    data: BothBuyerAndSellerType
                      ? filteredBothBuyerAndSeller
                      : filtered,
                    address,
                    estimation: BothBuyerAndSellerType
                      ? fullEstimation
                      : tilePurchaserEstimation,
                  })
                }>
                <Image source={Images.share} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: Platform.OS === 'android' ? Adjust(60) : Adjust(100),
              }}>
              <Text style={styles.title}>Estimated {`\n`} Closing Costs</Text>
              {BothBuyerAndSellerType ? (
                <Text style={styles.estimatedCost}>
                  {BothBuyerAndSellerType
                    ? `$${fullEstimation[0].low} - $${fullEstimation[1].high}`
                    : null}
                </Text>
              ) : (
                <Text style={styles.estimatedCost}>
                  {BuyerTile_BuyerSide === true
                    ? `$${estimation_BuyerTile_BuyerSide[0].low} - $${
                        estimation_BuyerTile_BuyerSide[1].high
                      }`
                    : typeBuyer === 'buyer' && (tileType === undefined) === true
                    ? `$${fullEstimation[0].low} - $${fullEstimation[1].high}`
                    : null}

                  {BuyerTile_SellerSide === true
                    ? `$${estimation_BuyerTile_SellerSide[0].low} - $${
                        estimation_BuyerTile_SellerSide[1].high
                      }`
                    : typeSeller === 'seller' &&
                      (tileType === undefined) === true
                    ? `$${fullEstimation[0].low} - $${fullEstimation[1].high}`
                    : null}

                  {SellerTile_SellerSide === true
                    ? `$${estimation_SellerTile_SellerSide[0].low} - $${
                        estimation_SellerTile_SellerSide[1].high
                      }`
                    : null}

                  {SellerTile_BuyerSide === true
                    ? `$${estimation_SellerTile_BuyerSide[0].low} - $${
                        estimation_SellerTile_BuyerSide[1].high
                      }`
                    : null}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.estimationBreak}>Estimation Breakdown</Text>
            <View style={styles.flatlistView}>
              {typeBuyer === 'buyer' && typeSeller === 'seller' ? (
                <View>
                  <FlatList
                    data={filteredBothBuyerAndSeller}
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
                              fontFamily: 'Poppins-Regular',
                            }}>
                            {item.initial}
                          </Text>
                        </View>
                        <Text style={styles.itemPrice}>{item.title}</Text>
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
                      <Text style={styles.itemPrice}>{item.title}</Text>
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
