import { component$ } from "@builder.io/qwik";
import { P } from "drizzle-orm/column.d-8b137277";

export default component$(() => {
    return (
        <nav class="flex flex-start p-4 w-[360px] h-screen bg-surface-container-low shadow-level1 rounded-r-large md:shadow-level0 md:surface box-border">
            <div title="heading" class='flex flex-col justify-center items-start w-[336px] p-2 pl-4 gap-[10px] box-border'>
                <p class='w-[312px] h-[20px] title-small flex items-center box-border'></p>
            </div>
            <div title="sub-heading" class='flex items-center py-[18px] px-8 rounded-[100px] w-[336px] h-[56px] box-border'>
                <div class='flex items-center gap-[12px] w-[98px] h-[20px]'>
                    <p class='w-[98px] h-[20px] title-small text-on-surface-variant'></p>
                </div>
            </div>
            <ul>
                <li class='flex items-center w-[336px] h-[56px] bg-secondary-container rounded-[100px] '>
                    <div class='flex items-center p-4 pr-6 w-[336px] h-[56px] '>
                        <i class='w-6 h-6'>
                            <svg class='absolute bg-on-secondary-container'></svg>
                        </i>
                        <p class='w-[216px] h-[20px] label-large bg-on-secondary-container'></p>
                        <p title="badge" class='w-8 h-5 label-large bg-on-secondary-container text-right'></p>
                    </div>
                </li>
            </ul>
        </nav>       
    )
});