---
layout: article
title: A Pseudo-Proof of Work Algorithm for Gopherchain
published: false
---

## A pseudo-proof of work algorithm for Gopherchain
<a href="https://twitter.com/intent/tweet?screen_name=ViolarisGeorge&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-related="ViolarisGeorge" data-show-count="false">Tweet to @ViolarisGeorge</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

On Tue, 17 Oct 2017 17:40 +0300
george <violarisgeorge@gmail.com> wrote:

> Edit (On Tue 17 Oct 2017 20:03 +0300): I have changed the below proof of work algorithm function, it is now included in the nextBlock() function as the new block and proof of work should happen at the same time, no need for additional method calls. The new code is:
<script src="https://gist.github.com/violarisgeorge/5eb26a6ec028798b5ad43c9a9edad6ac.js"></script>


I've appended the Go code for Gopherchain to include a pseudo-proof of work algorithm. You can see the following gist to understand more or less what it's doing:

<script src="https://gist.github.com/violarisgeorge/c7ef60b8b40977e9a41efd4b84d1c536.js"></script>

We're taking as an input the new block that is to be mined. We take the hash of the previous block and replace the first five bytes with 0s. Then, we hash a random string, append it with a nonce and check if the hash has 5 leading zeroes. If it doesn't we increment and hash the previous hash and check again. 

This loop is performed until we reach the target. When the target is reached (i.e. found a hash with 5 leading 0s), we consider the block to be mined and announce it ("Found!") to the network. Remember that this is just a simulation and once we need to convert our code for real use, the target check should change to evaluate each hash if it is less than or equal to the target. If it is less than the target, the other nodes will be satisfied (will be able to trivially validate) that the computing work has been done on the block. This is actually done by the nodes, but miners should also self-validate the proof they found before announcing to the network.

We also modify our main function loop to take into consideration that a new block should not be added to the blockchain unless proof has been found.

<script src="https://gist.github.com/violarisgeorge/968322b7c3bd2ecfd068e08b4b4751db.js"></script>

As mentioned above, we would normally check if the target requirements were met. For now, we'll just check if the doWork() function has announced if anything was found.


> [Comments](https://github.com/violarisgeorge/violarisgeorge.github.io/issues/2)
