import * as XLSX from 'xlsx';
import { TenderProject } from '../types';
import { calculateOptionMetrics } from './calculations';

export function exportTenderToExcel(project: TenderProject) {
  const wb = XLSX.utils.book_new();

  // 1. Executive Summary Sheet
  const summaryAoa: (string | number)[][] = [
    ['TENDERTAB V2.0 — EXECUTIVE TENDER EVALUATION & BENCHMARKING'],
    ['Scope Reference:', project.refCode],
    ['Project Title:', project.title],
    ['Evaluation Baseline:', `${project.targetVolume.toLocaleString()} monthly pages (80% B&W, 20% Color)`],
    ['Fleet Size:', `${project.fleetSize} Units HQ`],
    ['Currency:', project.currency],
    ['Exported Date:', new Date().toLocaleString()],
    [],
    ['--- EXECUTIVE COMPARISON MATRIX ---'],
  ];

  // Table Header
  const headerRow: (string | number)[] = ['Evaluation Criteria / Metric'];
  project.options.forEach(opt => {
    const typeLabel = opt.category === 'BRAND_NEW' ? 'Brand New' : 'Refurbished';
    headerRow.push(`${opt.vendor} [${typeLabel}] - ${opt.model}`);
  });
  summaryAoa.push(headerRow);

  // Criteria Rows
  const addRow = (label: string, valueFn: (opt: any) => string | number) => {
    const row: (string | number)[] = [label];
    project.options.forEach(opt => {
      row.push(valueFn(opt));
    });
    summaryAoa.push(row);
  };

  addRow('1. Machine Condition', o => o.category === 'BRAND_NEW' ? 'Brand New' : 'Cert. Refurbished');
  addRow('2. Proposed Hardware Model', o => o.model);
  addRow('3. Print & Copy Speed (A4)', o => `${o.speed} ppm`);
  addRow('4. Monthly Base Rental (' + project.currency + ')', o => o.monthlyRental);
  addRow('5. B&W Click Rate (' + project.currency + ')', o => o.bwClick);
  addRow('6. Color Click Rate (' + project.currency + ')', o => o.colorClick);
  addRow('7. Monthly Click Bill (20k B&W + 5k Color)', o => {
    const m = calculateOptionMetrics(o, project);
    return Math.round(m.monthlyClickBill * 100) / 100;
  });
  addRow('8. Total Est. Monthly TCO (Rental + Clicks)', o => {
    const m = calculateOptionMetrics(o, project);
    return Math.round(m.totalMonthlyTCO * 100) / 100;
  });
  addRow('9. 3-Year Contract Outlay (36 Months)', o => {
    const m = calculateOptionMetrics(o, project);
    return m.threeYearOutlay;
  });
  addRow('10. Toner & Parts Inclusions', o => o.tonerInclusion);

  summaryAoa.push([]);
  summaryAoa.push(['--- SLA & RISK MATRIX ---']);

  const slaHeader: (string | number)[] = ['SLA & Support Dimension'];
  project.options.forEach(opt => {
    slaHeader.push(`${opt.vendor} (${opt.model})`);
  });
  summaryAoa.push(slaHeader);

  addRow('On-Site Response Time', o => o.slaResponseTime);
  addRow('Uptime Commitment (%)', o => `${o.uptimeCommitment}%`);
  addRow('Backup / Loaner Machine Policy', o => o.backupPolicy);
  addRow('Default / Downtime Penalty', o => o.downtimePenalty);
  addRow('Vendor Stability Rating', o => o.vendorRating);
  addRow('SLA Commitment Details', o => o.sla);

  const ws = XLSX.utils.aoa_to_sheet(summaryAoa);

  // Set column widths
  const colWidths = [{ wch: 36 }];
  project.options.forEach(() => colWidths.push({ wch: 28 }));
  ws['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, 'Executive Matrix');

  const filename = `TenderTab_${project.refCode.replace(/[^a-zA-Z0-9_-]/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, filename);
}
