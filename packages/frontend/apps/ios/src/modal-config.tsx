import { ModalConfigContext } from '@affine/component';
import { NavigationGestureService } from '@affine/core/mobile/modules/navigation-gesture';
import { useService } from '@toeverything/infra';
import { type PropsWithChildren, useCallback } from 'react';

export const ModalConfigProvider = ({ children }: PropsWithChildren) => {
  const navigationGesture = useService(NavigationGestureService);

  const onOpenChange = useCallback(
    (open: boolean) => {
      const prev = navigationGesture.enabled$.value;
      if (open && !prev) {
        navigationGesture.setEnabled(false);
        return () => {
          navigationGesture.setEnabled(prev);
        };
      }
      return;
    },
    [navigationGesture]
  );

  return (
    <ModalConfigContext.Provider value={{ onOpenChange }}>
      {children}
    </ModalConfigContext.Provider>
  );
};
