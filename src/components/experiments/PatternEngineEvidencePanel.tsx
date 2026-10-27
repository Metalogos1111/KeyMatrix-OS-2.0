import React from 'react';
import { AlertTriangle, CheckCircle2, Database, FlaskConical, ShieldAlert, ShieldCheck } from 'lucide-react';
import { PATTERN_ENGINE_ACCEPTANCE_SNAPSHOT as snapshot } from '../../data/patternEngineAcceptanceSnapshot';
import { PATTERN_ENGINE_CONFIRMATORY_003 as confirmatory } from '../../data/patternEngineConfirmatory003';
import { PATTERN_ENGINE_HEAVY_TAIL_DIAGNOSTIC_004 as heavyTailDiagnostic } from '../../data/patternEngineDiagnostic004';
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
          <MetricCard label="Null families" value="3 × 1,000" detail="9,000 total hypothesis tests" />
          <MetricCard label="Holm FWER (range)" value="2.20–3.50%" detail="synthetic null families" />
          <MetricCard label="Permutations (v0.1.3)" value={String(snapshot.confirmatoryPermutationsPerTest)} detail="follow-up 003: 999; see below" />
        </div>

        <div className="mt-4 rounded-xl border border-amber-500/25 bg-black/30 p-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <div>
              <div className="text-xs font-bold text-amber-200">Обязательные незакрытые гейты</div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
                Follow-up 003 выполнил 999 перестановок на тест, но один критерий не прошёл: верхняя граница FWER для heavy-tailed = 7.536% при максимуме 7.5%. Внешняя репликация, второй набор и runtime-интеграция не наблюдались.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-rose-500/40 bg-rose-950/15 p-4 space-y-3" data-testid="pattern-engine-confirmatory-003">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-rose-300">Confirmatory-depth follow-up 003 · seed {confirmatory.seed}</div>
            <h3 className="text-sm font-bold text-white">999 перестановок на тест — результат HOLD</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
              {confirmatory.totalHypothesisTests.toLocaleString()} гипотез · {confirmatory.totalPermutationDraws.toLocaleString()} перестановок · независимый векторизованный NumPy RNG для permutation sampling.
              Это follow-up на новом seed, а не внешняя независимая репликация.
            </p>
          </div>
          <div className="rounded-lg border border-rose-500/40 bg-rose-950/50 px-3 py-2 text-xs font-mono font-bold text-rose-200">
            HOLD · {confirmatory.acceptanceChecksPassed}/{confirmatory.acceptanceChecksTotal}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-[11px]">
            <thead className="border-b border-rose-900/50 text-[10px] uppercase text-slate-500">
              <tr>
                <th className="py-2 pr-3">Null distribution</th>
                <th className="py-2 pr-3">Raw FPR</th>
                <th className="py-2 pr-3">Raw CI upper</th>
                <th className="py-2 pr-3">Holm FWER</th>
                <th className="py-2 pr-3">FWER CI upper</th>
              </tr>
            </thead>
            <tbody>
              {confirmatory.nullResults.map((item) => (
                <tr key={item.distribution} className="border-b border-slate-900 text-slate-300">
                  <td className="py-2 pr-3 font-mono">{item.distribution}</td>
                  <td className="py-2 pr-3">{percent(item.rawFpr)}</td>
                  <td className="py-2 pr-3">{percent(item.rawFprWilson95[1])}</td>
                  <td className="py-2 pr-3">{percent(item.familywiseAnyRejectionRate)}</td>
                  <td className={item.distribution === 'heavy_tailed' ? 'py-2 pr-3 font-bold text-rose-300' : 'py-2 pr-3'}>{percent(item.familywiseWilson95[1])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] leading-relaxed text-rose-200">
          Критерий {confirmatory.failedCriterion.id}: {(confirmatory.failedCriterion.observed * 100).toFixed(4)}% превышает неизменённый предел {(confirmatory.failedCriterion.maximum * 100).toFixed(2)}%.
          Порог не смягчался. Необходимо расследование heavy-tailed калибровки и независимое воспроизведение.
        </p>
        <p className="text-[10px] leading-relaxed text-slate-500">
          Plan SHA-256: <span className="font-mono">{confirmatory.planSha256}</span> · Results SHA-256: <span className="font-mono">{confirmatory.resultsSha256}</span>
        </p>
      </section>

      <section className="rounded-2xl border border-amber-500/35 bg-amber-950/10 p-4 space-y-2" data-testid="pattern-engine-heavy-tail-diagnostic-004">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300">Targeted diagnostic 004 · seed {heavyTailDiagnostic.seed}</div>
            <h3 className="text-sm font-bold text-white">Heavy-tailed null: расширенная оценка неопределённости</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-300">
              {heavyTailDiagnostic.families.toLocaleString()} семейств · {heavyTailDiagnostic.permutationsPerTest} перестановок/тест · {heavyTailDiagnostic.totalHypothesisTests.toLocaleString()} тестов.
              Диагностический прогон выбран после результата 003 и не заменяет предыдущую запись.
            </p>
          </div>
          <div className="rounded-lg border border-amber-500/40 bg-amber-950/40 px-3 py-2 text-xs font-mono font-bold text-amber-200">
            FWER {percent(heavyTailDiagnostic.familywiseAnyRejectionRate)}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <MetricCard label="Raw FPR" value={percent(heavyTailDiagnostic.rawFpr)} detail="Wilson 95% CI recorded" />
          <MetricCard label="Holm familywise rate" value={percent(heavyTailDiagnostic.familywiseAnyRejectionRate)} detail="5000-family diagnostic" />
          <MetricCard label="FWER 95% CI upper" value={percent(heavyTailDiagnostic.familywiseWilson95[1])} detail="frozen limit 7.50%" />
        </div>
        <p className="text-[11px] leading-relaxed text-amber-200">
          Диагностический интервал находится ниже замороженного порога, но это не отменяет failed criterion в follow-up 003.
          Общий статус остаётся HOLD до независимой внешней репликации, второго реального набора и наблюдения runtime-интеграции.
        </p>
        <p className="text-[10px] leading-relaxed text-slate-500">
          Plan SHA-256: <span className="font-mono">{heavyTailDiagnostic.planSha256}</span> · Results SHA-256: <span className="font-mono">{heavyTailDiagnostic.resultsSha256}</span>
        </p>
      </section>
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
          <h3 className="text-sm font-bold text-white">Набор данных: источник и provenance</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricCard label="Dataset" value="UCI Wine" detail={snapshot.dataset.rows + ' records · ' + snapshot.dataset.features + ' features'} />
          <MetricCard label="Train / holdout" value={snapshot.dataset.trainRows + ' / ' + snapshot.dataset.holdoutRows} detail="stratified 70/30; seed pinned" />
          <MetricCard label="Holdout transfer" value={percent(snapshot.dataset.holdoutAccuracy)} detail={'majority baseline ' + percent(snapshot.dataset.majorityClassBaseline)} />
          <MetricCard label="Anomaly labels" value="Unavailable" detail="no real-data outlier precision/recall claim" />
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
          Метаданные каталога UCI указывают CC BY 4.0, но лицензия и происхождение именно тестировавшейся копии из локального пакета scikit-learn независимо не подтверждены. Поэтому provenance gate остаётся закрытым. Один набор и один split не являются независимой внешней репликацией.
        </p>
        <a className="mt-2 inline-flex text-xs text-cyan-300 underline decoration-cyan-800 underline-offset-4 hover:text-cyan-200" href={snapshot.dataset.sourceUrl} target="_blank" rel="noreferrer">
          Открыть запись UCI Machine Learning Repository
        </a>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <h3 className="text-sm font-bold text-white">Recorded artifact hash references</h3>
        <dl className="mt-3 grid grid-cols-1 gap-3 text-[10px] md:grid-cols-2">
          <HashValue label="Benchmark ZIP SHA-256" value={snapshot.benchmarkZipSha256} />
          <HashValue label="Results JSON SHA-256" value={snapshot.resultsJsonSha256} />
          <HashValue label="Dataset CSV SHA-256" value={snapshot.dataset.csvSha256} />
          <div>
            <dt className="mb-1 text-slate-500">Hash / runtime / authority boundary</dt>
            <dd className="font-mono text-amber-200">HASH REFERENCES ONLY · NOT_OBSERVED · Authority NONE · Canonical SOT READ_ONLY</dd>
          </div>
        </dl>
        <p className="mt-3 text-[10px] text-slate-500">Displayed SHA-256 values are recorded references. This UI does not recompute source-file hashes.</p>
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
