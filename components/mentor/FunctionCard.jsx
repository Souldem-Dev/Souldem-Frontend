'use client';
import React, { useState } from 'react';

import Invite from './Invite';
import Approval from './Approval';

const FunctionCard = () => {
  const [Card, setCard] = useState(false);
  const [activeSection, setActiveSection] = useState('Invite');

  const openCard = () => {
    setCard(true);
  };

  const closeCard = () => {
    setCard(false);
  };

  return (
    <div className="flex flex-col relative bg-white  p-2 md:p-4 md:mx-4 mx-2 lg:mx-20">
      <div className="flex justify-between mb-4">
        <div>
          <button
            className={`px-4 py-2 ${
              activeSection === 'Invite' ? 'bg-blue text-white' : 'bg-gray-200'
            } rounded-l`}
            onClick={() => setActiveSection('Invite')}
          >
            Invite
          </button>
          <button
            className={`px-4 py-2 ${
              activeSection === 'Approval'
                ? 'bg-blue text-white'
                : 'bg-gray-200'
            } rounded-l`}
            onClick={() => setActiveSection('Approval')}
          >
            Approval
          </button>
        </div>
      </div>

      {activeSection === 'Invite' && (
        <div className="p-2">
          <inviteMentor />
        </div>
      )}

      {activeSection === 'Approval' && (
        <div className="p-2">
          <Approval />
        </div>
      )}
    </div>
  );
};

export default FunctionCard;
