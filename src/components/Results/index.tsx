import React, { useCallback, useEffect, useState } from 'react';
import {  PollOption } from '../../types/Poll';

interface ResultsProps {
  poll: PollOption[];
  viewWinner: boolean;
  setViewWinner: (viewWinner: boolean) => void;
  totalVotes: number;
}

const Results: React.FC<ResultsProps> = ({ poll, viewWinner, setViewWinner, totalVotes }) => {
  const [options, setOptions] = useState([...poll]);
  const [resultNote, setResultNote] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  

  const handleWinnerClick = () => {
    setViewWinner(!viewWinner);
    setIsDisabled(!viewWinner);
    checkPoll('won');
  }

  const checkPoll = useCallback((what: string) => {
    if(options[0].votes === options[1].votes) {
      setResultNote("it's a tie")
    } else {
      setResultNote(`${options[1].text} ${what} by ${options[1].votes - options[0].votes } vote(s)`)
    }
  }, [options]);


  useEffect(()=>{
    setOptions(options.sort(((a,b) => a.votes - b.votes)));
    totalVotes > 0 && checkPoll('is leading');
    setIsDisabled(totalVotes===0);
  }, [poll, totalVotes, options, checkPoll])




  return (
    <>
      <p data-testid="result">{resultNote}</p>
      <section className="layout-row align-items-center justify-content-center mr-10 ml-10 pr-10 pl-10">
        <button data-testid="winner-button" onClick={handleWinnerClick} disabled={isDisabled}>
          View Winner
        </button>
      </section>
      <p>Total Votes: {totalVotes}</p>
    </>
  );
};

export default Results;
