import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import AppHeader from '../../../Components/AppHeader/index';
import {Images} from '../../../utils';
import styles from './styles';

class WireInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wires: [
        {title: 'Beycome Title', chevron: Images.chevronRight},
        {title: 'Expetitle Closing Services', chevron: Images.chevronRight},
      ],
    };
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={{backgroundColor: '#f6f8fd', flex: 1}}>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader
          onPressLeft={() => this.props.navigation.goBack()}
          title={'Wire Instructions'}
        />
        <View style={styles.aboutContainer}>
          <FlatList
            data={this.state.wires}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    if (item.title === 'Beycome Title') {
                      navigate('BeycomeTitle', item.title);
                    }
                    if (item.title === 'Expetitle Closing Services') {
                      navigate('ExpetitleClosingServices', item.title);
                    }
                  }}
                  key={index}
                  style={styles.wiresFlatListStyle}>
                  <Text style={styles.wiresTitle}>{item.title}</Text>
                  <Image
                    source={item.chevron}
                    style={styles.wiresTitleChevron}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

export default WireInstructions;
