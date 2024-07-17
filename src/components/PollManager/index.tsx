import React, { useState } from 'react';
import Vote from '../Vote';
import Results from '../Results';
import { pollData, PollOption } from '../../types/Poll';

const PollManager: React.FC = () => {

  const { question, options } = pollData;
  const [pollOptions, setPollOptions] = useState<PollOption[]>(options);
  const [totalVote, setTotalVote] = useState(0);
  const [showWinner, setShowWinner] = useState(false);

  const handleShowWinner = (what: boolean) => {
    setShowWinner(what);
  }

  const calculateVote = (data:PollOption[]): number => data.reduce((p: number, n) => p += n.votes, 0);

  const handleVote = (id: number) => {
    setPollOptions(pollOptions.map((p) => p.id === id ? Object.assign(p, { votes: p.votes + 1 }) : p));
    setTotalVote(calculateVote(pollOptions))
  };

  return (
    <div className="layout-column align-items-center justify-content-start poll-manager" data-testid="poll-manager">
      <h2>{question}</h2>
      <Vote options={pollOptions} onVote={handleVote} viewWinner={showWinner} />
      <Results poll={pollOptions} viewWinner={showWinner} setViewWinner={handleShowWinner} totalVotes={totalVote} />
    </div>
  );
};

export default PollManager;
