import * as transactionMock from 'mocks/noves/transaction';

import generateFlowViewData from './generateFlowViewData';

const t = (key: string) => key;

it('creates asset flows items', async() => {
  const result = generateFlowViewData(transactionMock.transaction, transactionMock.transaction.accountAddress, t);

  expect(result).toEqual(
    [
      {
        action: {
          label: 'transactions.common.sent',
          amount: '3000',
          flowDirection: 'toRight',
          token: {
            address: '0x1bfe4298796198f8664b18a98640cec7c89b5baa',
            decimals: 18,
            name: 'transactions.common.pqrtest',
            symbol: 'PQR',
          },
        },
        rightActor: {
          address: '0xdD15D2650387Fb6FEDE27ae7392C402a393F8A37',
          name: null,
        },
        accountAddress: '0xef6595a423c99f3f2821190a4d96fce4dcd89a80',
      },
      {
        action: {
          label: 'transactions.common.paid_gas',
          amount: '0.000395521502109448',
          flowDirection: 'toRight',
          token: {
            address: 'ETH',
            decimals: 18,
            name: 'ETH',
            symbol: 'ETH',
          },
        },
        rightActor: {
          address: '',
          name: 'transactions.common.validators',
        },
        accountAddress: '0xef6595a423c99f3f2821190a4d96fce4dcd89a80',
      },
    ],
  );
});
