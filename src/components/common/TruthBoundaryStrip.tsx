import React, { useState } from 'react';
import { ShieldAlert, Info, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useOSStore } from '../../store/osStore';

export const TruthBoundaryStrip: React.FC = () => {
  const { language } = useOSStore();
  const [expanded, setExpanded] = useState(false);

  const isRtl = language === 'AR' || language === 'FA' || language === 'UR';

  const labels = {
    EN: {
      title: 'FRONTEND REFERENCE PROTOTYPE & EVIDENCE BOUNDARY',
      sub: 'All state transitions, NUR rewards, and AI operations are local sandbox simulations. No live financial settlement or institutional authority.',
      detailsTitle: 'Canonical System Boundary Disclaimers',
      d1: 'M03 Identity & Authority: Locally observed interface, not institutional production credential.',
      d2: 'Seven Core Domains: PrimeCore operates local double-entry ledger; remaining 6 core domains are design-level specs.',
      d3: 'NUR Ledger: Sandbox unit demonstration, not live money or market liquidity.',
      d4: 'PoR Math: Open research gap (MATH-001) in canonical normalization.',
      hide: 'Hide Details',
      show: 'Boundary & Details',
    },
    RU: {
      title: 'ЭТАЛОННЫЙ ФРОНТЕНД-ПРОТОТИП И ГРАНИЦЫ ДОКАЗАТЕЛЬСТВ',
      sub: 'Все состояния, награды NUR и AI-операции являются локальной песочницей. Отсутствует институциональный авторитет и реальные финансовые расчеты.',
      detailsTitle: 'Ограничения и статус системы',
      d1: 'M03 Идентификация и авторитет: Локально наблюдаемый интерфейс, а не институциональное удостоверение.',
      d2: 'Семь Ядер: PrimeCore имеет локальную среду учета; остальные 6 ядер — концептуальные спецификации.',
      d3: 'NUR Ledger: Демонстрация симулятора, а не реальные финансовые средства.',
      d4: 'Математика PoR: Открытый исследовательский пробел (MATH-001) в канонической нормализации.',
      hide: 'Скрыть детали',
      show: 'Границы и детали',
    },
    AZ: {
      title: 'ETALON FRONEND PROTOTİPİ VƏ SÜBUTA ƏSASLANAN SƏRHƏD',
      sub: 'Bütün vəziyyətlər, NUR mükafatları və AI əməliyyatları lokal sandbox simulyasiyasıdır.',
      detailsTitle: 'Sistem məhdudiyyətləri',
      d1: 'M03 İdentifikasiya: Lokal interfeysdir, canlı institut səlahiyyəti deyil.',
      d2: 'Yeddi Nüvə: PrimeCore lokal dual-balansa malikdir; digər 6 nüvə dizayn səviyyəsindədir.',
      d3: 'NUR Hesab: Canlı pul deyil, simulyasiya vahidləridir.',
      d4: 'PoR Riyaziyyatı: Normalizasiyada açıq tədqiqat boşluğu (MATH-001).',
      hide: 'Təfərrüatları gizlət',
      show: 'Sərhədlər və təfərrüatlar',
    },
    TR: {
      title: 'ÖRNEK ÖN YÜZ PROTO TİPİ VE KANIT SINIRI',
      sub: 'Tüm durumlar, NUR ödülleri ve AI işlemleri yerel korumalı alan simülasyonlarıdır.',
      detailsTitle: 'Sistem Sınırları',
      d1: 'M03 Kimlik: Yerel gözlemlenen arayüz, kurumsal üretim yetkisi değildir.',
      d2: 'Yedi Çekirdek: PrimeCore yerel defter çalıştırır; diğer 6 çekirdek tasarım düzeyindedir.',
      d3: 'NUR Defteri: Canlı para değil, simülasyon birimleridir.',
      d4: 'PoR Matematiği: Normalleştirmede açık araştırma boşluğu.',
      hide: 'Detayları Gizle',
      show: 'Sınırlar ve Detaylar',
    },
    AR: {
      title: 'النموذج الأولي للواجهة الأمامية وحدود الأدلة',
      sub: 'جميع الحالات ومكافآت NUR وعمليات الذكاء الاصطناعي هي عمليات محاكاة محلية.',
      detailsTitle: 'قيود النظام والحدود',
      d1: 'الهوية والسلطة M03: واجهة تمت ملاحظتها محليًا وليس نصًا إثباتيًا.',
      d2: 'النوى السبعة: يعمل PrimeCore كدفتر أستاذ محلي؛ النوى الستة المتبقية في مستوى التصميم.',
      d3: 'دفتر أستاذ NUR: وحدات محاكاة وليست أموالاً حقيقية.',
      d4: 'رياضيات PoR: فجوة بحثية مفتوحة في التطبيع القانوني.',
      hide: 'إخفاء التفاصيل',
      show: 'الحدود والتفاصيل',
    },
    FA: {
      title: 'نمونه اولیه فرانت‌اند و مرز اثبات',
      sub: 'تمام حالات، پاداش‌های NUR و عملیات هوش مصنوعی شبیه‌سازی محلی هستند.',
      detailsTitle: 'مرزهای سیستم',
      d1: 'هویت M03: رابط مشاهده شده محلی، نه اعتبار نهادی.',
      d2: 'هفت هسته: PrimeCore دفترچه محلی است؛ ۶ هسته دیگر در سطح طراحی هستند.',
      d3: 'دفترچه NUR: واحدهای شبیه‌سازی، نه پول واقعی.',
      d4: 'ریاضیات PoR: شکاف پژوهشی باز در نرمال‌سازی.',
      hide: 'پنهان کردن جزئیات',
      show: 'مرزها و جزئیات',
    },
    UR: {
      title: 'فرنٹ اینڈ ریفرینس پروٹو ٹائپ اور ثبوت کی حد',
      sub: 'تمام ریاستیں، NUR انعامات اور AI آپریشنز مقامی ریت کے بکس کے نقوش ہیں۔',
      detailsTitle: 'سسٹم کی حدود',
      d1: 'M03 شناخت: مقامی طور پر مشاہدہ شدہ انٹرفیس، پروڈکشن کی سند نہیں۔',
      d2: 'سات کور: PrimeCore مقامی لیجر چلاتا ہے؛ باقی 6 کور ڈیزائن کی سطح پر ہیں۔',
      d3: 'NUR لیجر: سمیولیشن یونٹس، واقعی رقم نہیں۔',
      d4: 'PoR ریاضی: نارملائزیشن میں کھلا ریسرچ گیپ۔',
      hide: 'تفصیلات چھپائیں',
      show: 'حدود اور تفصیلات',
    },
  };

  const t = labels[language as keyof typeof labels] || labels.EN;

  return (
    <div
      className={`bg-slate-950/90 border-b border-amber-500/30 text-slate-300 px-4 py-2 text-xs font-mono transition-all ${
        isRtl ? 'rtl' : 'ltr'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="font-bold text-amber-300 uppercase tracking-wider">{t.title}</span>
            <span className="hidden sm:inline text-slate-400 text-[11px] ml-2">— {t.sub}</span>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-bold focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded px-1"
          aria-expanded={expanded}
          aria-label="Toggle System Disclaimers Details"
        >
          <span>{expanded ? (t as any).hide || 'Hide Details' : (t as any).show || 'Boundary Details'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-400 animate-fade-in">
          <div className="flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>{t.d1}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>{t.d2}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>{t.d3}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>{t.d4}</span>
          </div>
        </div>
      )}
    </div>
  );
};
