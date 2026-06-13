import React from 'react';
import { MoveUpRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

const safeEncode = (v) => {
  // The stored value may already be URL-encoded (legacy data). Decode first, then re-encode cleanly.
  try {
    return encodeURIComponent(decodeURIComponent(v || ''));
  } catch {
    return encodeURIComponent(v || '');
  }
};
const buildHref = (base, item) =>
  `${base}/${item.governAdd}/${safeEncode(item.gName)}/${safeEncode(item.cName)}`;

const Card = (props) => {
  // props.url = primary action (existing), props.actions = optional [{url, label}]
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-y-8 gap-x-4">
      {props.data.map((item, index) => (
        <div
          key={index}
          className="w-auto h-full bg-white border-0 text-black relative rounded-3xl"
        >
          <div className="p-6 flex flex-col justify-between gap-y-4">
            <div>
              <h2 className="text-2xl font-thin">{decodeURIComponent(item.gName || '')}</h2>
              <p> by {decodeURIComponent(item.cName || '')}</p>
            </div>

            <div>
              <div className="flex flex-col text-right">
                <p>Governance address</p>
                <h2 className="text-2xl text-blue font-thin truncate">{item.governAdd}</h2>
              </div>
            </div>

            <Link href={buildHref(props.url, item)}>
              <button
                className="absolute top-0 right-2 p-2 mx-auto my-4 text-white bg-blue rounded-full focus:ring-1"
                title={props.primaryLabel || 'Open'}
              >
                <MoveUpRight className="text-white" />
              </button>
            </Link>

            {props.actions && props.actions.length > 0 && (
              <div className="flex gap-2 mt-2 flex-wrap">
                {props.actions.map((a) => (
                  <Link key={a.url} href={buildHref(a.url, item)}>
                    <button className="text-sm px-3 py-1.5 rounded-lg border border-blue text-blue hover:bg-blue hover:text-white inline-flex items-center gap-1.5">
                      {a.icon === 'subjects' && <BookOpen size={14} />}
                      {a.label}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </main>
  );
};

export default Card;
