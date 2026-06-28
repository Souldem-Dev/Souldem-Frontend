'use client';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Users } from 'lucide-react';
import StudentProgressTable from '@/components/governance/StudentProgressTable';

export default function UniversityStudentsPage() {
  const params  = useParams();
  const router  = useRouter();
  const govName = decodeURIComponent(params.govName || '');
  const cName   = decodeURIComponent(params.cName   || '');

  return (
    <div className="p-6 md:p-8 w-full flex flex-col gap-5">
      <div className="relative rounded-2xl overflow-hidden p-6 text-white" style={{ background: 'linear-gradient(135deg,#3E68FC 0%,#5b51f5 100%)' }}>
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.05)' }} />
        <div className="relative flex items-center gap-4">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <ChevronLeft size={18} />
          </button>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <Users size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{cName}</p>
            <h1 className="text-xl font-bold text-white leading-tight">Student Progress</h1>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{govName}</p>
          </div>
        </div>
      </div>

      <StudentProgressTable
        govAdd={params.govAdd}
        govName={govName}
        cName={cName}
      />
    </div>
  );
}
