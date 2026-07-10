export function SettingsModule() {
  return (
    <div className="glass-card rounded-[32px] p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          System Configuration
        </h1>
        <p className="text-sm text-slate-500">
          Manage workspace variables, environment configurations, and security
          matrices.
        </p>
      </div>
      <div className="border-t border-sky-100 pt-4 space-y-4 max-w-md">
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Developer Principal Identity
          </label>
          <input
            type="text"
            readOnly
            value="John Doe"
            className="w-full border border-sky-200 bg-sky-50 p-2 rounded-2xl text-sm text-foreground"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 block mb-1">
            Corporate Core Anchor Email
          </label>
          <input
            type="text"
            readOnly
            value="john.doe@apexfinance.io"
            className="w-full border border-sky-200 bg-sky-50 p-2 rounded-2xl text-sm text-foreground"
          />
        </div>
      </div>
    </div>
  );
}
