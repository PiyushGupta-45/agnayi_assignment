import { useEffect, useState } from 'react';
import LeadForm from '../components/LeadForm';
import LeadsTable from '../components/LeadsTable';
import { createLead, deleteLeadById, fetchLeads, updateLead } from '../services/api';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pendingLeadId, setPendingLeadId] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadLeads = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search.trim()) {
        params.search = filters.search.trim();
      }
      if (filters.status) {
        params.status = filters.status;
      }

      const data = await fetchLeads(params);
      setLeads(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadLeads();
    }, 250);

    return () => clearTimeout(timeout);
  }, [filters.status, filters.search]);

  const handleCreateLead = async (payload) => {
    try {
      setSubmitting(true);
      const newLead = await createLead(payload);
      const matchesStatus = !filters.status || filters.status === newLead.status;
      const matchesSearch = !filters.search || newLead.name.toLowerCase().includes(filters.search.toLowerCase());

      if (matchesStatus && matchesSearch) {
        setLeads((prev) => [newLead, ...prev]);
      }

      setMessage('Lead created successfully.');
      setError('');
      return { success: true };
    } catch (err) {
      const apiMessage =
        err.response?.data?.details?.[0]?.msg ||
        err.response?.data?.message ||
        'Failed to create lead';
      return { success: false, message: apiMessage };
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      setPendingLeadId(id);
      const updated = await updateLead(id, { status });
      setLeads((prev) => {
        const nextLeads = prev.map((lead) => (lead._id === id ? updated : lead));

        if (filters.status && updated.status !== filters.status) {
          return nextLeads.filter((lead) => lead._id !== id);
        }

        if (filters.search && !updated.name.toLowerCase().includes(filters.search.toLowerCase())) {
          return nextLeads.filter((lead) => lead._id !== id);
        }

        return nextLeads;
      });
      setMessage('Lead status updated.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update lead');
    } finally {
      setPendingLeadId('');
    }
  };

  const handleDeleteLead = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this lead?');
    if (!confirmed) {
      return;
    }

    try {
      setPendingLeadId(id);
      await deleteLeadById(id);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      setMessage('Lead deleted successfully.');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete lead');
    } finally {
      setPendingLeadId('');
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Lead Management</p>
        <h2 className="text-3xl font-semibold text-slate-900">Leads</h2>
        <p className="text-sm text-slate-500">Add new prospects, search the pipeline, and update their journey.</p>
      </div>

      {message ? <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div> : null}
      {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <LeadForm onSubmit={handleCreateLead} loading={submitting} />

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
            <div className="grid gap-4 md:grid-cols-[1fr_220px]">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Search by name</span>
                <input
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                  placeholder="Search lead name..."
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">Filter by status</span>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                >
                  <option value="">All statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Closed">Closed</option>
                  <option value="Lost">Lost</option>
                </select>
              </label>
            </div>
          </div>

          <LeadsTable
            leads={leads}
            loading={loading}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteLead}
            pendingLeadId={pendingLeadId}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadsPage;
