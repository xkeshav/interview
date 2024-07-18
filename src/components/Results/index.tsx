import React, { useEffect, useState } from 'react';
import { Poll } from '../../types/Poll';

interface ResultsProps {
  poll: Poll;
  viewWinner: boolean;
  setViewWinner: (viewWinner: boolean) => void;
  totalVotes: number;
}

const Results: React.FC<ResultsProps> = ({ poll, viewWinner, setViewWinner, totalVotes }) => {
  const [options, setOptions] = useState([...poll.options]);
  const [resultNote, setResultNote] = useState('');
  

  const handleWinnerClick = () => {
    setViewWinner(!viewWinner);
    //checkPoll();
  }

  const checkPoll = () => {
    if(options[0].votes === options[1].votes) {
      setResultNote("It's a tie")
    } else {
      setResultNote(`${options[1].text} ${!viewWinner? 'is leading': 'won'} by ${options[1].votes - options[0].votes } vote(s)`)
    }
  };


  useEffect(()=>{
    setOptions(options.sort(((a,b) => a.votes - b.votes)));
    totalVotes > 0 && checkPoll();
  }, [poll, totalVotes, options, checkPoll])


  return (
    <>
      <p data-testid="result">{resultNote}</p>
      <section className="layout-row align-items-center justify-content-center mr-10 ml-10 pr-10 pl-10">
        <button data-testid="winner-button" onClick={handleWinnerClick} disabled={viewWinner || totalVotes === 0}>
          View Winner
        </button>
      </section>
      <p>Total Votes: <strong>{totalVotes}</strong></p>
    </>
  );
};

export default Results;
