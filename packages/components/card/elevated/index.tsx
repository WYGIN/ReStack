import { component$, Slot } from '@builder.io/qwik';
import { CardProps, CardContext } from '../context';

export default component$((props: CardProps) => {
  let style = '';
  let stateStyle = '';
  switch(props.type) {
    case 'elevated':
      style = `${props.disabled? 'bg-surface-variant/[0.38] shadow-level-0' : 'bg-surface-container-low shadow-shadow shadow-level-1'}`
      stateStyle = `${props.disabled? '': 'hover: shadow-level-2 hover:bg-on-surface/[0.08] focus:bg-on-surface/[0.12] focus:shadow-level-1'`
      break;
    case 'filled':
      break;
    case 'outlined':
      break;
  }
  return(
    <div class={`relative overflow-hidden ${style} ${props.className}`}>
      <div class={stateStyle}>
        <Slot />
      </div>
    </div>
  )
});
