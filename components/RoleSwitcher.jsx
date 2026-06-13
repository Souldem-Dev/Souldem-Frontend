'use client';
import { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { ChevronDown, Check } from 'lucide-react';

const ROLE_LABELS = {
  student: 'Student',
  hod:     'HOD',
  mentor:  'Mentor',
  grader:  'Grader',
};

const ROLE_HOME = {
  student: '/user/wallet',
  hod:     '/user/hod',
  mentor:  '/user/mentor',
  grader:  '/user/grader',
};

const ROLE_COLORS = {
  student: 'bg-green-100 text-green-700',
  hod:     'bg-purple-100 text-purple-700',
  mentor:  'bg-blue-100 text-blue-700',
  grader:  'bg-orange-100 text-orange-700',
};

const RoleSwitcher = () => {
  const [activeRole, setActiveRole] = useState('');
  const [allRoles, setAllRoles]     = useState([]);
  const [open, setOpen]             = useState(false);
  const ref                         = useRef(null);
  const router                      = useRouter();

  useEffect(() => {
    setActiveRole(Cookies.get('activeRole') || '');
    setAllRoles(JSON.parse(localStorage.getItem('allRoles') || '[]'));
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Hide for university accounts or if only one role
  if (!activeRole || activeRole === 'university' || allRoles.length <= 1) return null;

  const switchRole = (role) => {
    Cookies.set('activeRole', role, { expires: 1 });
    setActiveRole(role);
    setOpen(false);
    router.push(ROLE_HOME[role]);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition ${ROLE_COLORS[activeRole] || 'bg-gray-100 text-gray-700'}`}
      >
        <span>{ROLE_LABELS[activeRole] || activeRole}</span>
        <ChevronDown size={13} />
      </button>

      {open && (
        <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50 min-w-[130px]">
          <p className="px-3 py-1 text-xs text-gray-400 font-medium uppercase tracking-wide">Switch role</p>
          {allRoles.map((role) => (
            <button
              key={role}
              onClick={() => switchRole(role)}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between"
            >
              <span className={role === activeRole ? 'font-semibold' : 'text-gray-700'}>
                {ROLE_LABELS[role] || role}
              </span>
              {role === activeRole && <Check size={14} className="text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleSwitcher;
