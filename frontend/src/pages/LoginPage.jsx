import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: 'admin@example.com',
    password: 'admin123'
  });
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const result = await login(formData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(55,93,251,0.18),_transparent_30%),linear-gradient(135deg,_#f8fafc,_#e2e8f0)] p-4">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/40 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden bg-slate-900 p-10 text-white lg:block">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-100">Real Estate CRM</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight">A focused lead management workspace for sales teams.</h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">
            Track incoming leads, update their status, and monitor pipeline health from a clean dashboard built for daily operations.
          </p>
          <div className="mt-10 grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Dashboard snapshot</p>
              <p className="mt-2 text-2xl font-semibold">Total leads, qualified prospects, and conversion visibility.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">Lead workflow</p>
              <p className="mt-2 text-2xl font-semibold">Add, search, filter, update status, and delete without clutter.</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Welcome Back</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Sign in to continue</h2>
            <p className="mt-2 text-sm text-slate-500">Use the configured admin credentials to access the CRM.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                  placeholder="admin@example.com"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-brand-500"
                  placeholder="Enter password"
                />
              </label>

              {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:bg-brand-300"
              >
                {loading ? 'Signing In...' : 'Login'}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Demo credentials:
              <div className="mt-2 font-medium text-slate-900">Email: admin@example.com</div>
              <div className="font-medium text-slate-900">Password: admin123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
