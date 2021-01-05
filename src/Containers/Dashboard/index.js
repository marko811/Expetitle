import React from 'react';
import {
  View,
  StatusBar,
  RefreshControl,
  Text,
  FlatList,
  Image,
  Linking
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'moment';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import AppHeader from '../../Components/AppHeader/index';
import styles from './styles';
import {fetchProperties, resetProperties} from './actions';
import Search from '../../Components/Search/index';
import {ExpApi} from '../../services/';
import NavigationService from '../../services/NavigationService';
import ListItemCard from '../../Components/ListItemCard';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      query: '',
      showSearchBar: true,
    };
    this.onChangeSearchTextDelayed = _.debounce(this.onChangeSearchText, 500);
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
    this.fetchProperties(1);

	}
	componentWillUnmount() {
		Linking.removeEventListener('url', this._handleOpenURL);
	}
	_handleOpenURL(event) {
    const {url} = event;
    console.log('url%%%%%%%%%', url);
		const ary = url.replace(/.*?:\/\//g, '').split("/");
    NavigationService.navigate("TransactionDetail", {
      itemId: ary[1],
    });
	}


  fetchProperties = page => {
    this.setState({page});
    AsyncStorage.getItem('userToken').then(value => {
      if (value) {
        const token = `Bearer ${JSON.parse(value)}`;
        this.props.fetchProperties(page, this.state.query, token);
      } else {
        console.log('null');
      }
    });
  };

  fetchNext = () => {
    if (
      this.props.endReached ||
      this.props.loading ||
      this.state.query.length > 0
    ) {
      return;
    }
    this.fetchProperties(this.state.page + 1);
  };

  _onRefresh = () => {
    this.fetchProperties(1);
  };

  onChangeSearchText = text => {
    this.setState({query: text}, () => {
      this.fetchProperties(1);
    });
  };

  handleNavigation = (id, address, navigation) => {
    NavigationService.navigate('TransactionDetail', {
      itemId: id,
      itemaddress: address,
    });
  };

  getCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 200
    );
  }

  scrollStartOffset = 0;
  onScroll = nativeEvent => {
    const {showSearchBar} = this.state;
    const offsetY = nativeEvent.contentOffset.y;
    if (offsetY < 200 && !showSearchBar) {
      this.setState({showSearchBar: true});
    } else if (
      offsetY > 200 &&
      this.scrollStartOffset < offsetY &&
      showSearchBar
    ) {
      this.setState({showSearchBar: false});
    } else if (
      offsetY > 200 &&
      this.scrollStartOffset > offsetY &&
      !showSearchBar
    ) {
      this.setState({showSearchBar: true});
    }
    this.scrollStartOffset = offsetY;
  };

  _renderPropertyItem = ({item}) => {
    const property = item;
    return (
      <ListItemCard
        key={property.index}
        style={
          property.status == 'archived'
            ? {
                backgroundColor: '#FCFDFE',
                opacity: 0.5,
              }
            : {}
        }
        onPress={() =>
          this.handleNavigation(item.id, item.address, this.props.navigation)
        }>
        <View style={styles.imageContainer}>
          <Image
            style={styles.propertyImage}
            source={{uri: property.images.large}}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={[
              styles.addressStyle,
              property.status == 'archived'
                ? {
                    color: '#AAA',
                  }
                : {},
            ]}>
            {property.address}
          </Text>
          <View style={styles.closingDateContainer}>
            <Text allowFontScaling={false} style={styles.closingDateLabel}>
              Closing Date:{' '}
            </Text>
            <Text allowFontScaling={false} style={styles.closingDate}>
              {Moment(property.closingDate).format('MMM DD, YYYY')}
            </Text>
          </View>
          <View style={styles.startDateContainer}>
            <Text allowFontScaling={false} style={styles.startDateLabel}>
              Start Date:{' '}
            </Text>
            <Text allowFontScaling={false} style={styles.startDate}>
              {Moment(property.createdAt).format('MMM DD, YYYY')}
            </Text>
          </View>
          <View style={styles.DotsContainer}>
            {_.range(parseInt(property.stageStatusComplete)).map(
              (item, index) => {
                return <View key={index} style={styles.greenDot} />;
              },
            )}
            {_.range(parseInt(property.stageStatusPending)).map(
              (item, index) => {
                return <View key={index} style={styles.yellowDot} />;
              },
            )}
            {_.range(parseInt(property.stageStatusEmpty)).map((item, index) => {
              return <View key={index} style={styles.greyDot} />;
            })}
          </View>
        </View>
      </ListItemCard>
    );
  };

  render() {
    const {showSearchBar} = this.state;
    const {properties, loading} = this.props;
    return (
      <View style={styles.dashRoot}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader
          showLeftIcon={false}
          title={'Properties'}
          navigation={this.props.navigation}
        />
        {showSearchBar && (
          <Search
            onSubmitEditing={this.handleSubmit}
            onChangeText={this.onChangeSearchTextDelayed}
          />
        )}
        <FlatList
          data={properties}
          renderItem={this._renderPropertyItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this._onRefresh}
              tintColor={'#aaa'}
            />
          }
          onScroll={event => this.onScroll(event.nativeEvent)}
          contentContainerStyle={styles.dashContainer}
          ListEmptyComponent={() => {
            if (loading) return null;
            else return <Text style={styles.emptyText}>No results</Text>;
          }}
          onEndReachedThreshold={0.4}
          onEndReached={this.fetchNext}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {properties, endReached} = state.dashboardState;
  const {loading} = state.appState;
  return {
    properties,
    endReached,
    loading,
  };
};

const mapDispatchToProps = (dispatch: (...any) => void) => ({
  dispatch,
  fetchProperties: (page, query, token) => {
    dispatch(fetchProperties(page, query, token));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
