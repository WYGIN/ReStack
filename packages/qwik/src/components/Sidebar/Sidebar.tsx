import { component$, Slot } from "@builder.io/qwik";

type sidebarProps = {
    title: string;
}

export default component$(({ title }: sidebarProps) => {
    return (
        <div class="flex flex-col bg-surface-variant text-on-surface-variant rounded-lg border border-t-[6px] border-t-primary m-3">
            <div class="flex items-center justify-between px-5 py-2">
                <p class="headline-small">{title}</p>
            </div>
            <div class="bg-surface px-6 py-3">
                <Slot />
            </div>
        </div>
    )
})