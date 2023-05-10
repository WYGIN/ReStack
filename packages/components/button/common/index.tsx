import { component$, Slot } from '@builder.io/qwik';
import { CommonButtonContext, CommonButtonProps } from './context';
import { createRipple } from '~/utils/ripple';

export default component$((props: CommonButtonProps) => {
  const prop = Omit<CommonButtonProps, 'type' | 'className'>
  let stateStyle = '';
  let style = '';
  switch(props.type) {
    case 'elevated':
      style = `${ props.disabled ? 'bg-primary/[0.12] shadow-level-0 text-on-surface/[0.38] fill-on-surface/[0.38]' : 'bg-surface-container-low shadow-shadow shadow-level-1 text-primary fill-primary hover:bg-primary/[0.08] hover:shadow-level-2 hover:text-primary hover:fill-primary focus:bg-primary/[0.12] focus:shadow-level-1 focus:text-primary focus:fill-primary active:bg-primary/[0.12] active:shadow-elevation-1 active:text-primary active:fill-primary' }`
      break;
    case 'outlined':
      style = `${ props.disabled ? 'outline-on-surface/[0.12] shadow-level-0 text-on-surface/[0.38] fill-on-surface/[0.38]' : 'bg-surface outline outline-outline shadow-level-0 text-primary fill-primary hover:outline-outline hover:bg-primary/[0.08] hover:text-primary hover:fill-primary focus:bg-primary/[0.12] focus:text-primary focus:fill-primary active:bg-primary[0.12] active:text-primary active:fill-primary' }`;
      break;
    case 'filled':
      style = `${ props.disabled ? 'bg-on-surface/[0.12] shadow-shadow shadow-level-0 text-on-surface/[0.38] fill-on-surface/[0.38] ' : 'bg-primary shadow-shadow shadow-level-0 text-on-primary fill-on-primary hover:bg-on-primary/[0.08] hover:text-on-primary hover:fill-on-primary focus:bg-on-primary/[0.12] focus:shadow-level-0 focus:text-on-primary focus:fill-on-primary active:bg-on-primary/[0.12] active:shadow-level-0 active:text-on-primary active:full-on-primary' }`;
      break;
    case 'tonal':
      style = `${ props.disabled ? 'bg-on-surface/[0.12] text-on-surface/[0.38] fill-on-surface/[0.38]' : 'bg-secondary-container shadow-shadow shadow-level-0 text-on-secondary-container fill-on-secondary hover:bg-on-secondary-container/[0.08] hover:shadow-level-1 hover:text-on-secondary-container hover:fill-on-secondary-container focus:bg-on-secondary-container/[0.12] focus:shadow-level-0 focus:text-on-secondary-container focus:fill-on-secondary-container active:bg-on-secondary-container active:shadow-level-0 active:text-on-secondary-container active:fill-on-secondary-container' }`;
      break;
    case 'text':
      style = `${ props.disabled ? 'text-on-surface/[0.38] fill-on-surface/[0.38]' : 'shadow-shadow shadow-level-0 text-primary fill-primary hover:bg-primary/[0.08] hover:text-primary hover:fill-primary active:bg-primary active:text-primary active:fill-primary ' }`;
      break;
  }
  return(
    <button class={`relative overflow-hidden label-large ${className}`} {...prop} onClick$={ (event) => createRipple(event, props.type) }>
      <Slot />
    </button>
  )
});
