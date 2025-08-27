import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './MarkdownRenderer.css';

const MarkdownRenderer = ({ content, className = '' }) => {
  return (
    <div className={`markdown-renderer ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // 제목 스타일링
          h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
          h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
          h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
          h4: ({ children }) => <h4 className="markdown-h4">{children}</h4>,
          
          // 단락 스타일링
          p: ({ children }) => <p className="markdown-p">{children}</p>,
          
          // 목록 스타일링
          ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
          ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
          li: ({ children }) => <li className="markdown-li">{children}</li>,
          
          // 강조 스타일링
          strong: ({ children }) => <strong className="markdown-strong">{children}</strong>,
          em: ({ children }) => <em className="markdown-em">{children}</em>,
          del: ({ children }) => <del className="markdown-del">{children}</del>,
          
          // 인용 스타일링
          blockquote: ({ children }) => (
            <blockquote className="markdown-blockquote">{children}</blockquote>
          ),
          
          // 코드 스타일링
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return <code className="markdown-code-inline">{children}</code>;
            }
            return <code className="markdown-code-block">{children}</code>;
          },
          pre: ({ children }) => <pre className="markdown-pre">{children}</pre>,
          
          // 링크 스타일링
          a: ({ href, children }) => (
            <a href={href} className="markdown-link" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          
          // 구분선
          hr: () => <hr className="markdown-hr" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
