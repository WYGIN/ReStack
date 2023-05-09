import { Slot } from '@builder.io/qwik';
import { RequestEventBase, server$ } from '@builder.io/qwik-city';
import Header from '~/components/Header/Header';
import Footer from '~/components/Footer/Footer';
import NavigationDrawer from '~/components/NavigationDrawer/NavigationDrawer';
import db from '~/db';
import { footer, social } from '~/db/schema';
import { sql } from 'drizzle-orm';


export const useLayoutData = server$((event: RequestEventBase) => {
  const footerItems = db(event).select().from(footer).limit(1) as any;
  const socialItems = db(event).select().from(social) as any;
  const company = event.env.get('COMPANY_NAME')!;
  const companyHref = event.env.get('COMPONY_HREF')!;
  const date = new Date().toDateString();
  const navItems = db(event).execute(sql`
    SELECT * FROM headerItems
      LEFT JOIN headerItems ON headerItems.parentId = header.Id
    UNION
    SELECT * FROM headerItems
      RIGHT JOIN headerItems ON headerItems.parentId = header.Id
  `) as any;

  return {
    date,
    footerItems: footerItems.rows[0],
    socialItems: socialItems.rows[0],
    company: {
      name: company,
      href: companyHref
    },
    navItems: navItems.rows
  }
});

export default ( async (event: RequestEventBase) => {
  const data = await useLayoutData(event);
  return (
    <>
      <Header title='India Today'></Header>
      <div class='flex items-center justify-between'>
        <NavigationDrawer items={ data.navItems }></NavigationDrawer>
        <Slot />
      </div>
      <Footer items={ data.footerItems } social={ data.socialItems } company={data.company} ></Footer>
    </>
  );
});