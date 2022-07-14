import React, { memo } from 'react';
import SimpleMDE from 'react-simplemde-editor';

function Editor({ styles, value, onChange, options }) {
  return (
    <SimpleMDE id="editor" className={styles} value={value} onChange={onChange} options={options} />
  );
}

export default memo(Editor);
