// This types are from react-router-dom

type _PathParam<Path extends string> = Path extends `${infer L}/${infer R}`
  ? _PathParam<L> | _PathParam<R>
  : Path extends `:${infer Param}`
  ? Param extends `${infer Optional}?`
    ? Optional
    : Param
  : never;

export type PathParam<Path extends string> = Path extends "*" | "/*"
  ? "*"
  : Path extends `${infer Rest}/*`
  ? "*" | _PathParam<Rest>
  : _PathParam<Path>;

export type ParamParseKey<Segment extends string> = [
  PathParam<Segment>
] extends [never]
  ? string
  : PathParam<Segment>;

export const generatePath = <Path extends string>(
  originalPath: Path,
  params?: {
    [key in PathParam<Path>]: string | null;
  }
): string => {
  return params
    ? originalPath.replace(/:([a-zA-Z0-9_]+)/g, (_, key: PathParam<Path>) => {
        if (params[key] === undefined) {
          throw new Error(`Missing parameter: ${key}`);
        }
        return String(params[key]);
      })
    : originalPath;
};
