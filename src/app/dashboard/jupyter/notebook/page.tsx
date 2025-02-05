"use client";

import { DashboardLayout } from '@/components/navigation/DashboardLayout';

export default function JupyterNotebookPage() {
  const notebookUrl = "https://jupyter.org/try-jupyter/notebooks/?path=notebooks/Intro.ipynb";

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)]">
        <iframe
          src={notebookUrl}
          className="w-full h-full border-0 rounded-lg shadow-sm"
          allow="clipboard-read; clipboard-write"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </DashboardLayout>
  );
} 