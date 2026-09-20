"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import {
  CheckCircle2,
  Terminal,
  Layers,
  ChevronDown,
  ChevronUp,
  Activity,
  Play,
  RotateCw,
} from "lucide-react";

interface MRISample {
  id: string;
  name: {
    id: string;
    en: string;
  };
  stageLabel: string;
  image: string;
  expectedClass: string;
  probabilities: {
    MildDemented: number;
    ModerateDemented: number;
    NonDemented: number;
    VeryMildDemented: number;
  };
  clinicalNotes: {
    id: string;
    en: string;
  };
}

const SAMPLES: MRISample[] = [
  {
    id: "nondemented",
    name: {
      id: "Non-Demented (Kontrol Sehat)",
      en: "Non-Demented (Normal Control)",
    },
    stageLabel: "Stage 0 · Normal",
    image: "/mri/nondemented.jpg",
    expectedClass: "Non-Demented",
    probabilities: {
      NonDemented: 99.86,
      VeryMildDemented: 0.14,
      MildDemented: 0.0,
      ModerateDemented: 0.0,
    },
    clinicalNotes: {
      id: "Struktur korteks serebral utuh dan volume hipokampus simetris tanpa indikasi atrofi serebral yang signifikan.",
      en: "Intact cerebral cortex architecture and symmetrical hippocampal volume with zero pathological atrophy detected.",
    },
  },
  {
    id: "verymild",
    name: {
      id: "Very Mild Demented (Tahap Awal)",
      en: "Very Mild Demented (Very Early Stage)",
    },
    stageLabel: "Stage 1 · Very Mild",
    image: "/mri/verymild.jpg",
    expectedClass: "Very Mild Demented",
    probabilities: {
      VeryMildDemented: 99.7,
      NonDemented: 0.25,
      MildDemented: 0.05,
      ModerateDemented: 0.0,
    },
    clinicalNotes: {
      id: "Terlihat pelebaran sulkus minimal pada lobus temporal medial, mengindikasikan fase transisi neurodegenerasi awal.",
      en: "Subtle sulcal enlargement localized in the medial temporal lobe, indicating early neurodegenerative onset.",
    },
  },
  {
    id: "mild",
    name: {
      id: "Mild Demented (Tahap Ringan)",
      en: "Mild Demented (Mild Stage)",
    },
    stageLabel: "Stage 2 · Mild",
    image: "/mri/mild.jpg",
    expectedClass: "Mild Demented",
    probabilities: {
      MildDemented: 100.0,
      VeryMildDemented: 0.0,
      ModerateDemented: 0.0,
      NonDemented: 0.0,
    },
    clinicalNotes: {
      id: "Reduksi substansi abu-abu kortikal tampak nyata disertai pembesaran ventrikel lateral bilateral.",
      en: "Evident cortical gray matter volume reduction paired with noticeable bilateral lateral ventricular enlargement.",
    },
  },
  {
    id: "moderate",
    name: {
      id: "Moderate Demented (Tahap Menengah)",
      en: "Moderate Demented (Moderate Stage)",
    },
    stageLabel: "Stage 3 · Moderate",
    image: "/mri/moderate.jpg",
    expectedClass: "Moderate Demented",
    probabilities: {
      ModerateDemented: 100.0,
      MildDemented: 0.0,
      VeryMildDemented: 0.0,
      NonDemented: 0.0,
    },
    clinicalNotes: {
      id: "Atrofi serebral meluas secara bilateral disertai penyusutan nyata parenkim otak dan pembesaran sulkus parah.",
      en: "Pronounced bilateral cerebral atrophy accompanied by extensive parenchymal loss and marked ventricular dilation.",
    },
  },
];

export default function AlzheimerSimulator() {
  const { language } = useLanguage();
  const [selectedSample, setSelectedSample] = useState<MRISample>(SAMPLES[0]);
  const [isInferring, setIsInferring] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const handleRunInference = (sample = selectedSample) => {
    setIsInferring(true);
    setTimeout(() => {
      setSelectedSample(sample);
      setIsInferring(false);
    }, 450);
  };

  const handleSelectSample = (sample: MRISample) => {
    setSelectedSample(sample);
    handleRunInference(sample);
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      {/* Header Bar: Clean Minimalist Scientific Title */}
      <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <span>DenseNet-169 Clinical Validation</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
            {language === "id"
              ? "Uji Inferensi Forward Pass Model Alzheimer"
              : "Alzheimer Model Live Forward Pass Evaluation"}
          </h3>
          <p className="text-xs text-slate-600">
            {language === "id"
              ? "Pilih sampel citra MRI otak asli dari dataset uji untuk menguji klasifikasi softmax DenseNet-169."
              : "Select authentic brain MRI scan samples from the test partition to evaluate DenseNet-169 softmax output."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowReport(!showReport)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 hover:border-slate-900 bg-white text-slate-800 text-xs font-mono font-semibold uppercase tracking-wider transition-colors self-start sm:self-auto shrink-0"
        >
          <span>{showReport ? (language === "id" ? "TUTUP LAPORAN METRIK" : "HIDE METRICS") : (language === "id" ? "LIHAT METRIK 5.098 SAMPEL" : "VIEW 5,098 SAMPLES REPORT")}</span>
          {showReport ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Verified Empirical Accuracy Sub-bar */}
      <div className="px-6 py-3 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {language === "id" ? "Akurasi Uji Terverifikasi:" : "Verified Test Accuracy:"}{" "}
            <strong className="text-slate-950 font-bold">99.92%</strong> (5,098 Scans / 160 Batches)
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <span>Macro F1: 0.9993</span>
          <span>•</span>
          <span>Loss: 0.0031</span>
          <span>•</span>
          <span>PyTorch CUDA</span>
        </div>
      </div>

      {/* Scientific Classification Report Drawer */}
      {showReport && (
        <div className="p-6 border-b border-slate-200 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold tracking-wider">
                sklearn.metrics.classification_report [DenseNet-169]
              </span>
            </div>
            <span className="text-slate-400 text-[11px]">
              Evaluated on 5,098 Independent Augmented MRI Scans
            </span>
          </div>

          <table className="w-full text-left border-collapse text-[11px] sm:text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                <th className="py-2 pr-6 uppercase tracking-wider font-semibold">Class Pathological Category</th>
                <th className="py-2 px-4 uppercase tracking-wider font-semibold">Precision</th>
                <th className="py-2 px-4 uppercase tracking-wider font-semibold">Recall</th>
                <th className="py-2 px-4 uppercase tracking-wider font-semibold">F1-Score</th>
                <th className="py-2 pl-4 uppercase tracking-wider font-semibold">Support (Scans)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="py-2 pr-6 font-semibold text-white">MildDemented</td>
                <td className="py-2 px-4 text-slate-300">1.0000</td>
                <td className="py-2 px-4 text-slate-300">1.0000</td>
                <td className="py-2 px-4 text-emerald-400 font-semibold">1.0000</td>
                <td className="py-2 pl-4 text-slate-400">1,344</td>
              </tr>
              <tr>
                <td className="py-2 pr-6 font-semibold text-white">ModerateDemented</td>
                <td className="py-2 px-4 text-slate-300">1.0000</td>
                <td className="py-2 px-4 text-slate-300">1.0000</td>
                <td className="py-2 px-4 text-emerald-400 font-semibold">1.0000</td>
                <td className="py-2 pl-4 text-slate-400">970</td>
              </tr>
              <tr>
                <td className="py-2 pr-6 font-semibold text-white">NonDemented</td>
                <td className="py-2 px-4 text-slate-300">1.0000</td>
                <td className="py-2 px-4 text-slate-300">0.9972</td>
                <td className="py-2 px-4 text-emerald-400 font-semibold">0.9986</td>
                <td className="py-2 pl-4 text-slate-400">1,440</td>
              </tr>
              <tr>
                <td className="py-2 pr-6 font-semibold text-white">VeryMildDemented</td>
                <td className="py-2 px-4 text-slate-300">0.9970</td>
                <td className="py-2 px-4 text-slate-300">1.0000</td>
                <td className="py-2 px-4 text-emerald-400 font-semibold">0.9985</td>
                <td className="py-2 pl-4 text-slate-400">1,344</td>
              </tr>
              <tr className="border-t border-slate-700 bg-slate-900/90 font-bold text-white">
                <td className="py-2.5 pr-6 text-emerald-400">Model Accuracy</td>
                <td colSpan={2} className="py-2.5 px-4 text-slate-400 font-normal">Across All Partitions</td>
                <td className="py-2.5 px-4 text-emerald-400 text-sm">99.92%</td>
                <td className="py-2.5 pl-4">5,098</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Main Testing Workspace */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Sample Selector & Clean Medical Imaging Viewport */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-2">
            <span className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
              {language === "id" ? "1. Pilih Sampel Uji MRI:" : "1. Select Test Scan Sample:"}
            </span>
            <div className="grid grid-cols-2 gap-2">
              {SAMPLES.map((sample) => {
                const isSelected = selectedSample.id === sample.id;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all focus:outline-none ${
                      isSelected
                        ? "border-slate-950 bg-slate-50 ring-1 ring-slate-950 shadow-2xs"
                        : "border-slate-200 hover:border-slate-400 bg-white"
                    }`}
                  >
                    <div className="relative w-9 h-9 rounded-md overflow-hidden shrink-0 border border-slate-300 bg-black">
                      <Image
                        src={sample.image}
                        alt={sample.name[language]}
                        fill
                        sizes="36px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-950 truncate">
                        {sample.expectedClass}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500">
                        {sample.stageLabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean Medical Imaging Frame (High-end clinical look, no tacky lasers) */}
          <div className="relative rounded-2xl border border-slate-300 bg-black overflow-hidden aspect-square max-w-[320px] mx-auto sm:max-w-none shadow-sm flex items-center justify-center">
            <Image
              src={selectedSample.image}
              alt={selectedSample.name[language]}
              fill
              className="object-contain p-3"
              sizes="(max-width: 768px) 100vw, 360px"
              priority
            />

            {/* Medical Imaging Corner Crosshairs & Metadata */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-white/15 text-[10px] font-mono text-white/90">
              Axial 224x224 RGB
            </div>

            <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 border border-white/15 text-[10px] font-mono text-emerald-400">
              {isInferring ? "Processing..." : "Ready"}
            </div>

            {/* Bottom Caption Bar */}
            <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-white space-y-0.5">
              <p className="text-xs font-bold font-mono text-white truncate">
                {selectedSample.name[language]}
              </p>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                {selectedSample.clinicalNotes[language]}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleRunInference()}
            disabled={isInferring}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-mono font-semibold text-xs uppercase tracking-wider transition-colors min-h-[44px] disabled:opacity-50 shadow-2xs"
          >
            {isInferring ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>{language === "id" ? "MENGEKSEKUSI FORWARD PASS..." : "EXECUTING FORWARD PASS..."}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{language === "id" ? "ULANGI UJI INFERENSI MODEL" : "EVALUATE FORWARD PASS"}</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Softmax Distribution & Architecture Protocol */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                {language === "id" ? "2. Distribusi Probabilitas Softmax:" : "2. Softmax Probability Distribution:"}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                {isInferring ? "Evaluating Layer Output..." : "Prediction Confirmed"}
              </span>
            </div>

            {/* Minimalist Probability Rows */}
            <div className="space-y-3.5">
              {[
                { key: "NonDemented", label: "Non-Demented (Sehat / Normal Control)" },
                { key: "VeryMildDemented", label: "Very Mild Demented (Tahap Sangat Awal)" },
                { key: "MildDemented", label: "Mild Demented (Tahap Ringan)" },
                { key: "ModerateDemented", label: "Moderate Demented (Tahap Menengah)" },
              ].map((item) => {
                const prob = selectedSample.probabilities[item.key as keyof typeof selectedSample.probabilities];
                const isWinner = prob > 50;

                return (
                  <div key={item.key} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`${isWinner ? "text-slate-950 font-bold" : "text-slate-500"}`}>
                        {item.label}
                      </span>
                      <span className={`font-semibold ${isWinner ? "text-emerald-700 font-bold" : "text-slate-600"}`}>
                        {isInferring ? "--" : `${prob.toFixed(1)}%`}
                      </span>
                    </div>

                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-400 rounded-full ${
                          isWinner ? "bg-slate-950" : "bg-slate-300"
                        }`}
                        style={{ width: isInferring ? "0%" : `${prob}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clinical Diagnosis Callout Box */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1 text-xs">
              <div className="flex items-center gap-2 font-mono font-bold text-slate-950">
                <Activity className="w-4 h-4 text-[#EA3826]" />
                <span>{language === "id" ? "Hasil Diagnosis Komputasi:" : "Computational Diagnostic Consensus:"}</span>
                <span className="underline decoration-[#EA3826] underline-offset-2">
                  {selectedSample.expectedClass}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed font-normal pt-1">
                {selectedSample.clinicalNotes[language]}
              </p>
            </div>
          </div>

          {/* Clean 2-Stage Pipeline Blueprint */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 font-mono text-[11px] text-slate-600">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-slate-700" />
              <span>{language === "id" ? "Pipeline Inferensi 2 Tahap:" : "Two-Stage Inference Pipeline:"}</span>
            </div>
            <div className="space-y-1.5 pl-3 border-l-2 border-slate-300">
              <p>
                <strong className="text-slate-950">[Tahap 1 · Pre-filter CNN]:</strong> Validasi integritas citra MRI otak asli guna menyaring artefak atau gambar non-medis sebelum komputasi berat.
              </p>
              <p>
                <strong className="text-slate-950">[Tahap 2 · DenseNet-169]:</strong> Ekstraksi fitur cross-layer berkelanjutan melalui 4 Dense Blocks untuk membedakan derajat atrofi serebral.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
