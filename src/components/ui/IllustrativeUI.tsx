'use client';

import React from 'react';

interface IllustrativeUIProps {
  type: 'rag-chat' | 'microfrontend-metrics' | 'portfolio-tracking';
}

export const IllustrativeUI: React.FC<IllustrativeUIProps> = ({ type }) => {
  return (
    <div className="relative w-full h-full min-h-80 bg-[#f8f7f5] rounded-2xl border border-neutral-200/80 p-4 flex flex-col justify-between overflow-hidden shadow-sm">
      {/* Label: explicitly marked Illustrative UI as required */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
          Illustrative UI · Grayscale Simulation
        </span>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-200/60 text-neutral-600">
          PROTOTYPE
        </span>
      </div>

      {/* Dynamic Mockup Body based on Project Type */}
      <div className="my-auto py-2">
        {type === 'rag-chat' && (
          <div className="space-y-3 font-mono text-[11px]">
            {/* User prompt box */}
            <div className="flex items-start gap-2 max-w-[85%] ml-auto bg-[#0d0d0d] text-white p-3 rounded-2xl rounded-tr-none">
              <span className="text-neutral-400 text-[10px]">USER</span>
              <p className="text-neutral-100 font-sans text-[12px] leading-snug">
                Summarize the key compliance findings in the uploaded State Street audit document.
              </p>
            </div>

            {/* Ingestion & Vector search indicator */}
            <div className="flex items-center gap-2 py-1 text-[10px] text-neutral-400 justify-center">
              <span className="w-2 h-2 rounded-full border border-neutral-400 border-t-transparent animate-spin" />
              <span>ChromaDB: Retrieved 4 vector chunks (cosine similarity: 0.94)</span>
            </div>

            {/* AI Assistant grounded response */}
            <div className="flex flex-col gap-1.5 max-w-[92%] bg-white border border-neutral-200 p-3.5 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex items-center justify-between text-[10px] text-neutral-500 border-b border-neutral-100 pb-1.5">
                <span className="font-semibold text-neutral-800">ASSISTANT · RAG Pipeline</span>
                <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[9px]">Grounded: 98%</span>
              </div>
              <p className="text-neutral-700 font-sans text-[12px] leading-relaxed">
                Based on page 4 of the audit filing, all microservice endpoints passed OWASP Top 10 automated scans with zero critical vulnerabilities and 100% adherence to WCAG 2.1 AA contrast thresholds.
              </p>
              <div className="flex gap-2 pt-1 text-[10px] text-neutral-400 font-mono">
                <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-600 border border-neutral-200">
                  doc_audit_v2.pdf (p.4)
                </span>
                <span className="px-2 py-0.5 bg-neutral-100 rounded text-neutral-600 border border-neutral-200">
                  confidence: high
                </span>
              </div>
            </div>
          </div>
        )}

        {type === 'microfrontend-metrics' && (
          <div className="space-y-3 font-mono text-[11px]">
            {/* Dashboard header stats */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white p-2.5 rounded-xl border border-neutral-200 shadow-sm text-center">
                <div className="text-[10px] text-neutral-400">BUILD TIME</div>
                <div className="text-[16px] font-bold text-neutral-900 mt-0.5">-35%</div>
                <div className="text-[9px] text-neutral-500">Shared UI Lib</div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-neutral-200 shadow-sm text-center">
                <div className="text-[10px] text-neutral-400">WCAG 2.1</div>
                <div className="text-[16px] font-bold text-neutral-900 mt-0.5">AA PASS</div>
                <div className="text-[9px] text-neutral-500">100% Contrast</div>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-neutral-200 shadow-sm text-center">
                <div className="text-[10px] text-neutral-400">SONARQUBE</div>
                <div className="text-[16px] font-bold text-neutral-900 mt-0.5">GATE A</div>
                <div className="text-[9px] text-neutral-500">0 Vulns</div>
              </div>
            </div>

            {/* Micro-Frontend Federation Visual */}
            <div className="bg-white p-3 rounded-xl border border-neutral-200 shadow-sm space-y-2">
              <div className="text-[10px] font-semibold text-neutral-700 flex justify-between">
                <span>FEDERATED MODULES</span>
                <span className="text-neutral-400">TRUNK-BASED CI/CD</span>
              </div>
              <div className="space-y-1.5 font-sans text-[11px]">
                <div className="flex items-center justify-between p-1.5 rounded bg-neutral-50 border border-neutral-100">
                  <span className="font-mono text-[11px] text-neutral-800">mfe-consumer-analytics</span>
                  <span className="text-[10px] text-neutral-500">React 18 · TypeScript</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-neutral-50 border border-neutral-100">
                  <span className="font-mono text-[11px] text-neutral-800">mfe-design-tokens</span>
                  <span className="text-[10px] text-neutral-500">WCAG 2.1 Accessible</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-neutral-50 border border-neutral-100">
                  <span className="font-mono text-[11px] text-neutral-800">api-gateway-spring</span>
                  <span className="text-[10px] text-neutral-500">Java Spring Boot REST</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === 'portfolio-tracking' && (
          <div className="space-y-3 font-mono text-[11px]">
            {/* Real-time investment portfolio tracker */}
            <div className="bg-white p-3 rounded-xl border border-neutral-200 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                <div className="font-sans font-bold text-neutral-900 text-[13px]">
                  Institutional Asset Tracker
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 font-mono">
                  STATE STREET CORP
                </span>
              </div>

              {/* Performance load reduction banner */}
              <div className="flex items-center justify-between text-[11px] bg-neutral-50 p-2 rounded-lg border border-neutral-100">
                <span className="text-neutral-600 font-sans">Initial Load Optimization</span>
                <span className="font-bold text-neutral-900">-30% latency</span>
              </div>

              {/* Data Rows */}
              <div className="space-y-1 font-mono text-[10.5px]">
                <div className="flex justify-between py-1 border-b border-neutral-100/60 text-neutral-700">
                  <span>EQUITY_MKT_PORTFOLIO_01</span>
                  <span className="font-bold">$428.5M</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-100/60 text-neutral-700">
                  <span>FIXED_INCOME_SEC_04</span>
                  <span className="font-bold">$194.2M</span>
                </div>
                <div className="flex justify-between py-1 text-neutral-700">
                  <span>GLOBAL_LIQUIDITY_FUND</span>
                  <span className="font-bold">$612.0M</span>
                </div>
              </div>
            </div>

            {/* Architecture stack chip */}
            <div className="text-[10px] text-neutral-400 text-center flex justify-center gap-3">
              <span>React Virtual DOM</span>
              <span>•</span>
              <span>Redux Real-time Slices</span>
              <span>•</span>
              <span>Node.js REST</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div className="flex items-center justify-between pt-2 border-t border-neutral-200/60 text-[10px] font-mono text-neutral-400">
        <span>STATUS: 200 OK</span>
        <span>LATENCY: 14ms</span>
      </div>
    </div>
  );
};
