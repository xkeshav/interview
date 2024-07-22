# Interview Question

Company: Atlassian India

Below are just for my own reference and completed somewhat even after interview completion

## First Round

| Date            | Duration | Name                 |
| :-------------- | :------: | :------------------- |
| August 24, 2023 |  1 Hour  | Browser Coding Round |

Question: develop below page in any framework/vanilla using the data coming from **page-data.js**

<details>
  <summary>Below is the content of javascript file</summary>
</details>

```js
const backendData = [
  { id: '1', name: 'Office Map' },
  {
    id: '2',
    name: 'New Employee Onboarding',
    children: [
      { id: '8', name: 'Onboarding Materials' },
      { id: '9', name: 'Training' },
    ],
  },
  {
    id: '3',
    name: 'Office Events',
    children: [
      {
        id: '6',
        name: '2018',
        children: [
          { id: '10', name: 'Summer Picnic' },
          { id: '11', name: "Valentine's Day Party" },
          { id: '12', name: "New Year's Party" },
        ],
      },
      { id: '7', name: '2017', children: [{ id: '13', name: 'Company Anniversary Celebration' }] },
    ],
  },
  { id: '4', name: 'Public Holidays' },
  { id: '5', name: 'Vacations and Sick Leaves' },
];

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(resolve, 100, backendData);
  });
}
```

![Page Tree](./src/PageTree.png)

---

## Second Round

| Date            | Duration |                    Name |
| :-------------- | :------: | ----------------------: |
| August 31, 2023 |  1 Hour  | JavaScript Coding Round |

Question: asked to create a production ready method for getting feature flag by sending feature flag name, this was basically more on async await related question.

solution is on [_src/feature-flag.js_](src/feature-flag.js) file
