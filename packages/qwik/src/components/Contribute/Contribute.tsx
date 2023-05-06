import { component$ } from '@builder.io/qwik'

type Props = {
    siteUrl: string;
    GithubUrl: string;
    path: string;
}

export default component$(({ siteUrl, GithubUrl, path }: Props) => {
    return(
        <div class="px-5 py-3 bg-secondary-container border border-teriary rounded mx-3 my-2 flex flex-col justify-items-center gap-2"> 
  <h2 class="font-medium body-large mb-1 text-on-secondary-container">Help us make this Article great!</h2> 
  <p class="text-sm body-medium text-on-secondary-container">All wygin Articles are open source. Something missing? or want to improve?<span class="block">Submit a pull request. Build a better web!</span></p> 
  <a class="px-3 py-1 border border-teriary rounded-lg font-medium text-sm flex items-center mr-auto bg-teriary-container text-on-teriary-container body-medium" href={`${GithubUrl}/edit/main/${path}`}> 
    <svg class="fill-on-teriary-container h-3.5 w-3.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M305.8 2.1C314.4 5.9 320 14.5 320 24V64h16c70.7 0 128 57.3 128 128V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V192c0-35.3-28.7-64-64-64H320v40c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1zM104 80c0-13.3-10.7-24-24-24S56 66.7 56 80s10.7 24 24 24s24-10.7 24-24zm8 73.3V358.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3V153.3C19.7 141 0 112.8 0 80C0 35.8 35.8 0 80 0s80 35.8 80 80c0 32.8-19.7 61-48 73.3zM104 432c0-13.3-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24s24-10.7 24-24zm328 24c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/></svg> 
    <span>improve this Article!</span> 
  </a> 
  <p class="text-xs font-light body-small text-on-secondary-container"> 
    or, 
    <a class="underline decoration-primary" href={`${siteUrl}/blog`}>learn how to contribute</a> 
  </p> 
</div>
    )
})