import { supabaseCreateClientServer } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export default async function MainLayout({
    children, 
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div>
                {children}
            </div>
        </>
    );
}