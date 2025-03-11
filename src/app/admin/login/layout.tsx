import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Admin Panel',
    description: 'Admin Panel',
    openGraph: {
        type: 'website',
    },
};

export default async function CreatePostLayout({
    children,
}: { children: Readonly<React.ReactNode>}){
    return (
        <div>
            {children}
        </div>
    );
};