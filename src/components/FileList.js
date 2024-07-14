import React from 'react';

function FileData({data}) {
  return (
    <>
    {data.map(file => <li><button>{file.name}<span>[+]</span></button></li>)}
    </>
  );
}

function FileList({list}) {
  console.log({list});
  return {
    {list.map(l => (
    <ul>
      <FileData data={l}/>
      <li>
        <button>+</button>
      </li>
    </ul>))
    }
  }
}

export default FileList;