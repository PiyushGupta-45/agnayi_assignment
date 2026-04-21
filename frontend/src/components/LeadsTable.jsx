import StatusBadge from './StatusBadge';

const statusOptions = ['New', 'Contacted', 'Qualified', 'Closed', 'Lost'];

const LeadsTable = ({ leads, loading, onStatusChange, onDelete, pendingLeadId }) => {
  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-panel">Loading leads...</div>;
  }

  if (!leads.length) {
    return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500 shadow-panel">No leads found for the current filters.</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-panel">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Lead</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Contact</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Budget</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Preferences</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Created</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead._id} className="align-top">
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{lead.name}</p>
                  {lead.email ? <p className="mt-1 text-sm text-slate-500">{lead.email}</p> : null}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">{lead.phone}</td>
                <td className="px-4 py-4 text-sm text-slate-600">{lead.budget ? `₹${Number(lead.budget).toLocaleString()}` : '-'}</td>
                <td className="max-w-xs px-4 py-4 text-sm text-slate-600">{lead.preferences || '-'}</td>
                <td className="px-4 py-4">
                  <div className="mb-2">
                    <StatusBadge status={lead.status} />
                  </div>
                  <select
                    value={lead.status}
                    onChange={(event) => onStatusChange(lead._id, event.target.value)}
                    disabled={pendingLeadId === lead._id}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500 disabled:bg-slate-100"
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-4">
                  <button
                    type="button"
                    onClick={() => onDelete(lead._id)}
                    disabled={pendingLeadId === lead._id}
                    className="rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
