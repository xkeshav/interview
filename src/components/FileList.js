import React, {useState} from 'react';

import "../App.css"

function FileData({ data }) {

  const [fileData, setFileData] = useState(data);

  const addMore = (file) => {
    console.log(file)
  }
  const clickOnFile = (file) => {
    // setFileData()
  };

  return (
    <>
      {fileData.map(file => (
        <>
        <li onDoubleClick={()=>clickOnFile(file)}><button>{file.name}<span onClick={()=>addMore(file)}>[+]</span></button></li>
        {file.files && file.files.length > 0 && <FileList list={file.files}/>}
        </>
      ))
      }
    </>
  );
}

function FileList({ list }) {
  console.log({ list })
  return (
        <ul>
          <FileData data={list} />
          <li>
            <button>+</button>
          </li>
        </ul>
    )
}

export default FileList;