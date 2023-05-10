import { type Signal, useSignal, createContextId } from '@builder.io/qwik';

export type CommonButtonProps extends HTMLButtonElement = {
  type: 'elevated' | 'filled' | 'tonal' | 'outlined' | 'text' = 'tonal';
}

export const CommonButtonContext = createContextId<Signal<CommonButtonProps>>('com.wygin.button.common');
