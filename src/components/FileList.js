import React, { useState } from 'react';

import "../App.css";

function FileData({ data }) {

  const [fileData, setFileData] = useState(data);

  const addMore = (file) => {
    console.log(file)
  }
  const onDoubleClick = (file) => {
    console.log('on Double Click', {file});
    // Object.assign(file, {files: [], isOpen: true} );
  };

  return (
    <>
      {fileData.map((file,i) => (
        <li onDoubleClick={()=> onDoubleClick(file)} key={i}>
          <button>{file.name}{file.files === undefined && <span onClick={()=>addMore(file)}>[+]</span> }</button>
          {file.files && file.files.length > 0 && <FileList list={file.files}/>}
        </li>
      ))
      }
    </>
  );
}

function FileList({ list }) {
  console.log({ list });
  const [files, setFiles ] = useState(list);
  const handleBtnClick = () => {
    console.log({files});
    setFiles(old=> [...old, [{name: 'New File'}]]);
    console.log({files});

  }
  return (
        <ul>
          <FileData data={files} />
          <li>
            <button onClick={handleBtnClick}>+</button>
          </li>
        </ul>
    )
}

export default FileList;