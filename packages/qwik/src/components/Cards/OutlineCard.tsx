import { component$ } from "@builder.io/qwik";

type Props = {
    title: string;
    body: string;
}

export default component$(({ title, body }: Props) => {
    return (
        <div class="[isolate: isolate] flex h-auto w-auto items-start rounded-lg">
            <div class="absolute bottom-0 left-0 right-0 top-0 box-border rounded-lg bg-surface outline-outline-variant">
                <div class="flex flex-col items-center justify-center gap-[10px] p-[10px]"></div>
            </div>
            <div class="rounded-lg outline-outline-variant">
                <div class="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center">
                    <div title="Heading" class="box-border flex h-[64px] w-full items-center justify-between py-3 pl-4 pr-3">
                        <div class="flex flex-auto items-center gap-4">
                            <button class="rounded-full p-1 outline outline-[0.5px] outline-outline-variant"></button>
                                <div class="flex grow flex-col items-start p-1">
                                    <p class="label-large">{title}</p>
                                    <p class="label-medium">{body}</p>
                                </div>
                            <button>
                            {/* svg icon here */}
                        </button>
                    </div>
                </div>
            <div class="bg-surface-container-lowest p-6 w-full h-full">
        
            </div>
        </div>
     </div>
</div>

    );
})