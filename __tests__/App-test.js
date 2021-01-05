import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
// import App from '../App';
import Search from '../src/Components/Search/index';
import AppButton from '../src/Components/AppButton/index';
import AppHeader from '../src/Components/AppHeader/index';
// import Contacts from '../src/Components/Contacts/index';
// import Documents from '../src/Components/Documents/index';
// import DocumentView from '../src/Components/DocumentView/index';
// import ImportantDateItem from '../src/Components/ImportantDateItem/index';
// import ImportantDates from '../src/Components/ImportantDates/index';
import Loader from '../src/Components/Loader/index';
import ShareUpdate from '../src/Containers/ShareUpdate';

// import SliderItem from '../src/Components/SliderItem/index';
// import Status from '../src/Components/Status/index';

global.fetch = jest.fn(() => new Promise(resolve => resolve()));
jest.mock('react-native-gesture-handler', () => {});
jest.mock('@react-navigation/stack', () => {});
jest.mock('@react-native-community/async-storage');

it('SearchBar Renders Correctly', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('AppButton Renders Correctly', () => {
  const tree = renderer.create(<AppButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('AppHeader Renders Correctly', () => {
  const tree = renderer.create(<AppHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});

const shareUpdateParam = {
  params: {
    documents: [],
    data: {id: '', address: ''},
    token: '',
  },
};
it('ShareUpdate Renders Correctly', () => {
  const tree = renderer
    .create(<ShareUpdate route={shareUpdateParam} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// it('Contacts Renders Correctly', () => {
//   const tree = renderer.create(<Contacts />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('Documents Renders Correctly', () => {
//   const tree = renderer.create(<Documents />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('DocumentView Renders Correctly', () => {
//   const tree = renderer.create(<DocumentView />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('ImportantDateItem Renders Correctly', () => {
//   const tree = renderer.create(<ImportantDateItem />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// it('ImportantDates Renders Correctly', () => {
//   const tree = renderer.create(<ImportantDates />).toJSON();
//   expect(tree).toMatchSnapshot();
// });

it('Loader Renders Correctly', () => {
  const tree = renderer.create(<Loader />).toJSON();
  expect(tree).toMatchSnapshot();

  // });it('SliderItem Renders Correctly', () => {
  //   const tree = renderer.create(<SliderItem />).toJSON();
  //   expect(tree).toMatchSnapshot();

  // });it('Status Renders Correctly', () => {
  //   const tree = renderer.create(<Status />).toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});
