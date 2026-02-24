---
layout: article
title: Better PoW for Gopherchain
published: false
---

## Better PoW for Gopherchain
<a href="https://twitter.com/intent/tweet?screen_name=ViolarisGeorge&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-related="ViolarisGeorge" data-show-count="false">Tweet to @ViolarisGeorge</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

On Sun, 5 Nov 2017 00:43 +0300
george <violarisgeorge@gmail.com> wrote:

So when I initially started writing Gopherchain, I was mostly experimenting in order to better learn myself how to implement simple blockchain data structures in Go. My aim wasn't only to create an experimental blockchain framework for myself in order to better my knowledge, but also to allow anyone to copy my code and create their own. What's different about this implementation rather than the hundreds of others out there, is that it focuses on the block chain data structure, (i.e. how the blocks are linked to one another via their hashes), and proof of work. By creating a simple proof of work I was able to understand how a miner increments a nonce within a hash function until the result is smaller than a given target. This target is essential to defining the difficulty. Depending on the amount of hash power within the network, the difficulty will change. More hash power => higher difficulty. This is done to prevent someone from overpowering the network and allowing them to double-spend by verifying their own transactions. 

In the process, I've changed my proof-of-work function quite a few times. In its current form, I am using a constant target. I'm doing this in order to create a simulation of block generation without having to worry about recalculating the difficulty. Therefore, our simulation will represent only a small time-frame of the block generation process at a certain difficulty. Moreover, I've set the difficulty to be relatively easy for a modern Core-i5 CPU to generate blocks in order to be able to study the behaviour of the generation sequence better.

<script src="https://gist.github.com/violarisgeorge/5c6938f325d02e2559cd6797e0ce0c9d.js"></script>

Later on, I will create a difficulty retargeting function which will change the difficulty dynamically depending on the network hash-rate. Additionally I will introduce a transactions structure. This will allow us to include a transactions splice in our Blocks struct in order to include the transactions with their merkle signatures and the transactions' merkle root for the block.

Hit me on Twitter or on my email for any questions or suggestions. Also, leave a comment below to start a public discussion.


> [Comments](https://github.com/violarisgeorge/violarisgeorge.github.io/issues/3)
