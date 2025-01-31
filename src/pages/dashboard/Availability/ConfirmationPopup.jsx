// ConfirmationPopup.js
import PropTypes from "prop-types";

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <p className="mb-4">{message}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);
ConfirmationPopup.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmationPopup;
