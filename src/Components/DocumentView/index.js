import React from 'react';
import { View, Image, TouchableOpacity, Text, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios'
import WebView from 'react-native-webview';
import PDFView from 'react-native-view-pdf';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import Share from 'react-native-share';
import { Images } from '../../utils';
import styles from './styles';

export default class DocumentView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spinner: false,
      isLoaded: false,
      pdf: false,
      ext: false,
      token: ''
    }
    const { params } = this.props.route;
    const url = params ? params.url : '';
    let googledocpath = 'https://docs.google.com/gview?embedded=true&url=';
    let mypath = googledocpath + url;
    axios(url, { method: 'GET', headers: { Authorization: this.state.token } }).then(response => {
      var regex = /^.*\.(doc"|DOC"|docx"|DOCX"|ppt"|PPT"|pptx"|PPTX"|xls"|XLS"|xlsx"|XLSX")$/;
      if (regex.test(JSON.stringify(response.headers["content-disposition"])) === true && Platform.OS === "android") {
        this.setState({ ext: true, pdf: false })
      } else {
        this.setState({ ext: false, pdf: true })
      }
    })
  }
  async componentDidMount() {
    await AsyncStorage.getItem('userToken').then((value) => {
      if (value !== null) {
        token = `Bearer ${JSON.parse(value)}`;
        this.setState({
          token: token
        });
      } else {
        console.log('null');
      }
    });
    this.setState({ spinner: true })
  }
  render() {
    const { params } = this.props.route;
    const url = params ? params.url : '';
    let googledocpath = 'https://docs.google.com/gview?embedded=true&url=';
    let mypath = googledocpath + url;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', width: '95%', justifyContent: 'space-between', alignSelf: 'center' }}>
          {this.props.route.params.hide === false ? <TouchableOpacity style={styles.crosscontainer} onPress={() =>
            Share.open(
              { url: url }
            )
              .then((res) => { console.log(res) })
              .catch((err) => { err && console.log(err); })
          }>
            <Image style={styles.share} source={Images.share} />
          </TouchableOpacity> : <Text>{``}</Text>}


          <TouchableOpacity style={styles.crosscontainer} onPress={() => {
            this.props.navigation.goBack();
          }}>
            <Image style={styles.cross} source={Images.close} />
          </TouchableOpacity>
        </View>
        {this.state.ext === true ? <WebView
          style={{ flex: 1 }}
          startInLoadingState={true}
          useWebKit
          onLoadEnd={() => this.setState({ spinner: false })}
          source={{
            uri: mypath,
          }}
        /> : <PDFView
            fadeInDuration={250.0}
            style={{ flex: 1, backgroundColor: '#ddd' }}
            resource={url}
            resourceType={'url'}
            onLoad={() => this.setState({ spinner: false })}
            onError={() => this.setState({ canReload: true })}
          />}
        <Spinner
          visible={this.state.spinner}
          textContent="Loading..."
          textStyle={{ fontSize: 18, color: '#FFF' }}
          animation={'fade'}
        />
      </View>
    );
  }
}