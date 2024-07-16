import React, { useState } from 'react';
import Vote from '../Vote';
import Results from '../Results';
import { pollData, Poll, PollOption } from '../../types/Poll';

const PollManager: React.FC = () => {

const [pollList, setPollList] = useState<Poll>(pollData);

  const [totalVote, setTotalVote] = useState(0);

  const [showWinner, setShowWinner] = useState(false);

  const handleShowWinner = (what: boolean) => {
    setShowWinner(what);
  }

  const calculateVote = (data: PollOption[]) => data.reduce((p,n) => p+=n.votes,0);

  const handleVote = (id: number) => {
    console.log('clicked handleVote', id);
    const npl = pollList.options.map( (p: PollOption) => p.id === id ? Object.assign(p, {votes: p.votes + 1} ) : p);
    console.log(npl);
    setPollList({...pollList, options: npl});
    setTotalVote(calculateVote(pollList.options))
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
