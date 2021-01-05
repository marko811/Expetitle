import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  FlatList,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
  TouchableHighlight,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DropDownPicker from 'react-native-dropdown-picker';
import AppHeader from '../../Components/AppHeader/index';
import ExpCheckBox from '../../Components/Checkbox';

import Contacts from 'react-native-contacts';
import AutoTags from 'react-native-tag-autocomplete';
import {ExpApi} from '../../services/';
import {Images, Validation, Adjust, Colors} from '../../utils';
import styles from './styles';
import Loader from '../../Components/Loader';
import {validateEmail} from '../../services/operators';
import ErrorBox from '../../Components/ErrorBox';
const ShareUpdate = ({route, navigation}) => {
  const [documentsList] = useState(route.params.documents || []);
  const [recipents, setRecipents] = useState([]);
  const [dropdownItems, setDropdownItems] = useState([]);
  const [controller, setController] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [shareStatus, setShareStatus] = useState(true);
  const [shareDates, setShareDates] = useState(true);
  const [selectedIds, setSelectedIds] = useState(
    route.params.documents.map(i => i.id) || [],
  );
  const [loading, setLoading] = useState(false);
  const [submitted, submit] = useState(false);
  const messageRef = useRef(null);

  const {address} = route.params.data;
  const addresses = address.split(', ');

  useEffect(() => {
    initialize();
  }, []);

  initialize = () => {
    const {documents} = route.params;
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied') {
          alert('Contacts Permission Denied');
        } else {
          let data = [];
          contacts.reduce((r, e) => {
            if (e.emailAddresses && e.emailAddresses.length) {
              e.emailAddresses.forEach(c => {
                if (!validateEmail(c.email)) return;
                if (Platform.OS === 'ios') {
                  data.push({
                    label: `${e.givenName} ${e.familyName} \n( ${c.email} )`,
                    name: e.givenName + ' ' + e.familyName,
                    email: c.email,
                  });
                } else {
                  data.push({label: e.displayName, email: c.email});
                }
              });
            }
            return r;
          });
          setDropdownItems(data);
        }
      });
    });
  };

  onAddRecipent = item => {
    if (!item.email) return;
    const updatedRecipents = recipents.concat([item]);
    setRecipents(updatedRecipents);
    const updatedDropdownItems = dropdownItems.filter(i => {
      const find = updatedRecipents.find(r => r.email === i.email);
      if (find) return false;
      else return true;
    });
    setDropdownItems(updatedDropdownItems);
  };

  onRemoveRecipent = recipent => {
    const updatedRecipents = recipents.filter(i => i.email !== recipent.email);
    setRecipents(updatedRecipents);
    const updatedDropdownItems = dropdownItems.concat([recipent]);
    setDropdownItems(updatedDropdownItems);
  };

  onToggleDocumentsCheck = () => {
    if (selectedIds.length > 0) {
      // remove all documents
      setSelectedIds([]);
    } else {
      // check all documents
      setSelectedIds(route.params.documents.map(i => i.id));
    }
  };

  onToggleDocumentIdCheck = id => {
    const find = selectedIds.find(i => i === id);
    if (find) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds(selectedIds.concat([id]));
    }
  };

  shareUpdate = () => {
    submit(true);
    if (recipents.length === 0 || subject.length === 0 || message.length === 0)
      return;

    setLoading(true);
    const token = route.params.token;
    const id = route.params.data.id;
    var param = {
      recipients: recipents,
      subject: subject,
      message: message,
      shareData: {
        status: shareStatus,
        importantDates: shareDates,
        documentIds: selectedIds,
      },
    };
    console.log({param});

    ExpApi.ShareUpdate(id, token, param, {})
      .then(response => {
        if (response.status === 200) {
          navigation.navigate('Sent');
        }
        if (response.status === 400) {
          alert(response.data.message);
        }
        setRecipents([]);
        setSubject('');
        setMessage('');
        submit(false);
        setLoading(false);
      })
      .catch(error => {
        console.log({error});
        alert(
          'We have Unexpected Error ' +
            JSON.stringify(error) +
            ', Kindly Contact Support',
        );
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#025ef8" barStyle="light-content" />
      <AppHeader
        title={'Share Update'}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={styles.propertyDetailsView}>
        <Text allowFontScaling={false} style={styles.propertyDetailsText}>
          {addresses[0]}
        </Text>
        <Text allowFontScaling={false} style={styles.propertyDetailsText}>
          {`${addresses[1]}, ${addresses[2]}, ${addresses[3]}`}
        </Text>
      </View>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: 'center',
          paddingVertical: 20,
        }}>
        <View style={styles.recipentsView}>
          {recipents.map(r => (
            <TouchableOpacity
              style={styles.recipentItemView}
              onPress={() => onRemoveRecipent(r)}>
              <Text style={styles.buttonText}>{r.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {submitted && recipents.length === 0 && (
          <ErrorBox
            containerStyle={{width: Adjust(345)}}
            text="You must select 1 recipent at least"
            imageSource={Images.error2}
          />
        )}
        <DropDownPicker
          items={dropdownItems}
          defaultValue={null}
          containerStyle={{
            height: Adjust(45),
            width: Adjust(345),
          }}
          dropDownMaxHeight={Adjust(250)}
          style={{backgroundColor: '#fafafa', backgroundColor: 'transparent'}}
          placeholder=""
          placeholderStyle={{color: Colors.placeholder, fontSize: 20}}
          labelStyle={{color: Colors.label, fontSize: 20}}
          searchableStyle={{color: Colors.label, fontSize: 20}}
          searchableError={() => (
            <Text style={{color: Colors.placeholder, textAlign: 'center'}}>
              No results
            </Text>
          )}
          arrowColor={Colors.placeholder}
          selectedLabelStyle={{opacity: 0}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => onAddRecipent(item)}
          searchable
          controller={instance => {
            if (!controller) setController(instance);
          }}
        />
        <View style={styles.recipentInputView}>
          <Text style={styles.recipentInputText}>Recipent(s)</Text>
        </View>
        <Text style={styles.label}>Subject</Text>
        {submitted && subject.length === 0 && (
          <ErrorBox
            containerStyle={{width: Adjust(345)}}
            text="This field is required"
            imageSource={Images.error2}
          />
        )}
        <TextInput
          allowFontScaling={false}
          placeholder={'Subject'}
          style={styles.subjectStyle}
          placeholderTextColor={Colors.placeholder}
          onChangeText={subject => setSubject(subject)}
          value={subject}
          maxLength={100}
          onSubmitEditing={() => {
            messageRef.current.focus();
          }}
          returnKeyType={'next'}
        />
        <Text style={styles.label}>Write Message</Text>
        {submitted && message.length === 0 && (
          <ErrorBox
            containerStyle={{width: Adjust(345)}}
            text="This field is required"
            imageSource={Images.error2}
          />
        )}
        <TextInput
          ref={messageRef}
          allowFontScaling={false}
          placeholder={'Messages'}
          style={styles.messageStyle}
          placeholderTextColor={Colors.placeholder}
          onChangeText={msg => setMessage(msg)}
          value={message}
          maxLength={1024}
          multiline
        />
        <View style={styles.checkboxRowView}>
          <Text style={styles.label}>What would you like to share:</Text>
          <ExpCheckBox
            onClick={() => setShareStatus(!shareStatus)}
            checked={shareStatus}
            rightText={'Status'}
          />
          <ExpCheckBox
            onClick={() => setShareDates(!shareDates)}
            checked={shareDates}
            rightText={'Important Dates'}
          />
          <ExpCheckBox
            onClick={onToggleDocumentsCheck}
            checked={selectedIds.length > 0}
            rightText={'Documents'}
          />
          <View style={{paddingLeft: Adjust(30)}}>
            {documentsList.map(document => {
              const doc = selectedIds.find(i => document.id === i);
              return (
                <ExpCheckBox
                  onClick={() => onToggleDocumentIdCheck(document.id)}
                  checked={doc}
                  rightText={document.name}
                />
              );
            })}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => this.shareUpdate()}
          style={styles.buttonView}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            Send Email
          </Text>
        </TouchableOpacity>
      </View>
      <Loader isVisible={loading} />
    </View>
  );
};

export default ShareUpdate;
