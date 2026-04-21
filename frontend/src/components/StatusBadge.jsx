const statusStyles = {
  New: 'bg-sky-100 text-sky-700',
  Contacted: 'bg-amber-100 text-amber-700',
  Qualified: 'bg-emerald-100 text-emerald-700',
  Closed: 'bg-indigo-100 text-indigo-700',
  Lost: 'bg-rose-100 text-rose-700'
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
