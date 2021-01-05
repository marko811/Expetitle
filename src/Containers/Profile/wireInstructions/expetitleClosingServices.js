import React from 'react';
import {View, Text, StatusBar, ScrollView, FlatList} from 'react-native';
import AppHeader from '../../../Components/AppHeader/index';
import styles from './styles';

class ExpetitleClosingServices extends React.Component {
  render() {
    const {params} = this.props.route;
    return (
      <View style={{backgroundColor: '#F6F8Fd', flex: 1}}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader
          onPressLeft={() => this.props.navigation.goBack()}
          title={'Wire Instructions'}
        />
        <View style={styles.wireSubHeader}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={styles.wireSubHeaderText}>
            {params}
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginLeft: 30,
            marginRight: 30,
            top: 10,
            margin: 10,
            flexGrow: 1,
          }}>
          <Text style={styles.wireDetailsTitle}>Bank Name</Text>
          <Text style={styles.wireDetailsSubTitle}>
            FIRST AMERICAN TRUST, FSB ACCOUNT
          </Text>

          <Text style={styles.wireDetailsTitle}>Account Name</Text>
          <Text style={styles.wireDetailsSubTitle}>EXPETITLE SAFE ESCROW</Text>

          <Text style={styles.wireDetailsTitle}>Bank Address</Text>
          <Text style={styles.wireDetailsSubTitle}>
            5 FIRST AMERICAN WAY SANTA ANA, CA, 92707
          </Text>

          <Text style={styles.wireDetailsTitle}>Account Information</Text>
          <Text style={styles.wireDetailsSubTitle}>
            ROUTING NUMBER: 122241255 {`\n`}ACCOUNT NUMBER: 2910110801
          </Text>

          <Text style={styles.wireDetailsTitle}>Notices</Text>
          <Text style={styles.wireDetailsSubTitle}>
            PLEASE NOTE{' '}
            <Text style={styles.wireDetailsSubTitle1}>
              OUR BANK ONLY ACCEPTS SAME DAY WIRE TRANSFERS
            </Text>{' '}
            - NO ACH
          </Text>
          <Text style={styles.wireDetailsSubTitle}>
            REFERENCE THE PROPERTY ADDRESS AND EXPETITLE FOR EASY IDENTIFICATION
          </Text>
          <View style={{marginBottom: 80}} />
        </ScrollView>
      </View>
    );
  }
}

export default ExpetitleClosingServices;
