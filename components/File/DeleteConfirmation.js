import React from 'react';

function DeleteConfirmation({ isOpen, onCancel, onDelete }) {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`} onClick={onCancel}>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white p-8 rounded shadow-md'>
          <h2 className='text-xl font-semibold mb-4'>Confirm Deletion</h2>
          <p>Are you sure you want to delete ?</p>
          <div className='mt-6 flex justify-end'>
            <button
              className='px-4 py-2 bg-gray-300 rounded mr-2'
              onClick={onCancel}>
              Cancel
            </button>
            <button
              className='px-4 py-2 bg-red-500 text-white rounded'
              onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;