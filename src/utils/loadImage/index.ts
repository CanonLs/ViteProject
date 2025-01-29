/**
 * 批量加载图片资源并返回其URL
 * @param imagePaths 图片路径数组
 * @returns 处理后的图片URL数组
 */
export const loadImages = (imagePaths: any) => {
    return imagePaths.map((path: any) => {
        try {
            // 处理 @assets 别名
            const processedPath = path.startsWith('@assets/')
                ? path.replace('@assets/', '../../assets/')
                : path;
            return new URL(processedPath, import.meta.url).href;
        } catch (error) {
            console.error(`Failed to load image: ${path}`, error);
            return '';
        }
    }).filter(Boolean);
};
