import React from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  Text,
  Image,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppHeader from '../../Components/AppHeader/index';
import {SwipeListView} from 'react-native-swipe-list-view';
import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Images} from '../../utils';
import styles from './styles';

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

class EstimateHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    Tasks.all(tasks => this.setState({data: tasks || []}));
    // AsyncStorage.removeItem('TASKS');
  }
  render() {
    const closeRow = (rowMap, rowKey) => {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
    // DELETE //
    const deleteRow = (rowMap, rowData) => {
      this.setState(
        prevState => {
          const date = JSON.parse(rowData).date;
          let tasks = prevState.data.filter(
            i => JSON.parse(i.text).date !== date,
          );
          // tasks.splice(rowKey, 1);
          return {data: tasks};
        },
        () => Tasks.save(this.state.data),
      );
    };
    // RENDER //
    const renderItem = data => {
      let datas = JSON.parse(data.item.text);
      // var historyData = this.state.data.reverse()
      return (
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#F6F8FD"
          onPress={() =>
            this.props.navigation.navigate('ViewEstimationHistory', {
              data: datas.data,
              address: datas.address,
              estimaton: datas.estimation,
              total_price: datas.total_price,
            })
          }>
          <View style={styles.rowFront}>
            <View style={styles.rowView}>
              <Text style={styles.rowAddressText}>{datas.address}</Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  color: '#9a9a9a',
                }}>
                {moment(datas.date).format('MMMM Do YYYY')}
              </Text>
            </View>
            {datas.total_price ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: 1,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: '#9a9a9a',
                  }}>
                  ${new Intl.NumberFormat().format(datas.total_price)}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  flexGrow: 1,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: '#9a9a9a',
                  }}>
                  {'$'}
                  {datas.estimation[0].low}
                </Text>
                <Text>{' - '}</Text>
                <Text
                  style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: 14,
                    color: '#9a9a9a',
                  }}>
                  {'$'}
                  {datas.estimation[1].high}
                </Text>
              </View>
            )}
          </View>
        </TouchableHighlight>
      );
    };

    const renderHiddenItem = (data, rowMap) => (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowMap, data.item.text)}>
          <Image
            source={Images.closeRound}
            style={{height: 36, width: 36, tintColor: '#ffa185'}}
          />
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <AppHeader
          title={'Estimate History'}
          onPressLeft={() => this.props.navigation.goBack()}
          showLeftIcon
          showRightIcon={{
            fontSize: 24,
            fontFamily: 'Roboto-Medium',
            color: 'white',
            width: '50%',
            marginLeft: 20,
          }}
        />
        <View style={styles.containerEstiamtion}>
          {this.state.data.length > 0 ? (
            <SwipeListView
              style={{width: '85%', paddingTop: 20}}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              data={this.state.data.reverse()}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={0}
              rightOpenValue={-75}
              previewRowKey={'0'}
              previewOpenValue={-40}
              previewOpenDelay={3000}
            />
          ) : (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 17,
                textAlign: 'center',
                width: '70%',
                alignSelf: 'center',
                paddingTop: 50,
                color: '#2b3d5b',
                lineHeight: 35,
              }}>
              Generate your first estimate to view the History
            </Text>
          )}
        </View>
        <View style={{marginBottom: 50}} />
      </View>
    );
  }
}

export default EstimateHistory;
