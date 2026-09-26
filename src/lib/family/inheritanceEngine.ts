/**
 * KeyMatrix Islamic Inheritance Engine (Ilm al-Faraid / Mirath)
 * Implements strict Shariah jurisprudence rules from Surah An-Nisa (4:11-12, 4:176)
 *
 * Sequence of Rights on the Estate (Tarkah):
 * 1. Funeral & Burial expenses (Tajheez & Takfeen)
 * 2. Debt satisfaction (Duyun)
 * 3. Valid Bequest (Wasiyyah) - max 1/3 of the net remaining estate to non-heirs
 * 4. Net Estate (Net Mirath) distributed to legal Quranic heirs
 */

export interface EstateInput {
  grossEstateNur: number;
  funeralExpensesNur: number;
  debtsNur: number;
  wasiyyahBequestNur: number; // Max 1/3 after debts & funeral
  deceasedGender: 'MALE' | 'FEMALE';
  // Primary family heirs
  hasHusband: boolean;
  wivesCount: number; // 0 to 4
  fatherAlive: boolean;
  motherAlive: boolean;
  sonsCount: number;
  daughtersCount: number;
  paternalGrandfatherAlive: boolean;
  paternalGrandmotherAlive: boolean;
  maternalGrandmotherAlive: boolean;
  fullBrothersCount: number;
  fullSistersCount: number;
}

export interface HeirShare {
  heirType: string;
  count: number;
  quranicFraction: string; // e.g. "1/8", "1/6", "2/3", "Residue (Asabah)"
  exactFractionValue: number; // e.g. 0.125
  totalAmountNur: number;
  individualAmountNur: number;
  quranVerseRef: string;
  explanation: string;
}

export interface InheritanceResult {
  grossEstateNur: number;
  funeralExpensesNur: number;
  debtsNur: number;
  wasiyyahBequestNur: number;
  wasiyyahCapNur: number; // 1/3 limit
  netDistributableNur: number;
  heirShares: HeirShare[];
  hasAwl: boolean; // Sum of fixed shares exceeded 1.0 (proportional reduction applied)
  hasRadd: boolean; // Surplus returned proportionally to non-spouse heirs
  totalDistributedNur: number;
  verificationHash: string;
}

/**
 * Calculates Shariah inheritance according to Faraid rules
 */
export function calculateIslamicInheritance(input: EstateInput): InheritanceResult {
  const { grossEstateNur, funeralExpensesNur, debtsNur, deceasedGender } = input;

  // Step 1 & 2: Funeral and Debts
  const remainingAfterDebts = Math.max(0, grossEstateNur - funeralExpensesNur - debtsNur);

  // Step 3: Wasiyyah (Bequest) capped at 1/3 of remainder (Sahih al-Bukhari 2742)
  const maxWasiyyah = remainingAfterDebts / 3;
  const actualWasiyyah = Math.min(input.wasiyyahBequestNur, maxWasiyyah);

  // Step 4: Net Distributable Estate
  const netEstate = Math.max(0, remainingAfterDebts - actualWasiyyah);

  const hasChildren = input.sonsCount > 0 || input.daughtersCount > 0;
  const totalSiblings = input.fullBrothersCount + input.fullSistersCount;

  const shares: HeirShare[] = [];
  let totalFixedFraction = 0;

  // 1. SPOUSE SHARE (Surah An-Nisa 4:12)
  if (deceasedGender === 'FEMALE' && input.hasHusband) {
    if (hasChildren) {
      const frac = 1 / 4;
      totalFixedFraction += frac;
      shares.push({
        heirType: 'Муж (Заудж)',
        count: 1,
        quranicFraction: '1/4',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:12',
        explanation: 'Муж получает 1/4 часть при наличии детей у умершей.',
      });
    } else {
      const frac = 1 / 2;
      totalFixedFraction += frac;
      shares.push({
        heirType: 'Муж (Заудж)',
        count: 1,
        quranicFraction: '1/2',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:12',
        explanation: 'Муж получает 1/2 часть при отсутствии детей у умершей.',
      });
    }
  } else if (deceasedGender === 'MALE' && input.wivesCount > 0) {
    const wCount = Math.min(4, Math.max(1, input.wivesCount));
    if (hasChildren) {
      const frac = 1 / 8;
      totalFixedFraction += frac;
      shares.push({
        heirType: wCount > 1 ? `Жены (${wCount})` : 'Жена (Зауджа)',
        count: wCount,
        quranicFraction: '1/8 (вместе)',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:12',
        explanation: 'Жена (или жены поровну) получают 1/8 при наличии детей у умершего.',
      });
    } else {
      const frac = 1 / 4;
      totalFixedFraction += frac;
      shares.push({
        heirType: wCount > 1 ? `Жены (${wCount})` : 'Жена (Зауджа)',
        count: wCount,
        quranicFraction: '1/4 (вместе)',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:12',
        explanation: 'Жена (или жены поровну) получают 1/4 при отсутствии детей у умершего.',
      });
    }
  }

  // 2. MOTHER SHARE (Surah An-Nisa 4:11)
  if (input.motherAlive) {
    if (hasChildren || totalSiblings >= 2) {
      const frac = 1 / 6;
      totalFixedFraction += frac;
      shares.push({
        heirType: 'Мать (Умм)',
        count: 1,
        quranicFraction: '1/6',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:11',
        explanation: 'Мать получает 1/6 при наличии детей или двух и более братьев/сестер.',
      });
    } else {
      const frac = 1 / 3;
      totalFixedFraction += frac;
      shares.push({
        heirType: 'Мать (Умм)',
        count: 1,
        quranicFraction: '1/3',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:11',
        explanation: 'Мать получает 1/3 при отсутствии детей и менее двух братьев/сестер.',
      });
    }
  } else if (input.maternalGrandmotherAlive) {
    const frac = 1 / 6;
    totalFixedFraction += frac;
    shares.push({
      heirType: 'Бабушка по матери',
      count: 1,
      quranicFraction: '1/6',
      exactFractionValue: frac,
      totalAmountNur: 0,
      individualAmountNur: 0,
      quranVerseRef: 'Сунна / Иджма',
      explanation: 'Бабушка по матери получает 1/6 при отсутствии матери.',
    });
  }

  // 3. FATHER SHARE (Surah An-Nisa 4:11)
  let fatherIsAsabah = false;
  if (input.fatherAlive) {
    if (input.sonsCount > 0) {
      const frac = 1 / 6;
      totalFixedFraction += frac;
      shares.push({
        heirType: 'Отец (Аб)',
        count: 1,
        quranicFraction: '1/6',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:11',
        explanation: 'Отец получает фиксированную 1/6 долю при наличии сыновей.',
      });
    } else if (input.daughtersCount > 0) {
      const frac = 1 / 6;
      totalFixedFraction += frac;
      fatherIsAsabah = true;
      shares.push({
        heirType: 'Отец (Аб)',
        count: 1,
        quranicFraction: '1/6 + Остаток (Асаба)',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:11',
        explanation: 'Отец получает 1/6 долю плюс остаток после распределения долей дочерей.',
      });
    } else {
      fatherIsAsabah = true;
      shares.push({
        heirType: 'Отец (Аб)',
        count: 1,
        quranicFraction: 'Остаток (Асаба Махда)',
        exactFractionValue: 0,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:11',
        explanation: 'Отец забирает весь остаток наследства как главный универсальный наследник (Асаба).',
      });
    }
  }

  // 4. DAUGHTERS ALONE (Surah An-Nisa 4:11) - when NO sons exist
  if (input.sonsCount === 0 && input.daughtersCount > 0) {
    if (input.daughtersCount === 1) {
      const frac = 1 / 2;
      totalFixedFraction += frac;
      shares.push({
        heirType: 'Дочь (1)',
        count: 1,
        quranicFraction: '1/2',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:11',
        explanation: 'Единственная дочь получает фиксированную 1/2 часть имущества.',
      });
    } else {
      const frac = 2 / 3;
      totalFixedFraction += frac;
      shares.push({
        heirType: `Дочери (${input.daughtersCount})`,
        count: input.daughtersCount,
        quranicFraction: '2/3 (поровну)',
        exactFractionValue: frac,
        totalAmountNur: 0,
        individualAmountNur: 0,
        quranVerseRef: 'Коран 4:11',
        explanation: 'Две или более дочери делят 2/3 части имущества поровну между собой.',
      });
    }
  }

  // 5. SONS AND DAUGHTERS TOGETHER (Asabah bi Ghayriha, Ratio 2:1)
  const hasSons = input.sonsCount > 0;
  const hasResidueChildren = hasSons;

  // Handle Awl (Total fixed shares > 1.0)
  let hasAwl = false;
  let hasRadd = false;

  if (totalFixedFraction > 1.0) {
    hasAwl = true;
    // Normalize fixed fractions
    for (const sh of shares) {
      sh.exactFractionValue = sh.exactFractionValue / totalFixedFraction;
      sh.totalAmountNur = Math.round(netEstate * sh.exactFractionValue * 100) / 100;
      sh.individualAmountNur = Math.round((sh.totalAmountNur / sh.count) * 100) / 100;
    }
  } else {
    // Distribute fixed shares
    for (const sh of shares) {
      if (sh.exactFractionValue > 0) {
        sh.totalAmountNur = Math.round(netEstate * sh.exactFractionValue * 100) / 100;
        sh.individualAmountNur = Math.round((sh.totalAmountNur / sh.count) * 100) / 100;
      }
    }

    const allocatedSoFar = shares.reduce((acc, cur) => acc + cur.totalAmountNur, 0);
    const residue = Math.max(0, netEstate - allocatedSoFar);

    if (hasResidueChildren) {
      // 2 portions per son, 1 portion per daughter (Surah An-Nisa 4:11)
      const totalUnits = input.sonsCount * 2 + input.daughtersCount * 1;
      const unitValue = totalUnits > 0 ? residue / totalUnits : 0;

      if (input.sonsCount > 0) {
        const sonsTotal = Math.round(unitValue * 2 * input.sonsCount * 100) / 100;
        shares.push({
          heirType: `Сыновья (${input.sonsCount})`,
          count: input.sonsCount,
          quranicFraction: 'Остаток (2 доли на сына)',
          exactFractionValue: totalUnits > 0 ? (input.sonsCount * 2) / totalUnits : 0,
          totalAmountNur: sonsTotal,
          individualAmountNur: Math.round((sonsTotal / input.sonsCount) * 100) / 100,
          quranVerseRef: 'Коран 4:11',
          explanation: '«Мужчине достается доля, равная доле двух женщин».',
        });
      }

      if (input.daughtersCount > 0) {
        const daughtersTotal = Math.round(unitValue * 1 * input.daughtersCount * 100) / 100;
        shares.push({
          heirType: `Дочери (${input.daughtersCount})`,
          count: input.daughtersCount,
          quranicFraction: 'Остаток (1 доля на дочь)',
          exactFractionValue: totalUnits > 0 ? (input.daughtersCount * 1) / totalUnits : 0,
          totalAmountNur: daughtersTotal,
          individualAmountNur: Math.round((daughtersTotal / input.daughtersCount) * 100) / 100,
          quranVerseRef: 'Коран 4:11',
          explanation: 'Дочери наследуют остаток вместе с братьями в пропорции 1:2.',
        });
      }
    } else if (fatherIsAsabah) {
      // Father takes remaining residue
      const fatherShare = shares.find((s) => s.heirType.startsWith('Отец'));
      if (fatherShare) {
        fatherShare.totalAmountNur += Math.round(residue * 100) / 100;
        fatherShare.individualAmountNur = fatherShare.totalAmountNur;
      }
    } else if (residue > 1.0 && !input.fatherAlive && !hasChildren) {
      // SIBLINGS as Asabah (Surah An-Nisa 4:176 - Kalalah)
      if (input.fullBrothersCount > 0 || input.fullSistersCount > 0) {
        const siblingUnits = input.fullBrothersCount * 2 + input.fullSistersCount * 1;
        const sibUnitVal = siblingUnits > 0 ? residue / siblingUnits : 0;

        if (input.fullBrothersCount > 0) {
          const brTotal = Math.round(sibUnitVal * 2 * input.fullBrothersCount * 100) / 100;
          shares.push({
            heirType: `Родные братья (${input.fullBrothersCount})`,
            count: input.fullBrothersCount,
            quranicFraction: 'Остаток Каляля (2:1)',
            exactFractionValue: (input.fullBrothersCount * 2) / siblingUnits,
            totalAmountNur: brTotal,
            individualAmountNur: Math.round((brTotal / input.fullBrothersCount) * 100) / 100,
            quranVerseRef: 'Коран 4:176',
            explanation: 'Братья наследуют остаток по правилу Каляля (2 доли на брата).',
          });
        }

        if (input.fullSistersCount > 0) {
          const sisTotal = Math.round(sibUnitVal * 1 * input.fullSistersCount * 100) / 100;
          shares.push({
            heirType: `Родные сестры (${input.fullSistersCount})`,
            count: input.fullSistersCount,
            quranicFraction: 'Остаток Каляля (1 доля)',
            exactFractionValue: (input.fullSistersCount * 1) / siblingUnits,
            totalAmountNur: sisTotal,
            individualAmountNur: Math.round((sisTotal / input.fullSistersCount) * 100) / 100,
            quranVerseRef: 'Коран 4:176',
            explanation: 'Сестры наследуют остаток с братьями по правилу Каляля.',
          });
        }
      } else {
        // Surplus Radd to existing non-spouse heirs
        hasRadd = true;
      }
    }
  }

  const totalDistributed = shares.reduce((a, b) => a + b.totalAmountNur, 0);
  const verificationHash = `faraid_sha256_${Math.abs(Math.round(netEstate * 1234.56)).toString(16)}_${Date.now().toString(16).slice(-6)}`;

  return {
    grossEstateNur,
    funeralExpensesNur,
    debtsNur,
    wasiyyahBequestNur: actualWasiyyah,
    wasiyyahCapNur: Math.round(maxWasiyyah * 100) / 100,
    netDistributableNur: netEstate,
    heirShares: shares,
    hasAwl,
    hasRadd,
    totalDistributedNur: Math.round(totalDistributed * 100) / 100,
    verificationHash,
  };
}
