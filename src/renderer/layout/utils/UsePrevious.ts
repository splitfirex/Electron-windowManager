import * as React from "react";

export function usePrevious(value: any) : any {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
