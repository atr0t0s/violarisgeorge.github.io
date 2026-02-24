---
layout: article
title: Pizza for Lightning Bitcoins
published: false
---

## [Lightning-dev] Pizza for (lightning) bitcoins?

Laszlo Hanyecz [laszlo at heliacal.net](mailto:lightning-dev@lists.linuxfoundation.org)
Sun Feb 25 01:29:59 UTC 2018

- Original message: [[Lightning-dev] Pizza for (lightning) bitcoins](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/001044.html)

- Previous message: [[Lightning-dev] [c-lightning] Welcoming a New C-lightning Core Team Member!](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/001056.html)

- Next message: [[Lightning-dev] Pizza for (lightning) bitcoins?](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/001045.html)

- Messages sorted by: [[ date ]](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/date.html#1044) [[ thread ]](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/thread.html#1044) [[ subject ]](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/subject.html#1044) [[ author ]](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/author.html#1044)

I wanted to try out a real trade using lightning network.  I don't know of any pizza places near me that accept lightning bitcoin yet but a friend from London agreed to do it and he sub contracted out the pizza delivery to a local shop.
In short, I paid bitcoin using the lightning network and he arranged for pizza to be delivered to me.  In this trade my friend is just a middle man that is taking the risk on accepting lightning payments, but it demonstrates the basic premise of how this works for everyday transactions.  It could just as well be the pizza shop accepting the payment directly with their own lightning node.
I wanted two pizzas and to try to do it as close to atomically as possible.  I didn't want to prepay and end up with no pizza.  As far as I know we don't yet have pizza/bitcoin atomic swap software but we improvised and decided that I would need to provide the payment hash preimage to the delivery driver in order to claim my pizza.  If I can't produce the preimage, proving that I paid, then the pizza would not be handed over and it would be destroyed.  This works because I can't get the preimage without paying the invoice.  I agreed to open a channel and fund it with a sufficient amount for what we estimated the cost would end up being.  After we agreed to these terms my friend was able to verify that I funded a channel on the blockchain, which shows that I at least have the money (bitcoin).  He is taking on some entrepreneurial risk and prepaying his sub contractor to prepare and deliver the pizza to me, but at this point I have not risked my bitcoins, they're just committed to a channel.  I was given a bolt11 invoice which I decoded with the c-lightning cli to verify everything was as agreed:

$ ./lightning-cli decodepay lnbc6490u1pdfrjhcpp5jyxuuskqw53apg[....]zfcyy77cq37ee56ktcqa3vcys
{ "currency" : "bc", "timestamp" : 1519504120, "created_at" : 1519504120, "expiry" : 72000, "payee" : "0397b318c5e0d09b16e6229ec50744c8a7a8452b2d7c6d9855c826ff14b8fa8b27", "msatoshi" : 649000000, "description" : "1XL Cheesy Pizza, 1 Deluxe Pizza", "min_final_cltv_expiry" : 8, "payment_hash" : "910dce42c07523d0a00c59bbecef03151907806a81a5d2199e94bcf90a73f96b", "signature" : "3045022100ef331f195e206219d703d3b81[...]4729a0e69ab2f" }

When the pizza delivery arrived, I was asked "What is the preimage?" by the driver.  At this point I paid the invoice and instantly received the preimage in return.

$ ./lightning-cli pay lnbc6490u1pdfrjhcpp5jyxuuskqw53apgqvtxa7[...]vfqg3jkcatcv5s93vcys
{ "preimage" : "7241e3f185148625894b8887ad459babd26540fc12124c3a7a96c937d89da8c1", "tries" : 1 }

In the interest of keeping it simple we agreed that the preimage would just be the first and last 4 characters of the hex string.  So my answer was 7241-a8c1.  I wrote this on a notepad and presented it to the driver who compared it to his own notepad, at which point I was given the pizza.  It's probably not a good practice to share the preimage.  The delivery driver didn't have the full string, only enough to verify that I had it.
How do you get the preimage for your invoice?  In c-lightning you can do it like this:
$ ./lightning-cli invoice 12345 label description
{ "payment_hash" : "e04dfbd4adc634779b560c8e7072f883d5f17a3e32a33603bfc90a8682873d44", "expiry_time" : 1519523498, "expires_at" : 1519523498, "bolt11" : "lnbc123450p1pdfyzy[...]e3mxq9pp7pqm0pwcwm748tav4am97gqrvnzxnlw5uxxawgw4vcywgphj26nf" }
$ sqlite3 ~/.lightning/lightningd.sqlite3 "SELECT quote(payment_key) FROM invoices ORDER BY id DESC LIMIT 1"
X'D3BE7E68D8B38B15A5194AEA131A21429A1987085C95A0631273273546FF5ED8'
Then you can verify that it's indeed the correct preimage by hashing it again and comparing it to the payment_hash in the invoice above:
$ echo "D3BE7E68D8B38B15A5194AEA131A21429A1987085C95A0631273273546FF5ED8" | xxd -r -p | sha256sum
e04dfbd4adc634779b560c8e7072f883d5f17a3e32a33603bfc90a8682873d44  -
Note that you should not share the preimage with anyone.

So is there any point to doing this instead of an on chain transaction?  For what I described here, probably not.  The goal was just to play around with c-lightning and do something more than shuffling a few satoshi back and forth.  Maybe eventually pizza shops will have their own lightning nodes and I can open channels to them directly.

Some pics of my family enjoying the pizza here: http://eclipse.heliacal.net/~solar/bitcoin/lightning-pizza/

-Laszlo

-------------- next part --------------
An HTML attachment was scrubbed...
URL: <http://lists.linuxfoundation.org/pipermail/lightning-dev/attachments/20180225/313737f3/attachment-0001.html>

- Previous message: [[Lightning-dev] [c-lightning] Welcoming a New C-lightning Core Team Member!](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/001056.html)

- Next message: [[Lightning-dev] Pizza for (lightning) bitcoins?](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/001045.html)

- Messages sorted by: [[ date ]](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/date.html#1044) [[ thread ]](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/thread.html#1044) [[ subject ]](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/subject.html#1044) [[ author ]](https://lists.linuxfoundation.org/pipermail/lightning-dev/2018-February/author.html#1044)

[More information about the Lightning-dev mailing list](https://lists.linuxfoundation.org/mailman/listinfo/lightning-dev)
