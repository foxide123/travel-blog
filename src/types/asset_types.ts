import { Asset } from "./collection";

export enum AssetTypeEnum {
    "image" = "image",
}

export enum AssetSizeEnum {
    "small" = "small",
    "medium" = "medium",
    "large" = "large",
    "standard" = "standard"
}

export type AssetBody = {
    type: AssetTypeEnum,
    caption: string,
    size: AssetSizeEnum,
    content: string,
    image_name: string
}

export type SubmitAssetsBody = {
    assets: AssetBody[];
}


export type AssetWithTypeAndSizeNames = Asset & {
    typeName: string;
    sizeName: string;
}