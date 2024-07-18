import React, { useState } from 'react';
import { Poll, pollData, PollOption } from '../../types/Poll';
import Results from '../Results';
import Vote from '../Vote';

const PollManager: React.FC = () => {

  //const { question, options } = pollData;
  const [pollList, setPollList] = useState<Poll>(pollData);
  const [totalVote, setTotalVote] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  const handleShowWinner = (what: boolean) => {
    setShowWinner(what);
  }

  const calculateVote = (data:PollOption[]): number => data.reduce((p: number, n) => p += n.votes, 0);

  const handleVote = (id: number) => {
    setPollList(prev => ({...prev, options: prev.options.map((p:PollOption) => p.id === id ? Object.assign(p, { votes: p.votes + 1 }) : p)}));
    setTotalVote(calculateVote(pollList.options));
  };

  return (
    <div className="layout-column align-items-center justify-content-start poll-manager" data-testid="poll-manager">
      <h2>{pollList.question}</h2>
      <Vote options={pollList.options} onVote={handleVote} viewWinner={showWinner} />
      <Results poll={pollList} viewWinner={showWinner} setViewWinner={handleShowWinner} totalVotes={totalVote} />
    </div>
  );
};

export default PollManager;
