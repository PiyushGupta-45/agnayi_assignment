import { useState } from 'react';

const initialState = {
  name: '',
  phone: '',
  email: '',
  budget: '',
  preferences: '',
  status: 'New'
};

const LeadForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Name and phone are required.');
      return;
    }

    const result = await onSubmit({
      ...formData,
      budget: formData.budget ? Number(formData.budget) : 0
    });

    if (result?.success) {
      setFormData(initialState);
    } else if (result?.message) {
      setError(result.message);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-panel">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Add New Lead</h2>
        <p className="mt-1 text-sm text-slate-500">Capture new prospects and start tracking them right away.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Name</span>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
              placeholder="Enter lead name"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Phone</span>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
              placeholder="Enter phone number"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
              placeholder="Enter email"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Budget</span>
            <input
              type="number"
              min="0"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
              placeholder="Enter budget"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Preferences</span>
          <textarea
            name="preferences"
            value={formData.preferences}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
            placeholder="Apartment, 3 BHK, near metro, etc."
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Initial Status</span>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Closed</option>
            <option>Lost</option>
          </select>
        </label>

        {error ? <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? 'Saving Lead...' : 'Add Lead'}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
