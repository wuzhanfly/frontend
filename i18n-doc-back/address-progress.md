# Address Module Internationalization Progress

## Module: Address
- Module Path: ui/address/**
- Status: processing
- Progress: 0/7

## Hardcoded Texts Found:
1. Key: address.contract.verification_source.verified_using
   Text: "This contract has been { data.is_partially_verified ? 'partially ' : '' }verified using"
   Status: detected
   Line: ui/address/contract/alerts/ContractDetailsAlertVerificationSource.tsx:15

2. Key: address.contract.verification_source.verified_via_sourcify
   Text: "This contract has been { data.is_partially_verified ? 'partially ' : '' }verified via Sourcify."
   Status: detected
   Line: ui/address/contract/alerts/ContractDetailsAlertVerificationSource.tsx:23

3. Key: address.contract_details.current_address
   Text: "Current address"
   Status: detected
   Line: ui/address/contract/ContractDetails.tsx:42

4. Key: address.contract_details.current_contract
   Text: "Current contract"
   Status: detected
   Line: ui/address/contract/ContractDetails.tsx:42

5. Key: address.contract_methods.delegate_address
   Text: "Delegate address"
   Status: detected
   Line: ui/address/contract/methods/ContractMethodsProxy.tsx:58

6. Key: address.contract_methods.implementation_address
   Text: "Implementation address"
   Status: detected
   Line: ui/address/contract/methods/ContractMethodsProxy.tsx:58

7. Key: address.details.at_txn
   Text: " at txn "
   Status: detected
   Line: ui/address/AddressDetails.tsx:164

## Dependencies:

## Created Keys:
- address.contract.verification_source.verified_using
- address.contract.verification_source.verified_via_sourcify
- address.contract_details.current_address
- address.contract_details.current_contract
- address.contract_methods.delegate_address
- address.contract_methods.implementation_address
- address.details.at_txn

## Status Code:
- detected: 1
- processing: 2
- completed: 3
- verified: 4
- finalized: 5