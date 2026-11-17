import { readFileSync, appendFileSync, writeFileSync } from 'node:fs';
const report = JSON.parse(readFileSync('lighthouse-report/mobile.report.json', 'utf8'));
const scores = Object.values(report.categories).map((category) => `${category.title}: ${Math.round(category.score * 100)}`);
const metrics = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index'].map((key) => `${report.audits[key].title}: ${report.audits[key].displayValue}`);
const failures = Object.values(report.audits).filter((audit) => audit.score !== null && audit.score < 1 && audit.details?.type !== 'opportunity').map((audit) => `${audit.title}: ${audit.displayValue || audit.score}`);
const summary = `Mobile Lighthouse (${report.lighthouseVersion})\n${scores.join('\n')}\n${metrics.join('\n')}\nDiagnostics:\n${failures.join('\n')}\n`;
console.log(summary);
writeFileSync('lighthouse-report/summary.txt', summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\n\`\`\`text\n${summary}\`\`\`\n`);
