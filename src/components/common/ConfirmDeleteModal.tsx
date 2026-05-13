import React from 'react';

const ConfirmDeleteModal = ({ onConfirm, onCancel, message, cancelLabel, deleteLabel }: { onConfirm: () => void, onCancel: () => void, message: string, cancelLabel: string, deleteLabel: string }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md border-2 border-primary-orange relative">
      <div className="flex flex-col items-center">
        <svg className="w-14 h-14 text-primary-orange mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
        <div className="mb-5 text-lg font-semibold text-primary-orange text-center">{message}</div>
        <div className="flex justify-center gap-4 w-full">
          <button onClick={onCancel} className="px-5 py-2 rounded bg-white border border-primary-orange text-primary-orange font-semibold hover:bg-primary-orange hover:text-white transition-all shadow">{cancelLabel}</button>
          <button onClick={onConfirm} className="px-5 py-2 rounded bg-primary-orange text-white font-semibold hover:bg-orange-600 transition-all shadow flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m2 0v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" />
            </svg>
            {deleteLabel}
          </button>
        </div>
      </div>
      <button onClick={onCancel} className="absolute top-3 right-3 text-primary-orange hover:text-orange-700 text-2xl leading-none">&times;</button>
    </div>
  </div>
);

export default ConfirmDeleteModal; 