import { type Signal, useSignal, createContextId } from '@builder.io/qwik';

export type ChipProps extends HTMLElement = {
  type: 'assist' | 'filter' | 'input' | 'suggestion' = '';
  className?: string = '';
}

export const ChipContext = createContextId<Signal<ChipProps>>('com.wygin.chips');
