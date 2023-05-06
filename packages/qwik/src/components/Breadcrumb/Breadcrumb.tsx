import { component$ } from '@builder.io/qwik';

type breadcrumbProps = {
    props: {
        label: string;
        href: string;
    }[]
}

export default component$(({ props }: breadcrumbProps) => {
    return (
        <nav class="flex items-center justify-between bg-surface" aria-label="Breadcrumb">
  <button class="bg-surface rounded-none">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
  </button>
  <ol class="inline-flex items-center space-x-1 md:space-x-3 overflow-x-auto grow">
    <li class="inline-flex items-center">
      <a href="#" class="inline-flex items-center text-sm font-medium text-on-surface hover:text-on-surface-variant">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        wygin
      </a>
    </li>
    {
      props.map((item, index) => {
        if(index !== props.length - 1)
          return (
            <li key={index}>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <a href={item.href} class="ml-1 text-sm font-medium text-on-surface md:ml-2 hover:text-on-surface-variant">{item.label}</a>
              </div>
            </li>
          )
        else
          return (
            <li aria-current="page" key={index}>
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <span class="ml-1 text-sm font-medium text-on-surface-variant md:ml-2">{item.label}</span>
              </div>
            </li>
          )
      })
    }
  </ol>
  <button class="bg-white rounded-none">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
    </svg>
  </button>
</nav>
    )
})