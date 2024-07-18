# Poll Manager

This question was asked by a company and was conducted by hackerRank and has to complete using React and TypeScript

## example

![demo][demo]

## demo link

[working demo link][work]

## Statement

Design a Poll Manager app that allows users to vote for one of two options and view the winner. The app should be built using TypeScript and React. Certain core React functionalities are already implemented.

## Instructions

Folder Structure

```bash

├── package.json
├── README.md
├── src
│   ├── App.css
│   ├── App.js
│   ├── App.test.tsx
│   ├── components
│   │   ├── PollManager
│   │   │   └── index.tsx
│   │   ├── Results
│   │   │   └── index.tsx
│   │   └── Vote
│   │       └── index.tsx
│   ├── index.css
│   ├── index.js
│   └── types
│       └── Poll.ts
└── tsconfig.json


```

The application has 3 pre defined components

- _PollManager_
- _Vote_
- _Results_

where their respective functionalities will be implemented.

## Components functionality need to implement

### _Vote_

- [] Display the text of each option.  
- [] Provide a "Vote" button for each option to cast a vote.  
- [] Disable the "Vote" button for each option when the winner is declared.

### _Results_

- Display the current leader or tie status.
- Display the result text based on the following conditions:
  - If no votes have been cast, the result text should be empty: `""`.
  - If the same number of votes have been cast for both options, the result text should be

    _It's a tie._

  - If one option has more votes than the other, the result text should be:

      _{LEADER} is leading by {VOTE_DIFFERENCE} vote(s)._

- **View Winner** button:
  - If no votes have been cast, the button should be disabled.
  - Clicking the "View Winner" button should:
    - If the same number of votes have been cast for both options, Display the result text
      _It's a tie_
    - If one option has more votes than the other then display the result text:  
      _{LEADER} won by {VOTE_DIFFERENCE} vote(s)_
    - Disable the "View Winner" button
    - Disable the "Vote" button for each option
    - Show Total Votes below Button

### _PollManager_

- Display the poll question.
- Manage the state of the poll, including votes and winner status.
- Pass the relevant data and functions to the Vote and Results components.

The following _data-testid_ attributes are required in the components for the tests to pass:

| **Attribute**         | **Component**             |
|-----------------------|---------------------------|
| poll-manager          | PollManager container     |
| option-1              | Vote option 1 container   |
| option-2              | Vote option 1 container   |
| choice-1              | Choice 1 text             |
| choice-2              | Choice 2 text             |
| winner-button         | View Winner button        |

## Notes

- Components have `data-testid` attributes for test cases and certain classNames for rendering purposes. They should not be changed.
- below files that should be modified by the candidate

  - `src/components/PollManager/index.tsx`,
  - `src/components/Vote/index.tsx`,
  - `src/components/Results/index.tsx`,
  - `src/types/Poll.ts`.

## Environment

- React Version: 18.2.0
- Node Version: 14(LTS)

All other files are ReadOnly

## How to Start

```bash
> npm install
> npm run start
```

- run test command

```bash
npm run test
```

<!-- References -->

[demo]: https://hrcdn.net/s3_pub/istreet-assets/ZGfwyhx572_EkNCGzMRkbA/poll-manager.gif  
[work]: https://mh3xdg-8000.csb.app
