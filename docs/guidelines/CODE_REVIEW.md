# General rules for CODE REVIEW process

- **Developers must be able to make progress on their tasks.**

In general, reviewers should favor approving a PR once it is in a state where it definitely improves the overall code health of the system being worked on, even if the PR isn’t perfect.

- **The author of the code change is responsible for the correct execution of the change.**

If there are not clear reasons one approach ensures better system operability, the opinions of the author of the change should carry the most weight.

If a compromise on quality is made to reach a deadline, the author of the PR should capture the technical debt in a ticket, link the ticket in the PR and ideally address it in the near future.

- **Reviewers must request changes politely, and explain why they’re requesting the change.**

- **Technical facts and data overrule opinions and personal preferences.**

- **Reviewers should avoid leaving the PR in a in-between state where they didn't reject it, but they didn't approve it either.**

Reviewer should try to class the PR as a blocking or non-blocking one. A blocking PR should be followed by objective comments that clearly explain what the problem is. A non blocking PR can be followed by subjective comments, but the author of the change can decide whether to implement them or not.
Reviewer can use a 'still reviewing 👍 ' comment to show the intention of coming back later on that PR.

- **The author of the change should highlight with comments on his PR anything he considers needs particular attention from the reviewer.**

- **Developers should keep PRs to a manageble size.**

Big pull requests can act as blockers to tickets, are often rushed by reviewers and can lead to bugs/mistakes slipping through.

An arbitrary amount of _500 additions/deletions_ is a good change count to limit yourself to, but we’re not super strict with it. The key is making sure your pull request can be understood quickly by reviewers and has as small a footprint as is possible.

- **Developers should review their own pull requests first**

This will allow developers to quickly cover off the first round of change requests.

## What should be classified as a blocking PR:

- any change that will cause an issue with the current functionality.
- any changes don't align with the team’s coding standards.

Coding standards are currently defined [here](https://shieldpay.atlassian.net/wiki/spaces/DEV/pages/2244050945/Coding+Standards). Some frontend related guides are [here](https://github.com/Shieldpay/optimus/wiki/Frontend-coding-style-guide). There is some work in progress to review this and we'll come up with a strategy for how to introduce a new standard too. Until then, anything that is not there, it's not considered a standard.

- code that is more complex than it needs to be.

More complex” usually means “can’t be understood quickly by code readers.” It can also mean “developers are likely to introduce bugs when they try to call or modify this code.”

- any changes that are outside of the goal of the PR
- any changes don't align with the business logic

_Example: You are missing some error handling here._

## What should be classified as a non-blocking PR:

- anything that doesn't fall in one of the categories stated above
- any subjective remark

The reviewer should look for anything they personally disagree with. Reviewers should always feel free to leave comments expressing that something could be better, but if it’s not very important, prefix it with something like _“Nit:“_ to let the author know that it’s just a point of polish that they could choose to ignore.

_Example: Your method name is not clear enough._
