import { component$ } from "@builder.io/qwik";

type Props = {
  title: string;
}

export default component$(({title} : Props) => {
  return (
    <div class="title-large box-border flex h-16 items-center justify-between bg-surface fill-on-surface-variant px-6 py-3 text-on-surface">
  <div class="box-border flex items-center">
    <button class="box-border rounded-full p-1 hover:outline hover:outline-[0.5px] hover:outline-shadow">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
    </button>
    <p class="ml-3">{title}</p>
  </div>
  <div class="flex items-center">
    <button class="box-border rounded-full p-1 hover:outline hover:outline-[0.5px] hover:outline-shadow">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
    </button>
    <button class="box-border rounded-full p-1 hover:outline hover:outline-[0.5px] hover:outline-shadow">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
</svg>

    </button>
  </div>
</div>
    );
})