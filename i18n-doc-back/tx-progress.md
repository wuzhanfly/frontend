# Tx Module Internationalization Progress

## Module: Tx
- Module Path: ui/tx/**
- Status: completed
- Progress: 0/13

## Hardcoded Texts Found:
1. Key: transactions.pending_alert.transaction_pending_confirmation
   Text: "This transaction is pending confirmation."
   Status: detected
   Line: ui/tx/TxPendingAlert.tsx:11

2. Key: transactions.socket_alert.error_fetching_transaction_info
   Text: "An error has occurred while fetching transaction info. Please click here to update."
   Status: detected
   Line: ui/tx/TxSocketAlert.tsx:15

3. Key: transactions.info.transaction_hash_hint
   Text: "Unique character string (TxID) assigned to every verified transaction"
   Status: detected
   Line: ui/tx/details/TxInfo.tsx:183

4. Key: transactions.info.transaction_status_hint
   Text: "Current transaction state: Success, Failed (Error), or Pending (In Process)"
   Status: detected
   Line: ui/tx/details/TxInfo.tsx:210

5. Key: transactions.info.from_address_hint
   Text: "Address (external or contract) sending the transaction"
   Status: detected
   Line: ui/tx/details/TxInfo.tsx:330

6. Key: transactions.info.to_address_hint
   Text: "Address (external or contract) receiving the transaction"
   Status: detected
   Line: ui/tx/details/TxInfo.tsx:342

7. Key: transactions.info.timestamp_hint
   Text: "Date & time of transaction inclusion, including length of time for confirmation"
   Status: detected
   Line: ui/tx/details/TxInfo.tsx:395

8. Key: transactions.info.value_hint
   Text: "Value sent in the native token (and USD) if applicable"
   Status: detected
   Line: ui/tx/details/TxInfo.tsx:501

9. Key: transactions.info.batch_index_hint
   Text: "Batch index for this transaction"
   Status: detected
   Line: ui/tx/details/TxInfo.tsx:267

10. Key: transactions.info.tx_fee_distribution_info
    Text: "Base Fee refers to the network Base Fee at the time of the block, while Max Fee & Max Priority Fee refer to the max amount a user is willing to pay {validator} fee distribution info"
    Status: detected
    Line: ui/tx/details/TxInfo.tsx:563

11. Key: transactions.info.l1_data_fee_hint
    Text: "L1 Data Fee which is used to cover the L1 'security' cost from the batch submission mechanism. In combination with L2 execution fee, L1 fee makes the total amount of fees that a transaction pays."
    Status: detected
    Line: ui/tx/details/TxInfo.tsx:616

12. Key: transactions.info.l1_fee_scalar_hint
    Text: "A Dynamic overhead (fee scalar) premium, which serves as a buffer in case L1 prices rapidly increase."
    Status: detected
    Line: ui/tx/details/TxInfo.tsx:634

13. Key: transactions.info.blob_gas_amount_hint
    Text: "Amount of {currency} used for blobs in this transaction"
    Status: detected
    Line: ui/tx/details/TxInfo.tsx:739

14. Key: transactions.info.raw_input_hint
    Text: "Binary data included with the transaction. See logs tab for additional info"
    Status: detected
    Line: ui/tx/details/TxInfo.tsx:783

## Dependencies:

## Created Keys:
- transactions.pending_alert.transaction_pending_confirmation
- transactions.socket_alert.error_fetching_transaction_info
- transactions.info.transaction_hash_hint
- transactions.info.transaction_status_hint
- transactions.info.from_address_hint
- transactions.info.to_address_hint
- transactions.info.timestamp_hint
- transactions.info.value_hint
- transactions.info.batch_index_hint
- transactions.info.tx_fee_distribution_info
- transactions.info.l1_data_fee_hint
- transactions.info.l1_fee_scalar_hint
- transactions.info.blob_gas_amount_hint
- transactions.info.raw_input_hint

## Status Code:
- detected: 1
- processing: 2
- completed: 3
- verified: 4
- finalized: 5