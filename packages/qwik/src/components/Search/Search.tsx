import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return(
        <div class='flex flex-col items-start w-full h-[289px] bg-surface-container-high '>
            <div class='flex items-center p-1 pr-14 bg-surface-container-high gap-1 pt-7 pr-7 '>
                <div class='flex flex-col justify-center gap-[10px] w-12 h-12 '>
                    <div class='flex justify-center items-center gap-[10px] w-10 h-10 rounded-[100px] '>
                        <div title="state-layer" class='flex items-center justify-center p-2 gap-[10px] w-10 h-10 '>
                            <svg class='w-12 h-12'></svg>
                        </div>
                    </div>
                </div>
                <div class='flex items-start gap-[10px] w-[300px] h-6 '>
                    <input type="text" class='body-large text-on-surface-variant flex items-center'/>
                </div>
                <div class='flex flex-col justify-center items-start w-full h-[1px] '>
                    <br class='outline w-full w-full h-0' />
                </div>
                <ul class='flex flex-col items-start w-full h-full'>
                    <li class='flex flex-col items-center justify-center [isolate: isolate] '></li>
                </ul>
            </div>
        </div>
    )
});