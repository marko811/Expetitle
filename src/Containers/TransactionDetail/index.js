import React from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  FetchStages,
  FetchImportantDates,
  FetchDocuments,
  FetchContacts,
  PreviewDocument,
  ResetState,
  FetchTransactionDetails
} from './actions';
import { connect } from 'react-redux';
import AppHeader from '../../Components/AppHeader/index';
import Status from '../../Components/Status/index';
import Documents from '../../Components/Documents/index';
import Contacts from '../../Components/Contacts/index';
import ImportantDates from '../../Components/ImportantDates/index';
import styles from './styles';
import Loader from '../../Components/Loader/index';
import { Images } from '../../utils';
import { showToast } from '../../services/operators';
import * as _ from 'lodash';

class TransactionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      id: '',
      address: '',
      page: 1,
      highlightIndex: 0,
      data: [{ id: '' }, { address: '' }],
    };
  }
  componentDidMount() {
    const { params } = this.props.route;
    const itemId = params ? params.itemId : null;
    // TODO: Chedo? the address is never coming from route as below, please check it!!
    const itemAddress = params ? params.itemaddress : null;
    this.setState({
      id: itemId,
      address: itemAddress,
      data: {
        id: itemId,
        address: itemAddress,
      },
    });
    this.fetchToken(itemId);
  }

  componentWillUnmount() {
    this.props.ResetState();
  }

  async fetchToken(itemId) {
    let token = '';
    await AsyncStorage.getItem('userToken').then(value => {
      if (value !== null) {
        token = `Bearer ${JSON.parse(value)}`;
        this.setState({
          token: token,
        });
        this.props.FetchStages(itemId, token);
        this.props.FetchImportantDates(itemId, token);
        this.props.FetchDocuments(
          itemId,
          token,
          this.state.page,
          this.props.Documents,
        );
        this.props.FetchContacts(itemId, token);
        this.props.FetchTransactionDetails(itemId, token);
      } else {
        console.log('null');
      }
    });
  }

  fetchNextPage = () => {
    let page = this.state.page;
    this.setState(
      {
        page: page + 1,
      },
      () => {
        this.props.FetchDocuments(
          this.state.id,
          this.state.token,
          this.state.page,
          this.props.Documents,
        );
      },
    );
  };

  PreviewDocument = (id, ViewDocument) => {
    this.props.PreviewDocument(
      id,
      this.state.token,
      this.openLink,
      ViewDocument,
    );
  };

  setHighlightedImportantDate = ind => {
    this.setState({
      highlightIndex: ind,
    });
  };

  handleNavigation = (Stages, Documents, ImportantDates, data, token) => {
    this.props.navigation.navigate('ShareUpdate', {
      data: data,
      stages: Stages,
      documents: Documents,
      dates: ImportantDates,
      token: this.state.token,
    });
  };

  render() {
    const { error, transactionDetails } = this.props;
    const address = _.get(transactionDetails, ['address'], '');
    const addresses = address.split(', ');
    return (
      <View>
        <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
        <AppHeader
          title={'Property Detail'}
          onPressLeft={() => this.props.navigation.goBack()}
          rightIcon={Images.shareUpdate}
          rightIconStyle={{ height: 22, width: 22 }}
          onPressRight={() => {
            this.props.Label === 'TransactionDetail'
              ? this.props.navigation.goBack()
              : this.handleNavigation(
                this.props.Stages,
                this.props.Documents,
                this.props.ImportantDates,
                this.state.data,
                this.state.token,
              );
          }}
        />

        <View style={styles.propertyDetailsView}>
          <Text allowFontScaling={false} style={styles.propertyDetailsText}>
            {addresses[0] === undefined ? '' : addresses[0]}
          </Text>
          <Text allowFontScaling={false} style={styles.propertyDetailsText}>
            {`${addresses[1] === undefined ? '' : addresses[1]}, ${addresses[2] === undefined ? '' : addresses[2]}, ${addresses[3] === undefined ? '' : addresses[3]}`}
          </Text>
        </View>
        <Loader isVisible={this.props.loading} />
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={styles.transactionDetailContainer}>
          <Status
            HighlightedIndex={index => {
              this.setHighlightedImportantDate(index);
            }}
            stagelist={this.props.Stages}
          />
          <ImportantDates
            highlightIndex={this.state.highlightIndex}
            stagelist={this.props.Stages}
            ImportantDates={this.props.ImportantDates}
          />
          <Documents
            url={this.props.url}
            navigation={this.props.navigation}
            fetchNextPage={() => this.fetchNextPage()}
            PreviewDocument={(id, ViewDocument) =>
              this.PreviewDocument(id, ViewDocument)
            }
            Documents={this.props.Documents}
          />
          <Contacts
            showToast={() => showToast('Email Copied to Clipboard')}
            Contacts={this.props.Contacts}
          />
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {
    loading,
    loadingDocuments,
    error,
    Stages,
    ImportantDates,
    Documents,
    Contacts,
    url,
    transactionDetails
  } = state.TransactionState;
  return {
    loading,
    error,
    Stages,
    ImportantDates,
    loadingDocuments,
    Documents,
    Contacts,
    url,
    transactionDetails
  };
};

const mapDispatchToProps = (dispatch: (...any) => void) => ({
  dispatch,
  FetchStages: (id, token) => {
    dispatch(FetchStages(id, token));
  },
  FetchImportantDates: (id, token) => {
    dispatch(FetchImportantDates(id, token));
  },
  FetchDocuments: (id, token, page, prevDocs) => {
    dispatch(FetchDocuments(id, token, page, prevDocs));
  },
  FetchContacts: (id, token) => {
    dispatch(FetchContacts(id, token));
  },
  PreviewDocument: (id, token, openLink, ViewDocument) => {
    dispatch(PreviewDocument(id, token, openLink, ViewDocument));
  },
  ResetState: () => {
    dispatch(ResetState());
  },
  FetchTransactionDetails: (id, token) => {
    dispatch(FetchTransactionDetails(id, token));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionDetail);
