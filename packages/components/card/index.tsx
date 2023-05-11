import { component$, Slot } from '@builder.io/qwik';
import { CardProps, CardContext } from '../context';

export default component$((props: CardProps) => {
  let style = '';
  let stateStyle = '';
  switch(props.type) {
    case 'elevated':
      style = `${props.disabled? 'bg-surface-variant/[0.38] shadow-level-0' : 'bg-surface-container-low shadow-shadow shadow-level-1'}`
      stateStyle = `${props.disabled? '': 'hover:shadow-level-2 hover:bg-on-surface/[0.08] focus:bg-on-surface/[0.12] focus:shadow-level-1'`
      break;
    case 'filled':
      style = props.disabled ? 'bg-surface/[0.38] shadow-shadow shadow-level-1' : 'bg-surface-container-highest shadow-shadow shadow-level-0 hover:shadow-level-1 focus:shadow-level-0 active:shadow-level-0'
      stateStyle = props.disabled? '': 'hover:bg-on-surface/[0.08] focus:bg-on-surface/[0.12] active:bg-on-surface/[0.12]'
      break;
    case 'outlined':
      style = props.disabled? 'outline outline-outline/[0.12]': 'bg-surface shadow-shadow shadow-level-0 outline outline-outline hover:outline-outline focus:outline-on-surface active:outline-outline';
      stateStyle = props.disabled? '': 'hover:bg-on-surface/[0.08] focus:bg-on-surface/[0.12] active:bg-on-surface/[0.12]';
      break;
  }
  return(
    <div class={`relative overflow-hidden rounded-lg px-4  ${style} ${props.className}`}>
      <div class={stateStyle}>
        <Slot />
      </div>
    </div>
  )
});
