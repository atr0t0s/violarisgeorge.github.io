---
layout: article
title: Web Security and Unique User Tracking
published: false
---

## Web Security and Unique User Tracking
### Tracking Web Users via a Proxy Server with Unique Cookie Key Analysis

<a href="https://twitter.com/intent/tweet?screen_name=ViolarisGeorge&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-related="ViolarisGeorge" data-show-count="false">Tweet to @ViolarisGeorge</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

On Mon, 3 Aug 2015 15:34 +0300
george <violarisgeorge@gmail.com> wrote:

**Abstract** — Since the inception of the World Wide Web, there have always been entities wishing to track the actions, behavior and surfing habits of users, each for their own purposes. In this paper we examine the different methods by which the behavior of web users can be tracked, what this means for the privacy of users, and examine the implications that arise when mechanisms such as Tracking Cookies and server logs keep user data in centrally kept databases. Furthermore, a proposed method for efficient tracking of LAN users via tracking cookies, a web proxy and server logs analysis is modeled and studied, providing a methodology of combining known methods to provide a tool for system administration, in order to aid them with safeguarding both the actions of users but also those of commercial, educational and non-profit organizations they work for.

Keywords—cookies; internet privacy; user tracking; eavesdropping;

### I.	 INTRODUCTION
With the advances in the internet technologies being so rapid in the past two decades, users got drifted from a world wide web based on relative anonymity, to a web with vast privacy issues. Advertisers began using this new technology which is readily available to anyone with a computer and a phone line, and started tracking the online website users' movements, actions and behavior.

This kind of stalking did not initially serve to identify individuals, however several tracking mechanisms were set across different types of websites, mainly by advertisers, in some cases the government, and also groups of web security attackers who wished to serve malicious content to internet users. Usually, this type of tracking makes use of existing technologies that were normally invented for different or adjacent purposes, or a combination of these technologies to track users for legitimate and illegitimate purposes.

There are different approaches to web user tracking, either for tracking a user's behavior and actions, or to track a user for identification purposes. In the former case the tracking is usually performed by marketers, advertisers and websites wishing to serve personalized content to its users, based on their prior surfing behavior. However, personalized content usually stays within the context of a single website, or a group of websites, often known to the user. In the case of advertisers and marketers, techniques such as tracking cookies are used in order to serve personalized advertisements across a range of websites, where the website owners use a single advertising agency, or cooperating agencies in order to serve advertisements to their visitors. It is considered as a breach of the user's privacy to track what kind of advertisements they click on, as it creates a profile of the user outlining interests or ventures they wish to keep private.

Moreover, the world wide web and other similar online services were and still are used in order to serve personalized advertisements based on the type of content the users are viewing and display content, either well meaning or of malicious nature, based on their public profile keywords and interests on several social networking sites that have emerged in the past years, or simply due to the categories of sites visited and searches performed on public web search engines.

An approach which could be considered as more dangerous than the rest, as it may be used more easily for malicious purposes rather than for simply serving advertisements or personalized content, is the approach of eavesdropping. An eavesdropper can not only find out a user's interests and surfing behavior, but potentially also identify the real identity of the user, and become privy of their private conversations in instant messaging web applications, follow their banking habits and even steal their login credentials to websites of sensitive nature such as social networking websites or payment processor services. Eavesdropping usually takes the form of Man-in-the-Middle, or Man-in-the-Browser attacks, which includes the process of packet sniffing a user's transmitted data, and intercepting the communication between the user and a seemingly trusted source by pretending to be the source. In turn, the attacker retransmits the data to the source and back to the user, so it becomes highly difficult for a normal user to detect such malicious actions. However, eavesdropping may be performed legally withing a LAN, by a system administrator, in order to secure the interests and data of an organization from being transmitted to sources the organization does not wish their data to be released to.
In the remainder of this paper we will be discussing works done by others on this field, an overview of user tracking will be laid out, different approaches to user tracking will be examined, and finally a suggested model for identification of a unique user will be proposed.

### II.	RELATED WORK
Web user tracking has not been the interest subject for advertisers and scammers, but also the center of many scientific research papers, as the mechanisms which are fabricated and used for user tracking are not only of interest but also may be used for other purposed also, such as for advancing the security of users and organizations and knowing how to defend users from fraudulent attacks such as advertisements which may track their behavior in the web and emails.

Among the earliest efforts of tracking the activity of users online, was to analyze the browser logs as seen in [1]. In this study, the researchers analyzed the navigation patterns of users, the time they spent in different websites and any overlap they had with other users who belonged in the same study. However, what really set the bar higher up was the ability to keep logs on user behavior on the website's web server, as observed in [2] and [3]. Following up on these studies, some researchers found in [4] and [5] have taken into consideration how valuable search engines are as most internet users visit and use them, therefore performing studies on the server logs of search engines and coming up with valuable results which would not be able to be collected via browser logs or website server logs alone.
One of the latest methods, proposed in [6], for tracking the behavior of web users, is by combing the methods of website server logs, with data provided by a cookie which is placed by websites on users' computers.

### III.	USER TRACKING OVERVIEW
Tracking a user does not only mean tracking which websites have been visited in a single session, but also to identify which unique user has visited which group of websites. By saying "unique user", means to describe a user with some unique attributes which will most possibly always identify a single person, or group of people, such as email addresses, social media unencrypted login credentials, combination of sites visited, special interests, group of contacts and so on. Such information are used by different types of companies for both malicious or legit reasons. Malicious reasons could include anything ranging from corporate espionage to covert marketing purposes. Legitimate reasons may include tracking users' preferences or interests in order to provide an advanced web browsing experience to them, or to offer them personalized preferences based on their browsing style. Mostly, user tracking, for any reason is done by placing a tracking cookie on the user's computer, which will be examined in detail later on.

It is also noteworthy to discuss, that user tracking does not only happen on single websites or across a range of websites, but rather it may take place in a Local Area Network environment in order to limit or enrich a corporate or home user's web experience, or even to secure the user's actions or a corporation's interests against malicious actions such as corporate espionage, or to deter the possibility of social engineering attempts on a corporation's users. Therefore, user activity tracking and unique user tracking, serve both for attackers and web security professionals, both for opposing and similar reasons. For instance, a marketer who wishes to covertly collect information on a user in order to serve them with personalized advertisements, could possibly use similar techniques with those used by an IT department wishing to secure their users' web activities, however done for different reasons. There are multiple ways that a user's web session can be tracked, and each of those ways includes techniques to extract personal information entered by the user in web fields such as HTML forms.

Furthermore, system administrators in educational foundations and corporations, may choose to track users by employing the use of firewalls and combining user login credentials with a computer's IP address to determine who the user is. This could happen during the login procedure on a computer system, where a software can log the person's username and IP address and report it to the firewall. In turn, all user activities, such as websites visited and authentication requests are logged by the firewall and combined with the login information and IP address to keep track of which user was using which computer system and create a profile of websites visited and what other kinds of web services were used. The purpose of undertaking such actions by network administrators, would be to ensure the security of users and deter them from knowingly or unknowingly visiting websites or using other web services which could harm their privacy on the internet but also potentially pose risks to the organization's other computer systems, users and further network. Also, tracking such user surfing behavior and data can prove useful when illegal behavior is acted upon by users while using an organization's computer systems and network resources. Such actions serve to both safeguard both users and organizations and make resolution of conflicts easier.

There are many ethical issues in relation to user tracking and user profiling. When performed in a LAN, users usually know that they are tracked, usually by signing an organization's usage agreements. However, when it comes to internet tracking of a website's visitors, there are not only ethical concerns but also legal ones. Usually, websites which actively track a user's behavior and data, allow the user to learn about their terms of service where such tracking and profiling are detailed. This gives users the choice if they wish to use the website nevertheless. However, many sites do not comply to such laws, and track users unknowingly, which not only is arguably unethical and illegal in most countries, but also pose great risks to users. Such risks include profiling for unsolicited advertising purposes, identity theft, phishing attacks via collection of email addresses and personal information linked to those addresses and many more.

Ever since the inception of social networking a few years back, many advertising and marketing corporations came up with ways of gathering user personal information, their interests, surfing behavior, and their preferred methods of communications. Many times, such information may be collected freely by users who do not restrict information on their public social network profiles, therefore allowing data farming bots to freely crawl and collect all available information of interest from their profile. Other times however, this information is sold to such advertising agencies, by the companies providing said social networks, or by their third party application developers. In almost all cases, these companies take several measures to defend the selling of user personal information by including it as a term the user has to accept in order to sign up to their websites. Also, each time a user installs a third party application in a social network, they're usually asked if they wish to allow the application to gather personal information from the users.

### IV.	USER TRACKING APPROACHES
Several different techniques and approaches exist which can track the behavior and surfing actions of an online web user. Defining and examining the engineering of each method, one can better understand their strengths and limitations, and how they be combined to provide a personalized methodology to tracking not only the behaviors but also identify a web user.
The most typical mechanisms for tracking the actions of users on the web include the use of cookies in various forms, server logs, IP address tracking, eavesdropping, scripting and many more. Below, we see a few of these methods.

**A.	Cookie Tracking**
1.	Cookie Keys and Unique User Tracking
2.	Flash Cookies
3.	Websites can use embedded content such as Flash to store cookies and redirect users to other websites of their choosing.
4.	HTML5 Cookies

**B.	Server and Proxy Logs**
1.	Client Requests and Server Response -
2.	Server and Proxy Logs Analysis

**C.	Eavesdropping and Man in the Middle Attacks**
1.	Man-in-the-Middle attacks are a form of eavesdropping on a local area network. 


### IV.	PROXY SERVER AND COOKIE TRACKING MODEL
Modern user tracking methods make a fine job of keeping track of the websites visited, and this information is kept in cookies, if the website supports them, and on the web server’s access logs. This serves the purpose of serving users with personalized content or advertisements. However, a LAN’s system administrator wishes to keep information on separate users, so he knows which user has accessed which website or other web service. This information may include the IP address of the user, time of visit, time spent on a given website and many more information.

Typically, nowadays, most firewalls keep information such as these readily available in their different types of logs, such as for example their Unified Thread Management logs. In UTM logs, a system administrator may filter a user by IP, and view their entire activity, be it website visits, sent and received emails and so on.

If an organization wishes to build a profile for each user, either for work ethic or business evaluation reasons, the aspects of user tracking must be combined in order to give a full picture of the user’s activities, and also successfully identify the individual in real world terms. Typically, an administrator may use objects such as IP address, username used to log on to a terminal and a Two-Factor Authentication principle to always positively identify an individual user. Furthermore, such information would account for labeling database entries, in order to keep details such as the ones that follow, in a timely manner, allowing system administrators to profile a user through firewall logs:

**A.	Tracking Visited Websites**
In order for this model to work, an organization would need to make use of a web proxy, through which all web traffic is passed through, logged and filtered. The proxy will log information such as the user’s IP and their terminal or domain logon credentials, for successful identification. 

**B.	Tracking Users Surfing Behavior with Cookie Keys**
The web proxy server discussed above, will store cookies on the user’s computer, accounting for each request, and therefore connecting each request to the individual user’s profile. Thus, a single cookie per category may be set, where the user is tracked which social networking sites they are visiting

**C.	Intensive Tracking via Eavesdropping**

### VI.	CONCLUSION
Since the beginning of the internet, advertisers, governments, system administrators and malicious attackers have been looking for methods of tracking users actions, their surfing behavior and their interests. These user data are sometimes stored in databases so they can be sold to other third parties who wish to use it for marketing or research purposes, or they are simply used dynamically to serve advertisements to a user across different websites, or serve personalized content across a single website.

We have seen several different methods and approaches to web user tracking, which outline most of the modern approaches used by websites today. Notably, the use and workings of tracking cookies, server and proxy logs, eavesdropping and Man in the Middle techniques were observed. Furthermore, the use of scripting to track mouse and keyboard movement and input has been visited.

Moreover, a model requiring the combination of the discussed techniques, namely proxy logs, tracking cookies and eavesdropping, has been proposed. In this model, we combine the usage of tracking cookies, with eavesdropping and the logs of the web proxy server to acknowledge, not only the behavior of a LAN's users, but also to determine their real identity.


### REFERENCES
1.	L D. Catledge and J. E. Pitkow. Characterizing browsing strategies in the World-Wide Web. Computer Networks and ISDN Systems, 1995.
2.	B. Mobasher, R. Cooley, and J. Srivastava. Automatic personalization based on web usage mining. Communications of the ACM, 2000.
3.	Q. Yang and H. H. Zhang. Weh-log mining for predictive web caching. IEEE Trans. On Knowledge and Data Engineering, 2003.
4.	E. Agichtein, E. Brill, and S. Dumais. Improving Web search ranking by incorporating user behavior information. Proceedings of the 29th ACM SIGIR Conference, 2006.
5.	J. Luxenburger and G. Weikum. Query-Log Based Authority Analysis for Web Information Search, Lecture Notes in Computer Science, v. 3306, p. 94. 2004.
6.	R. Atterer, M. Wnuk, A. Schmidt. Knowing the User's Every Move – User Activity Tracking for Website Usability Evaluation and Implicit Interaction, 2006

[Comments](https://github.com/violarisgeorge/violarisgeorge.github.io/issues/5)
