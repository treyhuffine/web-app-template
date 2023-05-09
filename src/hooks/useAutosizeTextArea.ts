import { useEffect, useRef } from 'react';

/**
 * @see https://stackoverflow.com/a/25621277
 * @todo Do we need have a resize for the screen?
 */
export const useAutosizeTextArea = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | undefined>(undefined);

  const current = !!textAreaRef && textAreaRef.current;
  const value = !!current && current.value;

  useEffect(() => {
    if (!!current) {
      current.style.height = '0px';
      const scrollHeight = current.scrollHeight;

      current.style.height = scrollHeight + 'px';
    }
  }, [current, value]);

  return { textAreaRef };
};
