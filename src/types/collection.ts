import { Database } from "./supabase";

{/*Database["public"]["Tables"]["posts"]["Row"] represents:
    type Post = {
  id: number;
  title: string;
  content: string;
  category_id: number;
};
*/}
export type AssetSize = Database["public"]["Tables"]["AssetSize"]["Row"];
export type AssetType = Database["public"]["Tables"]["AssetType"]["Row"];
export type Asset = Database["public"]["Tables"]["Assets"]["Row"];
export type Blog = Database["public"]["Tables"]["Blog"]["Row"];
export type PostTag = Database["public"]["Tables"]["PostTags"]["Row"];
export type Post = Database["public"]["Tables"]["Posts"]["Row"];
export type Tag = Database["public"]["Tables"]["Tag"]["Row"];
export type User = Database["public"]["Tables"]["User"]["Row"];

{/*We inherit all properties from Post except "categories" (which we omitted).
Then, we add back "categories" but as a full Category object.


export interface PostWithCategory extends Omit<Post, "categories"> {
    categories: Category;
  }
*/}

export interface PostWithTags extends Omit<Post, "tags"> {
    tags: Tag[];
}