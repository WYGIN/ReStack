import { component$ } from "@builder.io/qwik";

type Props = {
    icon?: string;
    title: string;
}

export default component$(({ icon, title }: Props) => {
    return(
        <button class="bg-primary-container text-on-primary-container px-5 py-3 flex items-center gap-3 rounded-lg hover:bg-primary-fixed-dim hover:text-on-primary-fixed">
            {icon}
            <p>{title}</p>
        </button>
    )
})