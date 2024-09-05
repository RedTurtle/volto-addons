declare var __CLIENT__: boolean;
declare var __SERVER__: boolean;
declare module '*.module.scss' {
  let styles: {
    readonly [key: string]: string;
  };
  export default styles;
}
