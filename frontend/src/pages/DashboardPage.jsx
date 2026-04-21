import { useEffect, useState } from 'react';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import { fetchLeads } from '../services/api';

const statusOrder = ['New', 'Contacted', 'Qualified', 'Closed', 'Lost'];

const DashboardPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        const data = await fetchLeads();
        setLeads(data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const counts = statusOrder.reduce((acc, status) => {
    acc[status] = leads.filter((lead) => lead.status === status).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Overview</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-500">Quick visibility into your current lead pipeline.</p>
      </div>

      {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatsCard label="Total Leads" value={loading ? '...' : leads.length} accent="bg-brand-500" />
        <StatsCard label="Qualified Leads" value={loading ? '...' : counts.Qualified || 0} accent="bg-emerald-500" />
        <StatsCard label="Closed Leads" value={loading ? '...' : counts.Closed || 0} accent="bg-indigo-500" />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
        <h3 className="text-lg font-semibold text-slate-900">Leads by Status</h3>
        <p className="text-sm text-slate-500">A compact summary of your current pipeline stages.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statusOrder.map((status) => (
            <div key={status} className="rounded-2xl bg-slate-50 p-4">
              <StatusBadge status={status} />
              <p className="mt-4 text-3xl font-semibold text-slate-900">{loading ? '...' : counts[status] || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
