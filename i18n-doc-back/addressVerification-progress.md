# AddressVerification Module Internationalization Progress

## Module: AddressVerification
- Module Path: ui/addressVerification/**
- Status: completed
- Progress: 10/10

## Hardcoded Texts Found:
1. Key: address_verification.common.specified_address_does_not_exist_or_is_eoa
   Text: "Specified address either does not exist or is EOA."
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepAddress.tsx:82

2. Key: address_verification.common.ownership_already_verified_by_this_account
   Text: "Ownership of this contract address is already verified by this account."
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepAddress.tsx:85

3. Key: address_verification.common.ownership_already_verified_by_another_account
   Text: "Ownership of this contract address is already verified by another account."
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepAddress.tsx:88

4. Key: address_verification.common.please_follow_these_steps_to_verify
   Text: "The contract source code you entered is not yet verified. Please follow these steps to "
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepAddress.tsx:94

5. Key: address_verification.common.enter_contract_address_description
   Text: "Enter the contract address you are verifying ownership for."
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepAddress.tsx:112

6. Key: address_verification.common.signature_could_not_be_processed
   Text: "The signature could not be processed."
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepSignature.tsx:162

7. Key: address_verification.common.verification_message_expired
   Text: "This verification message has expired. Add the contract address to restart the process."
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepSignature.tsx:165

8. Key: address_verification.common.not_creator_owner_of_contract
   Text: "This address is not a creator/owner of the requested contract and cannot claim ownership. Only can verify ownership of this contract."
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepSignature.tsx:175-179

9. Key: address_verification.common.unable_to_process_verification
   Text: "We are not able to process the verify account ownership for this contract address. Kindly for further assistance."
   Status: detected
   Line: ui/addressVerification/steps/AddressVerificationStepSignature.tsx:186-188

10. Key: address_verification.common.sign_via_web3_wallet
    Text: "Sign via Web3 wallet"
    Status: detected
    Line: ui/addressVerification/steps/AddressVerificationStepSignature.tsx:250

11. Key: address_verification.common.sign_manually
    Text: "Sign manually"
    Status: detected
    Line: ui/addressVerification/steps/AddressVerificationStepSignature.tsx:251

## Dependencies:

## Created Keys:
- address_verification.common.specified_address_does_not_exist_or_is_eoa
- address_verification.common.ownership_already_verified_by_this_account
- address_verification.common.ownership_already_verified_by_another_account
- address_verification.common.please_follow_these_steps_to_verify
- address_verification.common.enter_contract_address_description
- address_verification.common.signature_could_not_be_processed
- address_verification.common.verification_message_expired
- address_verification.common.not_creator_owner_of_contract
- address_verification.common.unable_to_process_verification
- address_verification.common.sign_via_web3_wallet
- address_verification.common.sign_manually

## Status Code:
- detected: 1
- processing: 2
- completed: 3
- verified: 4
- finalized: 5