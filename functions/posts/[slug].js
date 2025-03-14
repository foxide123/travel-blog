import nextOnPagesHandler from '@cloudflare/next-on-pages/fetch-handler';

export function onRequest(context){
    return nextOnPagesHandler.fetch(context.request, context.env, context.ctx);    
}