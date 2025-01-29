declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

declare module '@/styles/variables.scss' {
    const content: {
        FS: () => void;
    };
    export default content;
}