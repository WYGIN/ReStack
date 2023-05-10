import { type Signal, useSignal, createContextId } from '@builder.io/qwik';

export const CardProps extends HTMLElement = {
  type: 'elevated' | 'filled' | 'outlined' = 'elevated';
  className: string = '';
}

export const CardContext = createContextId<Signal<CardProps>>('com.wygin.card');
