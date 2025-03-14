export function onRequest(context){
    return new Response(`Slug: ${context.params.posts}`);
}