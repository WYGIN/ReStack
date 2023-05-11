import { component$, Slot } from '@builder.io/qwik';
import { ChipProps, ChipContext } from './context';

export default component$((props: ChipProps) => {
  const prop = Omit<props, 'type' | 'className'>
  let style = ''
  let stateStyle = ''
  switch (props.type) {
    case '':
      break;
  }
  return(
    <div class={`relative overflow-hidden ${style} ${props.className}`} {...prop}>
      <div class={stateStyle}>
        <Slot />
      </div>
    </div>
  )
});
