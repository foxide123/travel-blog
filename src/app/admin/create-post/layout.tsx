import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Create New Post',
    description: 'Admin panel for creaing a new post',
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