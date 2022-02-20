import { useState, useCallback, useMemo, useEffect } from 'react';

export type Label = {
  color: string;
  name: string;
  invisible?: boolean;
};

export default () => {
  const callbacks: ((label: Label) => void)[] = useMemo(() => [], []);
  const [seletedLabel, setSelectedLabel] = useState<Label>();
  const onLabelChange = (fun: (label: Label) => void) => callbacks.push(fun);
  const selectLabel = useCallback(
    (label) => {
      callbacks.forEach((fun) => {
        fun(label);
      });
      setSelectedLabel(label);
    },
    [callbacks],
  );
  const [activeObjectId, setActiveObjectId] = useState<string | undefined>();

  // Initalize labels
  useEffect(() => {}, []);

  return { seletedLabel, onLabelChange, selectLabel, activeObjectId, setActiveObjectId };
};
