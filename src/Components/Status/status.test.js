import React from 'react';
import 'react-native';
import {render} from '@testing-library/react-native';
import Status from './index';

test('Icon title should be shown only if there are enabled stages', () => {
  const {queryByLabelText, queryAllByLabelText, rerender} = render(
    <Status stagelist={[]} HighlightedIndex={index => {}} />,
  );
  expect(queryByLabelText('stage-title')).toBeNull();
  const stagelist = [
    {
      description:
        'The buyer and seller have been added to the system. All other parties, if not already added, can be added at any point during the closing.',
      enabled: true,
      id: 'd7df9a8b-483c-47b3-b270-6cc2aff5faf8',
      index: 1,
      name: 'Effective Date',
      refId: 's_d7df9a8b-483c-47b3-b270-6cc2aff5faf8',
      status: 'complete',
      transactionId: '44376017-7db7-4df9-ae10-b467273afcaa',
    },
    {
      description:
        'A deposit made to the escrow account depending on the contract. Once complete an Escrow letter is sent.<br> Empty: The initial deposit has not been submitted <br> Yellow: The initial deposit has been submitted but pending acceptance <br> Green: The initial deposit has been submitted and accepted',
      enabled: true,
      id: 'd9ed6d2f-8727-482d-9148-02bf0c9d2ad3',
      index: 2,
      name: 'Initial Deposit',
      refId: 's_d9ed6d2f-8727-482d-9148-02bf0c9d2ad3',
      status: 'empty',
      transactionId: '44376017-7db7-4df9-ae10-b467273afcaa',
    },
    {
      description:
        'In this step, the seller must upload leases and prior title policy. <br> Empty: The seller documents have not been submitted <br> Yellow: The documents have been submitted and being looked at by the Title Agent <br> Green: The seller documents have been submitted and accepted',
      enabled: false,
      id: 'b2e31aee-ab6d-487d-b167-bc382c61f804',
      index: 3,
      name: 'Intake Documents',
      refId: 's_b2e31aee-ab6d-487d-b167-bc382c61f804',
      status: 'empty',
      transactionId: '44376017-7db7-4df9-ae10-b467273afcaa',
    },
  ];
  rerender(<Status stagelist={stagelist} HighlightedIndex={index => {}} />);
  expect(queryAllByLabelText('stage-icon')).toHaveLength(2);
});
