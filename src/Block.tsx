import { useState } from 'react';

export const Block = ({ block, handleClick }: any) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleChildClick = (e: any) => {
    setIsClicked(true);
    !isClicked && handleClick(block.num);
  };

  return (
    <div className="block" onClick={handleChildClick} style={{ backgroundColor: block.color }}>
      {block.num}
    </div>
  );
};
