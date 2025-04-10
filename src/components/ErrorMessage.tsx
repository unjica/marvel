import React from 'react';

interface ErrorMessageProps {
  error: Error;
  onRetry?: () => void;
  onReload?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry, onReload }) => {
  const getErrorMessage = (error: Error) => {
    if (error.message.includes('Invalid API credentials')) {
      return 'Invalid API credentials. Please check your API keys.';
    } else if (error.message.includes('Too many requests')) {
      return 'Too many requests. Please try again later.';
    } else if (error.message.includes('No comics found')) {
      return 'No comics found for the selected format.';
    }
    return 'Failed to fetch comics. Please try again later.';
  };

  return (
    <div 
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" 
      role="alert"
    >
      <div className="flex flex-col gap-4">
        <div>
          <b>Error!</b>
          <span className="block sm:inline"> {getErrorMessage(error)}</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn"
              aria-label="Retry loading comics"
            >
              Retry
            </button>
          )}
          {onReload && (
            <button
              onClick={onReload}
              className="btn !bg-gray-500 hover:!bg-gray-400"
              aria-label="Reload page"
            >
              Reload Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage; 