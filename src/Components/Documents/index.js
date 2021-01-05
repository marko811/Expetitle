import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Images} from '../../utils';
import Moment from 'moment';

export default class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isempty: false,
    };
  }

  isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  }

  ViewDocument = url => {
    this.props.navigation.navigate('DocumentView', {
      url: url,
      hide: false
    });
  };

  render() {
    return (
      <View style={styles.documentsContainer}>
        <View style={styles.documentsHeading}>
          <Image source={Images.Documents} style={styles.headerImage} />
          <Text allowFontScaling={false} style={styles.documentsHeadingText}>Documents</Text>
        </View>

        <ScrollView
          onScroll={({nativeEvent}) => {
            if (this.isCloseToBottom(nativeEvent)) {
              this.props.fetchNextPage();
            }
          }}
          scrollEventThrottle={400}
          nestedScrollEnabled
          style={styles.documentsListContainer}>
          {this.props.Documents.map((doc, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  this.props.PreviewDocument(doc.id, this.ViewDocument);
                }}
                style={styles.documentItem}>
                {doc.name && (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Image source={Images.File} style={styles.FileIcon} />
                    </View>
                    <View>
                      <Text allowFontScaling={false} numberOfLines={1} style={styles.docName}>
                        {doc.name}
                      </Text>
                      <Text allowFontScaling={false} style={styles.docDate}>
                        Uploaded {Moment(doc.createdAt).format('MMMM DD, YYYY')}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
