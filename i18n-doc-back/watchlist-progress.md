# Watchlist Module Internationalization Progress

## Module: Watchlist
- Module Path: ui/watchlist/**
- Status: completed
- Progress: 0/13

## Hardcoded Texts Found:
1. Key: watchlist.address_modal.email_notification_text
   Text: "An email notification can be sent to you when an address on your watch list sends or receives any transactions."
   Status: detected
   Line: ui/watchlist/AddressModal/AddressModal.tsx:29

2. Key: watchlist.address_form.select_notification_types
   Text: "Please select what types of notifications you will receive"
   Status: detected
   Line: ui/watchlist/AddressModal/AddressForm.tsx:130

3. Key: watchlist.address_form.notification_methods
   Text: "Notification methods"
   Status: detected
   Line: ui/watchlist/AddressModal/AddressForm.tsx:138

4. Key: watchlist.address_form_notifications.erc_20
   Text: "${tokenStandardName}-20"
   Status: detected
   Line: ui/watchlist/AddressModal/AddressFormNotifications.tsx:15

5. Key: watchlist.address_form_notifications.erc_721_1155_nft
   Text: "${tokenStandardName}-721, ${tokenStandardName}-1155 (NFT)"
   Status: detected
   Line: ui/watchlist/AddressModal/AddressFormNotifications.tsx:16

6. Key: watchlist.address_form_notifications.erc_404
   Text: "${tokenStandardName}-404"
   Status: detected
   Line: ui/watchlist/AddressModal/AddressFormNotifications.tsx:17

7. Key: watchlist.watch_list_item.private_tag
   Text: "Private tag"
   Status: detected
   Line: ui/watchlist/WatchlistTable/WatchListItem.tsx:81

8. Key: watchlist.watch_list_item.email_notification
   Text: "Email notification"
   Status: detected
   Line: ui/watchlist/WatchlistTable/WatchListItem.tsx:91

9. Key: watchlist.watch_list_address_item.balance
   Text: " balance: "
   Status: detected
   Line: ui/watchlist/WatchlistTable/WatchListAddressItem.tsx:45

10. Key: watchlist.watch_list_address_item.tokens
    Text: "Tokens:"
    Status: detected
    Line: ui/watchlist/WatchlistTable/WatchListAddressItem.tsx:62

11. Key: watchlist.watch_list_address_item.net_worth
    Text: "Net worth:"
    Status: detected
    Line: ui/watchlist/WatchlistTable/WatchListAddressItem.tsx:72

12. Key: watchlist.delete_address_modal.address_will_be_deleted
    Text: "Address {address} will be deleted"
    Status: detected
    Line: ui/watchlist/DeleteAddressModal.tsx:35

13. Key: watchlist.watchlist_email_alert.receive_notifications_text
    Text: "To receive notifications you need to add an email to your profile."
    Status: detected
    Line: ui/watchlist/WatchlistEmailAlert.tsx:20

## Dependencies:

## Created Keys:
- watchlist.address_modal.email_notification_text
- watchlist.address_form.select_notification_types
- watchlist.address_form.notification_methods
- watchlist.address_form_notifications.erc_20
- watchlist.address_form_notifications.erc_721_1155_nft
- watchlist.address_form_notifications.erc_404
- watchlist.watch_list_item.private_tag
- watchlist.watch_list_item.email_notification
- watchlist.watch_list_address_item.balance
- watchlist.watch_list_address_item.tokens
- watchlist.watch_list_address_item.net_worth
- watchlist.delete_address_modal.address_will_be_deleted
- watchlist.watchlist_email_alert.receive_notifications_text

## Status Code:
- detected: 1
- processing: 2
- completed: 3
- verified: 4
- finalized: 5