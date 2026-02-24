---
layout: article
title: Network Management Overview
published: false
---

## Network Management Overview

[Tweet to @ViolarisGeorge](https://twitter.com/intent/tweet?screen_name=ViolarisGeorge&ref_src=twsrc%5Etfw)

On Fri, 10 Feb 2012 21:23 +0300 george violarisgeorge@gmail.com wrote:

**Abstract** — Network management has long been a primary need in determining and resolving network problems and retrieving analytics. However, not only the task itself but also the protocols and tools that entail the network management process, are still accompanied by some problems, with breakthroughs and improvements happening every day. The most important network management aspects that are addressed are the security, performance and reliability of the management tools that are used to apply network management.

**Index Terms** — Network Management, SNMP, Network Monitoring Tools.

### I.     INTRODUCTION

NETWORK Management is everything that concerns the tools, methods and protocols which are involved in the administration of devices and computing systems which reside within networked environments. In essence, network management is performed by system and network administrators by using special tools that communicate with the different systems by using special protocols, such as SNMP.  Not only do they provide reporting mechanisms to know the different metrics used in network management, they also allow administrators to change configurations and settings and review relations and permissions.

To achieve efficient network management is not an easy task. There is a wide variety of hardware and software which are involved in achieving complete management over a network; however most times, such as in extremely complex networks, it is nearly impossible to manage all interfaces across a topology and receive reports concerning every single device bearing a network interface card.

Apart from being difficult to manage complex networks, or even for that matter reduce the complexity due to improving network management, often computers do not agree with each other on network statistics for a variety of reasons such as independent latency within a system which does not have any coefficients over the network, but in reality it affects the ability of a system to detect and report over actual latencies and delays in response times.

To alleviate many of the aforementioned problems, many methods, procedures and protocols have been crafted over the years in order to make the lives of network administrators and network engineers much easier.  For instance, the most prevalent protocol that received the most widespread acceptance and support by most networked devices is Simple Network Management Protocol.

To actually perform Network Management, the simplest solution is to make use of System and Network Management and Monitoring software, such as Cacti, Zenoss and Spiceworks. It would be highly inefficient and probably impossible to manage a complex enterprise or academic network without making use of such utilities.

### II.     Network Management Problems

As with most fields in computer networking, certain important problems are faced when deploying any of the network management solutions. Many times, when these obstacles are not fully overcome or dealt with one way or another, managing a network will become a bothersome task, taking up the administrators’ time with trying to fix their management setup, instead of simply using it to fix other more important issues.

The most important and most difficult to correct of such problems, are security, performance and reliability.

#### A.     Security

System and network administrators know this the hard way. The security of their network is the most crucial part, as exploited holes in a network can many times bring an entire organization to its knees. Furthermore, it is a resemblance of how capable an administrator is in securing and patching up these holes.

Often, the network itself is seemingly impenetrable. Many hours go in securing the individual systems and devices that make up the network such as routers, switches and access points [1]. However, it has been possible numerous times in the past for attackers to gain access to a network by taking advantage of insecure Network Management systems.

#### B.     Performance

When a network gets too large, i.e. great number of nodes, too complex, or a combination of both, the performance of not only the network but also of the Network Management procedure, tasks and tools is greatly degraded. In a managed network environment, what usually happens is that multiple nodes report to the Network Management node, where the database and tools that receive the reports from other networked devices reside. If the network is large and complex, reports will arrive later, and latencies over the network will build up when reporting needs collaboration between servers and different environments in order to occur [2].

Moreover, not only will there be networking delays in regards to the reporting responses from node to Network Management server, additional personnel and working time is needed to read, interpret and take action upon the interpretation of the results.

#### C.     Reliability

Network Management setups are not as of yet reliable enough to detect reliability issues and report when results from devices seem to be inaccurate, plain wrong or even tampered with. In fact, reliability is also a crucial part of Security, since potential attackers may try to send reports to the Network Management platform which present the network as running normally without unauthorized access occurring.

Not only is it important to ensure that all information received by the monitoring station is integral, it is also of importance to mention uptime reliability. If there seems to be a problem somewhere in the network, the monitoring station is the first tool an administrator will be using to detect and isolate the issue. If the monitoring station is not reliable, i.e., it faces downtime or is inaccessible due to any number of reasons, usually means a greater network management problem than any other network issue that might be occurring, as correcting underlying problems relies heavily on a sound management infrastructure. [Read more…]

### III.     Simple Network Management Protocol

The Simple Network Management Protocol is actually, in terms of computer networking, a very old protocol. It has its roots in the Simple Gateway Monitoring Protocol [3], which SNMP is backwards compatible with. The protocol’s definition dates back to 1988, and work started even earlier. This shows us, that even from the very early stages of networking, even before the World Wide Web became available, managing a network of computer systems was already considered important enough to develop an efficient protocol to specify how Network Management should be done.

#### Architecture

The SNMP, defines that network elements, such as gateways, routers, switches, servers and other networking devices, can be monitored if they have management agents running, which are able to transmit data in a format predefined by the protocol. Management agents are typically software which run on these machines. Many times, the agents are running on embedded systems such as routers and other network devices, and these require the agents to be in the form of firmware; software embedded on a computer chip, running directly on the hardware [5].

The goal of the Simple Network Management Protocol is to minimize the complexity of the management procedure. This means that it is much cheaper for agent developers to develop the software that makes the different parts of the network interchange management information. Also, when complexity is avoided, developers of network management software can develop their applications easier, thus making them more efficient and sufficient. Furthermore, the sophistication of the management tools is highly increased.

The entities in a network receive administrative relationships, which define what rights an entity has over the other. For instance, the server on which the network management software resides usually has administrative rights over most of the devices on the network which support SNMP [6].

### IV.     Network Management Software

The entirety of the Simple Network Management Protocol is concentrated, for the scope of operation of network administration and management, upon a single or multiple network monitoring and management software. Many times a single software will support most or even all of the functions described in SNMP. This gives the advantage to the network administrators to have their management consoles concentrated on a single point, thus reducing complexity and delay in administering and resolving problems, or even retrieving statistics for use by analysts.

The most reputable of management and monitoring tools are, namely, Spiceworks [8], Cacti, AggreGate Network Manager, Nimsoft Monitoring Solution, Solarwinds, Zabbix and Zenos.

All, even ones not listed hereby, have their strengths and weaknesses; however, most times administrators restrain from using multiple tools in the same network configuration. This is due to a rise in complexity being presented when two or more monitoring solutions are used to administer a network, and many times administrative roles overlap or present conflicts which are undesirable.

The most useful application in such monitoring tools is the capability to provide reports by using graphing systems.

In addition, a combination of hardware with the above mentioned software is required to have a complete Network Management System (NMS). For example, for a monitoring tool such as Spiceworks to present the traffic over all border links, i.e., WAN links to the network, a representation of these links is required to be available to Spiceworks from hardware such as servers, routers and switches.

Moreover, a Network Management System’s job is not only to make reports on traffic, CPU loads and system state; most NMS provide services such as Network Inventory, Hardware Management, Protocol Analyzers, Network Scanning Tools and Wireless Tools. Each of these tools are decisive in the administration of hardware, configuration of network rules and policies, and management of routing, port forwarding and firewalling within a wired or wireless network.

Furthermore, tools such as Bandwidth Monitors, Activity Monitors and Configuration Managers, ensure that the hardware, software, web traffic to each entity in the network and LDAP applications are monitored since the wellbeing of each of these  safeguards the certainty and longevity of a network’s uptime.

The last part in NMS, and available in most commercial systems, is the ability to receive support tickets from users, concerning problems they experience with network connectivity and report data transfer issues. This part is also very important as it is an additional measure for network administrators, allowing them to know about an issue that was not perceived by the NMS.

### V.     Solving Problems
#### A.     Security

Securing a network is not a task which is completed once and forgotten about, it is a day to day job. There are a number of different services and appliances which are considered crucial in a network and its users. For example, antispam, antivirus and firewall appliances and software are connected to mail and file sharing servers to manage and monitor the potential threats that the network faces.

Not only do these appliances manage the potential threats, they are also able to place viruses and suspected spam messages into quarantine. Upon this, users and network administrators are notified and are requested to suggest or take available actions, such as release, keep in quarantine, or delete the infected, malicious or spam messages.

The most important aspect of this procedure, is the capability to monitor the volume and source of the attempted attacks, in order to minimize the threat potential and move towards secure solutions for the future of the establishment the network is based upon.

Network firewalls are so vital to not only the security but also to the organization of the entire network, that most consider it impossible to effectively run a network which is reliable on port forwarding, user access permissions and service awareness. Without firewalls it would not be able to monitor network services or to make use of network management tools. The SNMP protocol would not fully work as all services of a system would seem available to it and therefore it wouldn’t be able to distinguish as to what kind of data it is receiving. Moreover, applications would not be able to use forwarding rules to transmit data to its correct destination.

By making use of these antivirus, antispam and firewall technologies, many problems in the security aspect of network management are lifted. As new research is conducted and more technologies arise by many companies, not only are these software and appliances improved, new ones are also introduced.

#### B.     Performance

To overcome the problem of performance is not an easy feat. It is considered to be more than just an annoyance to the network administrators, but also a matter of getting timely updates without delays.

Having a good performance relies in having a good network setup, fast Ethernet switches, software which does not lag due to limitations or design faults, and regularly making sure that the network does not have any underlying issues which might cause a traffic overload and in turn cause the management tools to malfunction.

Basically, good performance is based on good design and good engineering, both in hardware and software network entities. Thus, it is a task which demands monitoring the network in ways other than using only Network Management Systems, to ensure that the NMS will keep working at maximum capacity and provide trustworthy reports.

#### C.     Reliability

Reliability is needed in network management and the different tools that accompany the process, in order for network administrators to trust the data they are receiving and thus be able to make reliable decisions concerning reports on possible problems, potential threats and network statistics.

To make Network Management Systems more reliable, is both a job  for the monitoring tools to filter out unwanted or malformed data and for the network administrator to be competent enough to interpret the data that makes it through and understand if it is trustworthy.

It is undeniable that the reputation of a NMS amongst the community is a good factor in judging whether the system can be reliable or not. However, even with the best monitoring tools, software agents and hardware, it should be stressed that what makes a NMS more stable and reliable is how professionally and carefully a system was initially set up, how well it is maintained through time to fix issues that occur, and keeping its different entities up to date with each other so conflicts and misplacement of data does not occur.

#### VI.     Discussion

Network Management Systems are composed of many different parts, or network entities, that all contribute in providing a Network Management tool with reliable data, in a secure manner and with good performance, in order for the tool to prepare reports, warn about problems and threats and allow certain network and protocol configurations to be carried out.

From as early as the late 1980’s, researchers and the industry have been working on protocols that would allow network administrators to effectively manage small and large networks. The Simple Network Management Protocol has answered most of the issues arising in managing a network, providing an interface between network entities such as routers, switches and servers to interchange data and report to a central management station.

As with most computer networking fields, problems arise when several different technologies need to clash in order to provide a single solution. While the actual need is to manage the network, it is often a fact that these problems have to be managed as well and solutions should be suggested in order to make advancements.

The three most important problems that network administrators, network management tool developers and networking professionals face when using or developing Network Management Systems, is security, performance and reliability of the system, its processes and the entities which make them up. These three aspects are interconnected in Network Management, and as will be discussed below, one cannot exist without the other two.

There are many suggested solutions to these problems. They are all three very crucial to the wellbeing of the system in order to carry out efficient housekeeping of the entire network, and thus provide users with Quality of Service and sufficient uptime. By providing security in the network is not enough alone. Many secure networks have been breached through holes found in the Network Management System’s entities, such as for example exploitations in the Network Management tool itself. Of course, this burden lays more with the developers of these tools; however, no matter how airtight the security policies of the software are, if the other network entities which support it can be exploited through the SNMP protocol, then there is also a risk that the data received by the management tool are not reliable and have been maliciously tampered with.

Security is many times disregarded, until something happens that makes administrators and company management decide that they should increase their protection in the most major parts of the network. This is of course a mistake, as security needs to be a preventive measure and not a disaster recovery procedure that is under consideration only when the network undergoes a breach or an attempted attack. Even though, some policies are set in place  in order to prevent future threats[9]:

   - Secure file storage devices behind firewalls and set strict access permissions in the network’s file sharing or content distribution systems.
   - Separating the communications channels from the normal network or web traffic so they don’t interact at any points.
   - Encrypt communication data such as emails or file transfers.
   - Limit who and how and from where can access databases with sensitive data.

Furthermore it is a good administrative policy to block access to websites that use a lot of traffic and to websites or web services which are considered to be untrustworthy or host malicious content.

Also, performance and reliability are also part of security, as a secure system needs to be both reliable and have good performance. Likewise, a system with good performance needs to be both reliable and secure, and so on and so forth. This is why these three issues are the most important aspects to look for when overcoming problems in the development, deployment and application of Network Management Systems.

### VII.     Conclusion

Network Management is the most essential component in running a network efficiently and minimizing the problems of security, performance, reliability, administration and configuration of a live computer network.

There are many procedures and protocols that are related to Network Management, with the most important and most widely used one being the Simple Network Management Protocol. In essence, this protocol is making use of software agents running on the different networked nodes or entities to exchange and transmit data towards a central node which gathers and makes use of this information to be presented as statistics, warnings, error reports and conflict reports, mostly in the form of graphs and tables.

To overcome the problems in securing a network, it is important to first secure the Network Management Systems so they will not be affected by potential attacks on other parts of the network, and can therefore report on these attacks. Moreover, performance and reliability are equally crucial, providing the means of having trustworthy data delivered in a timely manner, ensuring that reported problems are real and can be prevented or caught on time.

### References

[1]     Ximming Ou, Sudhakar Govindavajhala, Andrew Appel. Network Security management and High-Level Security Policies. Princeton University.

[2]     Achieving Quality of Service Through Network Performance Management. S. Keshav, R. Sharma. Cornell Network Research Group

[3]     Simple Network Management Protocol. J.D. Case, M. Fedor, M.L. Schoffstall, J. Davin. August 1988

[4]     Retrieved from: http://www.cisco.com/en/US/tech/tk869/tk769/technologies_white_paper09186a00800aea9c.shtml

[5]     Delegated Agents for Network Management. Goldszmidt, G., Thomas J. Watson, Yemini, Y.

[6]     Administrative Model for version 2 of the Simple Network Management Protocol (SNMPv2). J. Galvin, K. McCloghrie

[7]     Retrieved from: http://monitor-one.lastdownload.com/monitor-one32081.jpg

[8]     SpiceWorks Inc., “SpiceWorks, IT Is Everything”, April 14, 2010. http://www.spiceworks.com/

[9]     Retrieved from: http://www.preservearticles.com/2012030224497/essay-on-network-support-and-management-in-india.html

[10]  Mobile Agents for Network Management. Bieszczad, A.  Bell Labs., Murray Hill, NJ, USA Pagurek, B. ;  White, T.

[11] Introduction to Community-based SNMPv2. J. Case, K. McCloghrie, M. Rose, S. Waldbusser. Jannuary 1996

George Violars - February 2012
