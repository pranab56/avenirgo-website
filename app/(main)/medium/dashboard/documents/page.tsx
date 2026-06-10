'use client';

import { FileText, MoreVertical, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

type DocStatus = 'Approved' | 'Under Review' | 'Rejected';

type Doc = {
  id: string;
  name: string;
  type: string;
  size: string;
  uploaded: string;
  status: DocStatus;
};

const INITIAL: Doc[] = [
  { id: '1', name: 'Service Agreement',       type: 'Contract',      size: '245 KB',  uploaded: '2026-01-15', status: 'Approved' },
  { id: '2', name: 'Tax Form W-9',             type: 'Tax Document',  size: '128 KB',  uploaded: '2026-01-15', status: 'Approved' },
  { id: '3', name: 'Professional Certificate', type: 'Certification', size: '892 KB',  uploaded: '2026-02-01', status: 'Under Review' },
  { id: '4', name: 'Identity Verification',    type: 'ID Document',   size: '1.2 MB',  uploaded: '2026-01-10', status: 'Approved' },
];

const STATUS_STYLES: Record<DocStatus, string> = {
  'Approved':     'bg-green-100 text-green-700',
  'Under Review': 'bg-yellow-100 text-yellow-700',
  'Rejected':     'bg-red-100 text-red-500',
};

function MenuButton({ onDelete }: { onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <MoreVertical size={16} className="text-gray-400" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-9 z-20 bg-white border border-gray-100 rounded-lg shadow-lg py-1 w-36 text-sm">
            <button
              onClick={() => { toast.success('Downloaded'); setOpen(false); }}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 cursor-pointer"
            >
              Download
            </button>
            <button
              onClick={() => { onDelete(); setOpen(false); }}
              className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-500 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function DocumentsPage() {
  const [docs, setDocs] = useState(INITIAL);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKB = file.size / 1024;
    const sizeLabel = sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.round(sizeKB)} KB`;
    const today = new Date().toISOString().split('T')[0];
    setDocs(p => [...p, {
      id: Date.now().toString(),
      name: file.name.replace(/\.[^/.]+$/, ''),
      type: 'Document',
      size: sizeLabel,
      uploaded: today,
      status: 'Under Review',
    }]);
    toast.success('Document uploaded');
    e.target.value = '';
  };

  const deleteDoc = (id: string) => {
    setDocs(p => p.filter(d => d.id !== id));
    toast.success('Document deleted');
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-violet-600 rounded-lg px-6 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-xl">Upload Documents</h2>
          <p className="text-white/75 text-sm mt-1">Keep your documents up to date for verification</p>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-violet-700 hover:bg-violet-50 font-semibold text-sm rounded-lg cursor-pointer transition-colors active:scale-[0.98] shadow-sm"
        >
          <Plus size={16} />
          Upload Document
        </button>
        <input ref={fileRef} type="file" className="hidden" onChange={handleUpload} />
      </div>

      {/* Documents list */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-2">
        <h2 className="font-bold text-xl text-[#1A1A1A] mb-4">My Documents</h2>

        {docs.length === 0 ? (
          <p className="text-sm text-gray-400 py-6 text-center">No documents uploaded yet</p>
        ) : (
          <div className="divide-y divide-gray-100">
            {docs.map(doc => (
              <div key={doc.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div className="w-11 h-11 rounded-xl bg-violet-100 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-violet-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#1A1A1A]">{doc.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {doc.type} • {doc.size} • Uploaded {doc.uploaded}
                  </p>
                </div>

                <span className={`px-3 py-1 text-xs font-semibold rounded-md shrink-0 ${STATUS_STYLES[doc.status]}`}>
                  {doc.status}
                </span>

                <MenuButton onDelete={() => deleteDoc(doc.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
