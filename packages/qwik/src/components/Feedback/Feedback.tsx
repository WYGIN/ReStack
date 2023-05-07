import { component$ } from "@builder.io/qwik";

type Props = {
    heading: string;
    text: string;
    siteUrl: string;
}

export default component$(({ heading, text, siteUrl }: Props) => {
    return(
        <div class="flex flex-col justify-items-center content-between px-5 py-3 gap-2 rounded-lg outline outline-[0.5px] outline-outline-variant"> 
  <h2 class="font-medium headline-small mb-2">{heading}</h2>
  <p class="body-large">{text}</p> 
  <div class="flex justify-items-center gap-2"> 
    <button class="px-5 py-2 rounded-lg border border-teriary bg-secondary-container hover:bg-teriary-container hover:bg-secondary-fixed-dim fill-on-secondary-fixed"> 

    </button> 
    <button class="px-5 py-2 rounded-lg border border-teriary bg-secondary-container hover:bg-teriary-container hover:bg-secondary-fixed-dim fill-on-secondary-fixed"> 
    </button> 
  </div> 
  <a class="text-on-primary-container underline decoration-secondary-container body-medium" href={siteUrl}>privacy policy</a> 
</div>
    )
});