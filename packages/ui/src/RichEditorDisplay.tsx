import { EditorState } from 'draft-js';
import React from 'react';
const HtmlToReact = require('html-to-react');

interface RichEditorDisplayProps {
  html: string | EditorState;
  className?: string;
}

export const RichEditorDisplay: React.FC<RichEditorDisplayProps> = ({
  html,
  className = '',
}) => {
  const htmlToReactParser = new HtmlToReact.Parser();

  return (
    <div className={`rich_editor_display ${className}`}>
      {htmlToReactParser.parse(html)}
    </div>
  );
};
