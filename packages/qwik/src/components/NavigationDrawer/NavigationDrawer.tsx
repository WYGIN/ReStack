import { component$ } from "@builder.io/qwik";

type Props = {
    heading?: string;
    subHeading?: string;
    items: Array<{
        icon?: string;
        label: string;
        badge?: number;
    }>
}

export default component$(({ heading, subHeading, items }: Props) => {
    return (
        <nav class="shadow-level1 rounded-r-large md:shadow-level0 md:surface box-border flex h-screen w-[360px] flex-col items-start bg-surface-container-low p-4">
  <div title="heading" class="box-border flex w-[336px] flex-col items-start justify-center gap-[10px] p-2 pl-4">
    <p class="title-small box-border flex h-[20px] w-[312px] items-center">{heading}</p>
  </div>
  <div title="sub-heading" class="box-border flex h-[56px] w-[336px] items-center rounded-full px-4 py-[18px]">
    <div class="flex h-[20px] w-[98px] items-center gap-[12px]">
      <p class="title-small h-[20px] w-[98px] text-on-surface-variant">{subHeading}</p>
    </div>
  </div>
  <ul class="">
    {
        items.map(item => (
          <li class="flex h-[56px] w-[336px] items-center rounded-[100px] active:bg-secondary-container">
            <div class="flex h-[56px] w-[336px] items-center p-4 pr-6">
              <button class="flex h-[56px] items-center px-4 pr-6">
                {item.icon}
              </button>
              <p class="label-large h-[20px] w-[216px] text-on-secondary-container">{item.label}</p>
              <p title="badge" class="label-large h-5 w-8 text-on-secondary-container text-right">{item.badge}</p>
            </div>
          </li>
        ))
    }
  </ul>
</nav>
       
    )
});