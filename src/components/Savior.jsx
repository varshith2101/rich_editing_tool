import { useState } from 'react';
import Tiptap from '../rich_editor/Tiptap';

const Savior = () => {
  const [content, setContent] = useState('<p>Delete this before writing...</p>');
  const [generatedHtml, setGeneratedHtml] = useState('');

  const handleGenerateHtml = () => {
    setGeneratedHtml(content);
  };

  const downloadHtml = () => {
    if (!generatedHtml) return;
    
    const blob = new Blob([generatedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-content.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="editor-page-container p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Rich Text Editor</h1>
      
      <div className="editor-layout flex flex-col lg:flex-row gap-6">
        {/* Editor Panel */}
        <div className="editor-panel flex-1 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md">
          <Tiptap content={content} setContent={setContent} />
        </div>
        
        {/* Output Panel */}
        <div className="output-panel flex-1 flex flex-col">
          
          
          <div className="output-content flex-1 border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 overflow-auto">
            {generatedHtml ? (
              <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{generatedHtml}</pre>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Generated HTML will appear here</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleGenerateHtml}
          className="generate-button px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition-colors"
        >
          Generate HTML
        </button>
      </div>
      <div className="output-header flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Generated HTML</h2>
            <button
              onClick={downloadHtml}
              disabled={!generatedHtml}
              className={`px-4 py-2 rounded-md ${generatedHtml ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed text-gray-500 dark:text-gray-400'}`}
            >
              Download HTML
            </button>
          </div>
    </div>
    
  );
};

export default Savior;