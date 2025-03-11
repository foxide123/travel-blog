import { Post } from "./collection";

export interface PostWithAssets extends Post {
  assets?: string[];
}