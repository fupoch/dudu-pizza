declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  const path: string
  export default path
}

declare module "*.png" {
  const contentPNG: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default contentPNG;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}