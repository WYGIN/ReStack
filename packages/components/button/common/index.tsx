import { component$, Slot } from '@builder.io/qwik';
import { CommonButtonContext, CommonButtonProps } from './context';
import { createRipple } from '~/utils/ripple';

export default component$((props: CommonButtonProps) => {
  const prop = Omit<CommonButtonProps, 'type' | 'className'>
  let style = '';
  switch(props.type) {
    case 'elevated':
      style = `${ props.disabled ? 'bg-primary/[0.12] shadow-level-0 text-on-surface/[0.38] fill-on-surface/[0.38]' : 'bg-surface-container-low shadow-shadow shadow-level-1 text-primary fill-primary hover:bg-primary/[0.08] hover:shadow-level-2 hover:text-primary hover:fill-primary focus:bg-primary/[0.12] focus:shadow-level-1 focus:text-primary focus:fill-primary active:bg-primary/[0.12] active:shadow-elevation-1 active:text-primary active:fill-primary' }`
      break;
    case 'outlined':
      break;
    case 'filled':
      break;
    case 'tonal':
      break;
    case 'text':
      break;
  }
  return(
    <button class={`relative overflow-hidden label-large ${className}`} {...prop} onClick$={ (event) => createRipple(event, props.type) }>
      <Slot />
    </button>
  )
});
