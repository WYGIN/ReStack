import { component$ } from "@builder.io/qwik";

type FooterProps = {
    items: Array<{
        label: string;
        items: Array<{
            label: string;
            href: string;
        }>
    }>;
    company: {
        name: string;
        href: string;
    };
    social: Array<{
        label: string;
        href: string;
        icon: string;
    }>
}

export default component$(({ items, company, social }: FooterProps) => {
    return (
        <footer class="bg-primary">
  <div class="mx-auto w-full max-w-screen-xl">
    <div class="grid grid-cols-2 gap-8 px-4 py-6 md:grid-cols-4 lg:py-8">
    {
        items.map(item => (
            <div>
                <h2 class="text-on-primary mb-6 text-sm font-semibold uppercase">{item.label}</h2>
                <ul class="text-on-primary label-large">
                    {
                        item.items.map(subItem => (
                            <li class="mb-4" key={subItem.href}>
                                <a href={subItem.href} class="hover:underline">{subItem.label}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        ))
    }
    </div>
    <div class="bg-primary-fixed-variant px-4 py-6 md:flex md:items-center md:justify-between">
      <span class="text-on-primary-fixed-variant text-sm sm:text-center">© 2023 <a href={company.href}>{company.name}</a>. All Rights Reserved. </span>
      <div class="mt-4 flex space-x-6 sm:justify-center md:mt-0">
        {
            social.map((item) => (
                <a href={item.href} class="text-on-primary-fixed-variant hover:text-on-primary-fixed">
                    <svg><image xlink:href={item.icon} /></svg>
                    <span class="sr-only">{item.label}</span>
                </a>
            ))
        }
      </div>
    </div>
  </div>
</footer>

    )
});