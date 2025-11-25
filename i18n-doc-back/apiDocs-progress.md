# ApiDocs Module Internationalization Progress

## Module: ApiDocs
- Module Path: ui/apiDocs/**
- Status: processing
- Progress: 0/4

## Hardcoded Texts Found:
1. Key: api_docs.eth_rpc.description
   Text: "In addition to the custom RPC endpoints documented here, the Blockscout ETH RPC API supports 3 methods in the exact format specified for Ethereum nodes, see the Ethereum JSON-RPC Specification for more details."
   Status: detected
   Line: ui/apiDocs/EthRpcApi.tsx:10

2. Key: api_docs.eth_rpc.view_examples
   Text: "View examples"
   Status: detected
   Line: ui/apiDocs/EthRpcApi.tsx:14

3. Key: api_docs.rpc.description
   Text: "This API is provided for developers transitioning applications from Etherscan to BlockScout and applications requiring general API and data support. It supports GET and POST requests."
   Status: detected
   Line: ui/apiDocs/RpcApi.tsx:10

4. Key: api_docs.rpc.view_modules
   Text: "View modules"
   Status: detected
   Line: ui/apiDocs/RpcApi.tsx:13

## Dependencies:

## Created Keys:
- api_docs.eth_rpc.description
- api_docs.eth_rpc.view_examples
- api_docs.rpc.description
- api_docs.rpc.view_modules

## Status Code:
- detected: 1
- processing: 2
- completed: 3
- verified: 4
- finalized: 5