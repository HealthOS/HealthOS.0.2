'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
}

const MarkdownOutput: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose max-w-none dark:prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownOutput;
