import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as _ from 'lodash';
import styles from './styles';
import {Images, Adjust} from '../../utils';
import {ImageParcer} from './ImageParcer';

export default class Status extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      expanded: false,
    };
    this.onViewableItemsChanged = _.debounce(this.onViewableIconsChanged, 300);
  }

  animating = false;
  viewabilityConfig = {
    waitForInteraction: false,
    itemVisiblePercentThreshold: 75,
  };

  onScroll = nativeEvent => {
    const filteredStageList = this.props.stagelist.filter(function(item) {
      return item.enabled === true;
    });
    const contentOffsetX = nativeEvent.contentOffset.x;
    const itemWidth = Adjust(75);
    const rounded = Math.round(contentOffsetX / itemWidth);
    if (rounded >= 0) {
      const index = Math.min(rounded, filteredStageList.length - 1);
      this.setState({index});
      this.props.HighlightedIndex(filteredStageList[index].index - 1);
    }
  };

  onViewableIconsChanged = ({viewableItems, changed}) => {
    !this.animating && this.onScrollEnd();
  };

  onScrollEnd = () => {
    const {index} = this.state;
    this.scrollView &&
      this.scrollView.scrollToIndex({
        index,
        viewPosition: 0.5,
        Animated: true,
      });
  };

  onPressIcon = index => {
    if (this.animating) return;
    this.scrollView &&
      this.scrollView.scrollToIndex({
        index,
        viewPosition: 0.5,
        Animated: true,
      });
    this.animating = true;
    setTimeout(() => {
      this.animating = false;
      this.setState({index});
    }, 500);
  };

  _renderItemWithParallax = ({item, index}) => {
    const image = ImageParcer[item.name][item.status];
    const focused = index === this.state.index;
    const size = focused ? 80 : 40;
    return (
      <View
        accessibilityLabel="stage-icon"
        style={[
          styles.slideItemContainer,
          {width: Adjust(75), opacity: focused ? 1 : 0.4},
        ]}>
        <TouchableOpacity onPress={() => this.onPressIcon(index)}>
          <Image
            source={image}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              marginTop: focused ? 0 : size,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  toggleExpandView = () => {
    const {expanded} = this.state;
    this.setState({expanded: !expanded});
  };

  render() {
    const {index, expanded} = this.state;
    const filteredStageList = this.props.stagelist.filter(function(item) {
      return item.enabled === true;
    });
    return (
      <View style={styles.statusContainer}>
        <View style={styles.stagesHeading}>
          <Image source={Images.Status} style={styles.HeaderImage} />
          <Text allowFontScaling={false} style={styles.statusHeadingText}>
            Status
          </Text>
        </View>
        {filteredStageList.length > 0 && (
          <View style={styles.statusTextContainer}>
            <View
              key={index}
              style={{
                width: Adjust(375),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                allowFontScaling={false}
                accessibilityLabel="stage-title"
                style={{
                  color: '#7d7d7d',
                  fontSize: 16,
                  flexWrap: 'wrap',
                  fontFamily: 'Roboto-Medium',
                }}>
                {filteredStageList[index].name}
              </Text>
              <Image
                source={Images.arrow}
                style={{width: 8, height: 12}}
                resizeMode="stretch"
              />
            </View>
          </View>
        )}
        <View style={styles.scrollImagesContainer}>
          {filteredStageList.length > 0 && (
            <FlatList
              ref={ref => (this.scrollView = ref)}
              data={filteredStageList}
              renderItem={this._renderItemWithParallax}
              onScroll={event => this.onScroll(event.nativeEvent)}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingHorizontal: Adjust(150)}}
              scrollEventThrottle={60}
              horizontal
              viewabilityConfig={this.viewabilityConfig}
              onViewableItemsChanged={this.onViewableItemsChanged}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        {filteredStageList.length > 0 && (
          <View style={styles.expandIconView}>
            <TouchableOpacity onPress={this.toggleExpandView}>
              <Icon
                name={expanded ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={25}
                style={{color: '#29354b', padding: 5, opacity: 0.29}}
              />
            </TouchableOpacity>
            {expanded && (
              <Text allowFontScaling={false} style={styles.expandText}>
                {filteredStageList[index].description.replace(/<br> /g, '\n')}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  }
}
