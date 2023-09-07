export const classNames = (
    cls: string,
    mods: { [key: string]: boolean } = {},
    additional: string[] = []
) => {
    return [
        cls,
        ...additional.filter((e) => !!e),
        ...Object.entries(mods)
            .filter(([, value]) => !!value)
            .map(([key]) => key),
    ].join(" ");
};
