export enum ScreenSizeEnum {
    default_size = "w-[85vw]",
    large_size = "lg:w-[85vw]"
}

export type LayoutSizeProps = {
    default_screen_width: ScreenSizeEnum.default_size;
    large_screen_width: ScreenSizeEnum.large_size;
}