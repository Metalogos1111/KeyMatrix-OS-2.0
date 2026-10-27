import React from 'react';
import { AlertTriangle, CheckCircle2, Database, FlaskConical, ShieldAlert, ShieldCheck } from 'lucide-react';
import { PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT as snapshot } from '../../data/patternEngineAcceptanceSnapshot';
import { evaluatePatternQualityGate } from '../../lib/evidence/patternQualityGate';

const percent = (value: number) => (value * 100).toFixed(2) + '%';

export const PatternEngineEvidencePanel: React.FC = () => {
  const gate = evaluatePatternQualityGate(snapshot);
  const separated = snapshot.clustering.find((item) => item.scenario === 'well_separated');
  const moderate = snapshot.clustering.find((item) => item.scenario === 'moderate_overlap');
  const heavy = snapshot.clustering.find((item) => item.scenario === 'heavy_overlap');

  return (
    <section id="pattern-engine-evidence-panel" className="space-y-4" data-testid="pattern-engine-evidence-panel" aria-labelledby="pattern-engine-title">
      <div className="rounded-2xl border border-amber-500/35 bg-gradient-to-r from-[#151426]/90 via-[#0a1b3a]/80 to-[#040a17]/90 p-5 shadow-xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-cyan-300">
              <FlaskConical className="h-4 w-4" />
              <span>KM-PATTERN-ENGINE-001</span>
              <span>•</span>
              <span>Persisted evidence snapshot</span>
            </div>
            <h2 id="pattern-engine-title" className="text-lg font-bold text-white">
              Pattern Engine — Quality &amp; Generalization Gate
            </h2>
            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-300">
              Статический снимок бенчмарка v{snapshot.candidateVersion}. Это не live-запуск, не поток телеметрии и не доказательство runtime-интеграции.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 self-start rounded-lg border border-amber-500/40 bg-amber-950/40 px-3 py-2 text-xs font-mono font-bold text-amber-200">
            <ShieldAlert className="h-4 w-4" />
            {gate.status === 'HOLD' ? 'HOLD — promotion blocked' : gate.status}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard label="Exploratory checks" value={snapshot.exploratoryAcceptance.checksPassed + '/' + snapshot.exploratoryAcceptance.checksTotal} detail="passed in recorded run" />
          <MetricCard label="Null families" value="3 × 1,000" detail="3,000 total hypothesis tests" />
          <MetricCard label="Holm FWER (range)" value="2.20–3.50%" detail="synthetic null families" />
          <MetricCard label="Confirmatory permutations" value={String(snapshot.confirmatoryPermutationsPerTest)} detail={'required ≥ ' + snapshot.criteria.minConfirmatoryPermutationsPerTest} />
        </div>

        <div className="mt-4 rounded-xl border border-amber-500/25 bg-black/30 p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <div>
              <div className="text-xs font-bold text-amber-200">Обязательные незакрытые гейты</div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                Требуется не менее 999 перестановок на тест, внешняя независимая репликация и второй независимый лицензированный набор. Интеграция с KeyMatrix runtime пока не наблюдалась.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-cyan-900/50 bg-slate-950/70 p-4">
          <div className="mb-3 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-300" />
            <h3 className="text-sm font-bold text-white">Нулевая калибровка и поправка Холма</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-[11px]">
              <thead className="border-b border-slate-800 text-[10px] uppercase text-slate-500">
                <tr>
                  <th className="py-2 pr-3">Distribution</th>
                  <th className="py-2 pr-3">Raw FPR</th>
                  <th className="py-2 pr-3">95% CI upper</th>
                  <th className="py-2 pr-3">Holm FWER</th>
                </tr>
              </thead>
              <tbody>
                {snapshot.nullCalibration.map((item) => (
                  <tr key={item.distribution} className="border-b border-slate-900 text-slate-300">
                    <td className="py-2 pr-3 font-mono">{item.distribution}</td>
                    <td className="py-2 pr-3">{percent(item.rawFpr)}</td>
                    <td className="py-2 pr-3">{percent(item.rawFprWilson95[1])}</td>
                    <td className="py-2 pr-3">{percent(item.familywiseAnyRejectionRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
            99 перестановок дают грубое разрешение Monte Carlo p-value около 0,01; подтверждающий прогон не выполнен.
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-900/50 bg-slate-950/70 p-4">
          <div className="mb-3 flex items-center gap-2">
            <Database className="h-4 w-4 text-cyan-300" />
            <h3 className="text-sm font-bold text-white">Кластеризация — чувствительность к перекрытию</h3>
          </div>
          <ScenarioRow title="Well separated" metric={separated ? percent(separated.purityAtLeast90Rate) : 'n/a'} detail="purity ≥ 0.90; 1,000 повторов" />
          <ScenarioRow title="Moderate overlap" metric={moderate ? percent(moderate.purityAtLeast90Rate) : 'n/a'} detail="purity ≥ 0.90; 1,000 повторов" />
          <ScenarioRow title="Heavy overlap" metric={heavy ? percent(heavy.purityAtLeast90Rate) : 'n/a'} detail="purity ≥ 0.90; 1,000 повторов" />
          <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
            Сходимость не означает высокое качество кластеров. Значения относятся только к выбранным синтетическим смесям.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan-300" />
          <h3 className="text-sm font-bold text-white">Лицензированный реальный набор данных</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricCard label="Dataset" value="UCI Wine" detail={snapshot.dataset.rows + ' records · ' + snapshot.dataset.features + ' features'} />
          <MetricCard label="Train / holdout" value={snapshot.dataset.trainRows + ' / ' + snapshot.dataset.holdoutRows} detail="stratified 70/30; seed pinned" />
          <MetricCard label="Holdout transfer" value={percent(snapshot.dataset.holdoutAccuracy)} detail={'majority baseline ' + percent(snapshot.dataset.majorityClassBaseline)} />
          <MetricCard label="Anomaly labels" value="Unavailable" detail="no real-data outlier precision/recall claim" />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
          Источник и лицензия CC BY 4.0 зафиксированы по метаданным UCI; проверенная копия загружена из локального пакета scikit-learn, а не повторно скачана с UCI. Один набор и один split не являются независимой внешней репликацией.
        </p>
        <a className="mt-2 inline-flex text-xs text-cyan-300 underline decoration-cyan-800 underline-offset-4 hover:text-cyan-200" href={snapshot.dataset.sourceUrl} target="_blank" rel="noreferrer">
          Открыть запись UCI Machine Learning Repository
        </a>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <h3 className="text-sm font-bold text-white">Evidence provenance</h3>
        <dl className="mt-3 grid grid-cols-1 gap-3 text-[10px] md:grid-cols-2">
          <HashValue label="Benchmark ZIP SHA-256" value={snapshot.benchmarkZipSha256} />
          <HashValue label="Results JSON SHA-256" value={snapshot.resultsJsonSha256} />
          <HashValue label="Dataset CSV SHA-256" value={snapshot.dataset.csvSha256} />
          <div>
            <dt className="mb-1 text-slate-500">Runtime / authority boundary</dt>
            <dd className="font-mono text-amber-200">NOT_OBSERVED · Authority NONE · Canonical SOT READ_ONLY</dd>
          </div>
        </dl>
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-slate-800 bg-black/30 p-3 text-[11px] text-slate-300">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
          <p>
            Локальные исследовательские проверки записаны как пройденные, но статус остаётся HOLD до подтверждающего анализа мощности и независимой репликации. Панель читает закреплённый снимок и не повышает уровень доказательств.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-black/20 p-3 text-[10px] font-mono text-slate-500">
        Snapshot ID: {snapshot.benchmarkId} · Candidate: {snapshot.candidateVersion} · Status: {gate.status} · Promotion: blocked
      </div>
    </section>
  );
};

const MetricCard: React.FC<{ label: string; value: string; detail: string }> = ({ label, value, detail }) => (
  <div className="rounded-xl border border-slate-800 bg-black/25 p-3">
    <div className="text-[9px] font-mono uppercase tracking-wide text-slate-500">{label}</div>
    <div className="mt-1 break-words text-lg font-bold text-white">{value}</div>
    <div className="mt-1 text-[10px] leading-relaxed text-slate-400">{detail}</div>
  </div>
);

const ScenarioRow: React.FC<{ title: string; metric: string; detail: string }> = ({ title, metric, detail }) => (
  <div className="flex items-center justify-between gap-3 border-b border-slate-900 py-2 last:border-b-0">
    <div>
      <div className="text-xs font-semibold text-slate-200">{title}</div>
      <div className="text-[10px] text-slate-500">{detail}</div>
    </div>
    <div className="font-mono text-sm font-bold text-cyan-200">{metric}</div>
  </div>
);

const HashValue: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="min-w-0">
    <dt className="mb-1 text-slate-500">{label}</dt>
    <dd className="break-all font-mono text-slate-300">{value}</dd>
  </div>
);
