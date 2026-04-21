import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Leads', to: '/leads' }
];

const AppLayout = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-white px-5 py-6 shadow-panel lg:w-72 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Real Estate CRM</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Lead Hub</h1>
              <p className="mt-2 text-sm text-slate-500">Track and manage your property leads in one place.</p>
            </div>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 lg:mt-6"
            >
              Logout
            </button>
          </div>

          <nav className="mt-6 flex gap-3 overflow-x-auto lg:flex-col">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 rounded-2xl bg-slate-900 p-4 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Signed in as</p>
            <p className="mt-2 break-all text-sm font-medium">{user?.email}</p>
            <p className="mt-2 text-xs text-slate-400">Current page: {location.pathname.replace('/', '') || 'dashboard'}</p>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
