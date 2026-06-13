import React from 'react';
import { UserPlus, ToggleRight } from 'lucide-react';
import Link from 'next/link';

const Card = ({ data, name }) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-y-8 gap-x-4">
      {data.map((item, index) => {
        const govAdd  = item.args[1];
        const govName = item.args[3];
        const cName   = name;

        return (
          <div
            key={index}
            className="bg-white rounded-3xl flex flex-col justify-between p-6 gap-y-4"
          >
            {/* Header */}
            <div>
              <h2 className="text-2xl font-thin">{govName}</h2>
              <p className="text-sm text-para">by {cName}</p>
            </div>

            {/* Address */}
            <div className="text-right">
              <p className="text-xs text-para">Governance address</p>
              <p className="text-blue font-mono text-sm truncate">{govAdd}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <Link
                href={`/university/governance/invite/${govAdd}/${govName}/${cName}`}
                className="flex-1 flex items-center justify-center gap-1.5 bg-blue text-white text-sm font-medium py-2 rounded-xl hover:bg-blue/90 transition"
              >
                <UserPlus size={15} />
                Invite
              </Link>
              <Link
                href={`/university/governance/marksEntryToggle/${govAdd}/${govName}/${cName}`}
                className="flex-1 flex items-center justify-center gap-1.5 border border-blue text-blue text-sm font-medium py-2 rounded-xl hover:bg-blue/5 transition"
              >
                <ToggleRight size={15} />
                Marks Toggle
              </Link>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Card;
