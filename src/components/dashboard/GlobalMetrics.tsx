import React from 'react';
import { TrendingUp, Users, Target, HeartHandshake, Leaf } from 'lucide-react';
import { useOSStore } from '../../store/osStore';
import { TRANSLATIONS } from '../../data/translations';
import { LOCALIZED_METRICS_UI } from '../../data/localizedContent';

export const GlobalMetrics: React.FC = () => {
  const { globalMetrics, language } = useOSStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.EN;
  const gm = LOCALIZED_METRICS_UI[language] || LOCALIZED_METRICS_UI.EN;

  const items = [
    {
      label: t.globalMetrics.activeIntentions,
      value: globalMetrics.activeIntentions.toLocaleString(),
      change: '+12%',
      icon: Target,
      color: 'text-cyan-400',
    },
    {
      label: t.globalMetrics.peopleInSystem,
      value: globalMetrics.peopleInSystem.toLocaleString(),
      change: '+8%',
      icon: Users,
      color: 'text-blue-400',
    },
    {
      label: t.globalMetrics.positiveImpact,
      value: globalMetrics.positiveImpact.toLocaleString(),
      change: '+18%',
      icon: HeartHandshake,
      color: 'text-emerald-400',
    },
    {
      label: t.globalMetrics.co2Saved,
      value: globalMetrics.co2Saved.toLocaleString(),
      change: '+6%',
      icon: Leaf,
      color: 'text-amber-400',
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#08132b]/95 via-[#050e21]/95 to-[#020714]/98 border border-cyan-800/40 p-4 shadow-[0_4px_25px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <div className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3 border-b border-cyan-900/40 pb-1.5 flex items-center justify-between">
        <span>{gm.title}</span>
        <span className="text-[10px] text-emerald-400 font-normal">{gm.realtimeSync}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-700/50 transition-colors flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-slate-400 font-mono truncate">{item.label}</span>
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              </div>

              <div className="flex items-baseline justify-between mt-1">
                <span className="text-base font-extrabold text-white font-mono tracking-tight">
                  {item.value}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="w-2.5 h-2.5" />
                  {item.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
