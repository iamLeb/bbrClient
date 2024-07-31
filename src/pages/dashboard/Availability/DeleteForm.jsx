import React from 'react';
import { X } from 'lucide-react';

const DeleteForm = ({ isOpen, onClose, onConfirm, itemToDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            Confirm Delete
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <p className="mb-4">
          Are you sure you want to delete this {itemToDelete.type}? This action cannot be undone.
        </p>
        
        {itemToDelete.type === 'availability' && (
          <p className="mb-4 text-red-600">
            Warning: Deleting this availability will also delete all associated bookings.
          </p>
        )}
        
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(itemToDelete);
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteForm;