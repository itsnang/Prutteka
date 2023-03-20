import { EditorProps } from 'react-draft-wysiwyg';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import { useEffect, useState } from 'react';
import React from 'react';
import { useField, useFormikContext } from 'formik';
import { useTypeSafeTranslation } from 'shared-utils/hooks';

let htmlToDraft: any = null;
if (typeof window === 'object') {
  htmlToDraft = require('html-to-draftjs').default;
}

const convertHtmlToDraft = (html: string | EditorState) => {
  if (!htmlToDraft || !html) return EditorState.createEmpty();
  else if (typeof html !== 'string') return html;
  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const editorState = EditorState.createWithContent(contentState);
  return editorState;
};

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

interface RichEditorProps {
  name: string;
  label: string;
  className?: string;
  containerClassName?: string;
  placeholder: string;
}

export const RichEditor: React.FC<RichEditorProps> = ({
  name,
  label,
  className = '',
  containerClassName = '',
  placeholder = '',
}) => {
  const [{ value }, meta, { setTouched }] = useField<string>(name);
  const { setFieldValue } = useFormikContext();

  const { t } = useTypeSafeTranslation();

  useEffect(() => {
    setFieldValue(name, convertHtmlToDraft(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditorChange = (e: EditorState) => {
    setTouched(true);
    setFieldValue(name, e);
  };

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      <label className="flex flex-col">
        {label}
        <Editor
          placeholder={placeholder}
          wrapperClassName={`ring-primary cursor-text rounded-2xl border border-gray-200 text-gray-900 focus-within:ring ${className} ${
            label ? 'mt-2' : ''
          }`}
          toolbarStyle={{
            borderRadius: '16px 16px 0 0',
            border: '0',
            borderBottom: '1px',
            marginBottom: '0',
          }}
          editorClassName="px-4 border-t border-gray-200"
          editorStyle={{
            minHeight: '125px',
            background: '#fff',
            borderRadius: '0 0 16px 16px',
          }}
          editorState={
            typeof value !== 'string' ? value : EditorState.createEmpty()
          }
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ['inline', 'list', 'emoji', 'history'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
            list: {
              options: ['ordered', 'unordered'],
            },
          }}
        />
      </label>
      {meta.error && meta.touched && (
        <div className="text-red-600">{t(meta.error as never)}</div>
      )}
    </div>
  );
};
