import { createClientServer } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

async function getPost(params: { slug: string[]}) {
    const supabase = await createClientServer();

    const response = await supabase.from("post").select("header");

    if(!response.data) {
        notFound();
    }

    return response.data;
}

export default async function MainLayout({
    children, 
    params,
}: {
    children: React.ReactNode;
    params: {slug: string[]} | Promise<{ slug: string[]}>;
}) {
    const resolvedParams = await Promise.resolve(params);
    console.log("Layout Prams: ", JSON.stringify(resolvedParams, null,2));
    
    const post = await getPost(resolvedParams);

    if(!post) {
        notFound();
    }
    return (
        <>
            <div>
                {children}
            </div>
        </>
    );
}