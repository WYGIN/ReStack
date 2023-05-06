import { component$ } from "@builder.io/qwik";

type Props = {
    icon?: string;
    title: string;
    clazz: string;
}

export default component$(({ icon, title, clazz }: Props) => {
    return(
        <button class={`bg-primary-container text-on-primary-container px-5 py-3 flex items-center gap-3 rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed ${clazz}`}>
            {icon}
            <p>{title}</p>
        </button>
    )
})