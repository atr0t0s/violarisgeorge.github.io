---
layout: article
title: Concepts of Information Security
published: false
---

## Concepts of Information Security

<a href="https://twitter.com/intent/tweet?screen_name=ViolarisGeorge&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-related="ViolarisGeorge" data-show-count="false">Tweet to @ViolarisGeorge</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

On Wed, 21 Mar 2018 22:20 +0300
george <violarisgeorge@gmail.com> wrote:

When first learning about information security, most people begin with thinking how to keep an atacker out of their systems. Be it firewalls, router configurations, Intrusion Detection and Intrusion Prevention systems, there is a plethora of hardware and software, both open-source and commercial, which allow system engineers to defend against attacks. Many times such systems are deployed in companies after an attack. Most times though, even though they are there from the beginning, they repeatedly fail to thwart attacks, putting organizations and individuals in danger of stolen or corrupt data, and fraud. However, a change in mindset and allowing ourselves to think like blackhat hackers, may allow us to create better infrastructure and network deployments, tweak our system configurations to close off known vulnerabilities, and overall give us a sense of what someone looking to harm our environment may try or do.

It is best to start by knowing a few things that create good security practices. A good starting point is learning about the CIA triad (Confidentiality, Integrity and Availability) and how these aspects make or break the security of a network or system. 

### Confidentiality
A secure system is a private system whose contents and processes are not reachable by the wrong people. Only authorized persons should be able to access file systems and services. This extends to both remote access through a network, physical access, or access to authorized persons. Even through physical access, nobody should be able to view confidential data or use the system's services without authorization (i.e. credentials - these could be username and password, a private key, biometric data - generally anything that the authorized person has). In many cases of systems that were considered very secure, confidentiality has been breached by gaining access to a person who has authorization. This can be achieved by blackmailing, extortion, social engineering (for example the perpetrator tricks the victim into directly providing their credentials or indirectly providing details that can result to finding the credentials), or phishing attacks (the perpetrator tricks the victim into inputing their credentials, unbeknownst to them that they will be stored in the perpetrator's database).

### Integrity
When speaking of integrity, we mainly mean data integrity. Data should not be modified by unauthorized persons. Even if someone manages to modify the data without authentication, modifications must be tracked and detected. If an organization suffers a breach but does not lose any data, they should have ways of detecting if their data has been modified without authorization. There are ways to alter data that are difficult to detect. For instance modifying images while keeping the same size, create and modify timestamps and EXIF data. 

### Availability
The purpose of any system is to be available to do its job, be it serving files or web pages or simply running print jobs. There are different methods that attackers may use to overwhelm a system's or network's resources, including network bandwidth overconsumption, high CPU usage, memory exchaustion, etc.

Depending on what kind of havoc a blackhat hacker wishes to achieve, they will either try to access private data, view or modify said data, or cause  extended downtime to a system, without authorisation. The methods used to achieve these, boil down to exploitation of a vulnerability to deliver and execute a harmful payload to a system.

### What is a vulnerability?
It is helpful to think of a vulnerability as an undocumented [API](https://en.wikipedia.org/wiki/Application_programming_interface). In essence, that is exactly what a vulnerability is. A non-intended API will give a hacker the same aspects that a programmer receives when using an intended API. It will allow the hacker to access system methods, protocols, routines, and so on, and allow them to make calls to functionality that should be exposed only internally to the system's processes. A very simplistic example of a vulnerability could be a paddlock that opens with more than one key due to a design fault. In computer security terms, the simplest vulnerability would be to have a system with hard-coded default login credentials. 

### What is a threat?
A threat is any event which can cause undesired outcomes. Anything from natural disaster to disgruntled or uninformed employees can be considered a threat. A hacker with intent to steal information from your file server is a threat to data integrity. A guest user in our network with malware on their laptop is a threat to availability. A stolen employee laptop is a threat to confidentiality. 

### What is an exploit?
An exploit is a mechanism which takes advantage of a vulnerability to materialize a threat. Through exploitation of a vulnerability, the perpatrator deploys and executes a payload on the vulnerable target. A great example of an exploit is the recent (2017) exploit of Windows SMBv1 protocol. The SMB protocol allows transactions between client and server. When the message request is greater than the MaxBufferSize of SMB, the remaining message is sent via a secondary request. The srv2.sys kernel driver is triggered by malformed messages in the secondary requests. This allows for arbitrary code execution and allows the attacker to connect to the IPC$ hidden share which is exposed by the Windows "Server" service. In this example, the vulnerability is due to the kernel driver allowing arbitrary code execution. The vulnerability is exploited through the SMB protocol's secondary requests of messages that exceed the buffer size and allows the attacker to connect to a remote share on the Windows system.

### What is a payload?
The payload is malicious code that is deployed and executed on a system through the exploitation method. Once the payload is deployed it can do all sorts of damage, such as delete and copy files to a remote location, download and execute malware from the internet or even add users and change user passwords in the system. Following from the example above, the most usual payload in the SMBv1 vulnerability exploit would be a windows powershel script to download software from a remote server, and once executed it would encrypt all the user's files. This type of malware is known as _ransomware_.

This was a brief introduction into the most basic terminology and aspects used in vulnerability assessments and penetration testing by information security professionals. Take a look in my resources page to find helpful links which expand on these concepts in more detail and go some steps futher into more technical and hands on approaches.

[Comments](Concepts of Information Security)
