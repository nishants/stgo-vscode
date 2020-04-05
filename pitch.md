SaxoTrader CI Helper Vscode Extension

-   a vscode plugin to manage the lifecycle of a branch in saxotrader go app

Currently as a developer, I have to jump between my editor, TFS, integration helper and azure while trying to build/debug and maintain my branch.

Also for some known CI issues, I often have to reach out to System engineer or frameworks team. I wan to have a tool that can diagnose and fix a CI problem.

Some workflow that could be streamlined :

-   Navigating to the point in code from screenshot comparison
-   View all cypress builds of my branch in editor
    -   integration helper logs
    -   DTE deployment link
    -   TFS56 deployment link
-   Monitor, trigger and navigate to cypress builds from editor

Features

-   Diagnose and fix ci problem related to infrastructure

    -   tfs-azure sync failures
    -   web-hook failures

-   Show screenshot differences in editor and navigate to code on selecting a difference

-   Show all links for which I have to type paste my branch name at various places right in my editor

-   View my PR details in editor

-   View cypress builds for my branch and their status in editor

-   Trigger screenshot builds from my editor

-   Approve/Reject/report on slack about screenshot differences from editor

-

\*

-

-   intermittent build issues with cypress build (e.g. checkout failures)

/\***\*\*\*\*\***\*\*\***\*\*\*\*\***/

---

**SaxoTraderGO CI Helper VSCode Extension**

We developers have to jump between our editor, TFS, integration helper and azure while trying to build/debug and maintain our branches; navigating through our bookmarks and typing/copy/pasting my branch-name multiple times a day

Also for some known CI issues, we often have to reach out to System engineers or framework team. We want to have a tool that can diagnose and fix some common CI problems.

Features we want to try out :

-   Diagnose and fix ci problems related to infrastructure like :

tfs-azure sync failures
web-hook failures

-   Show screenshot differences in editor

-   Navigating to the point in code from screenshot comparison

-   Show all links for which I have to type my branch name at various places right in my editor

    Integration helper logs
    DTE deployment link
    TFS56 deployment link

-   View my PR details in editor

-   View,monitor, trigger and navigate to cypress builds from editor

-   Trigger screenshot builds from my editor

-   Approve/Reject/report on slack about screenshot differences from editor

---

@channel

For the hackathon, join us if if you are skilled in or interesting in learning and experimenting with following :

-   vs code extension development
-   CI/CD with Azure devops server
-   Azure/TFS NodeJs API
-   Typescript
-   Simple Git NodeJs API
-   CI/CD process at Saxobank

Project wiki page : https://wiki/pages/viewpage.action?pageId=134875385

In short, we are building a vscode extension that gives us a single UI that combines various features of `Code Editor + TFS + Azure Devops Server + Integration Helper`

This hackathon we are building just an MVC of what will be a long term side project.

Please also join aur channel even if you are not interested in development, but want to suggest features, participate in user testing, report bugs or contribute in any way you like : [stgoci-vscode](https://join.slack.com/share/I01154LBFUN/d11ZYp2xkhg55OknidA2ojU5/enQtMTAzOTE1NjM4OTk3NC1hOTk3NjkxZGZiYzQwN2U1ODE2NjI0ZDIyNjY5OTM2YTQzN2FmNGQ3NjdjOGI3NzM3MTUxMDk5NGU3NjdkZTVl)

Project trello board : https://trello.com/b/kb4zZJAp/stgo-vscode

```
*SaxoTraderGO CI Helper VsCode Extension*
For the hackathon, join us if if you are skilled in or interesting in learning and experimenting with following :
- vs code extension development
- CI/CD with Azure Devops server
- Azure/TFS NodeJs API
- Typescript
- Simple Git NodeJs API
- CI/CD process at Saxobank

In short, we are building a vscode extension that gives us a single UI that combines various features of  `Code Editor + TFS + Azure Devops Server + Integration Helper`

This hackathon we are building just an MVC of what will be a long term side project.

Please join us even if you are not interested in development, but want to suggest features, participate in user testing, report bugs or contribute in any way you like.

Project wiki page : https://wiki/pages/viewpage.action?pageId=134875385
Project Trello board : https://trello.com/b/kb4zZJAp/stgo-vscode
Slack channel :  [stgoci-vscode](https://join.slack.com/share/I01154LBFUN/d11ZYp2xkhg55OknidA2ojU5/enQtMTAzOTE1NjM4OTk3NC1hOTk3NjkxZGZiYzQwN2U1ODE2NjI0ZDIyNjY5OTM2YTQzN2FmNGQ3NjdjOGI3NzM3MTUxMDk5NGU3NjdkZTVl)
```
