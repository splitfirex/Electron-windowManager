import * as React from "react";
import { ReactSortable } from "react-sortablejs";
import {
  DefaultButton,
  CommandBarButton,
  CommandBar,
  IContextualMenuProps,
  IconButton
} from "office-ui-fabric-react";
import ReactDOM from "react-dom";

export interface ITabData {
  id: number;
  order: number;
  title: string;
  iconName: string;
  available: boolean;
  showing: boolean;
}

export const TabContainer: React.FunctionComponent<{
  content: ITabData[];
  click: (id: number) => void;
  clickRemove: (id: number) => void;
}> = props => {
  const currentElement = React.useRef<ReactSortable<ITabData>>(null);
  const [selected, setSelected] = React.useState(-1);
  const [state, setState] = React.useState<ITabData[]>([]);

  const removeElement = (id: number) => {
    setSelected(-1);
    setState(state.filter(x => x.id !== id));
  };

  React.useEffect(() => {
    setState(props.content);
  }, []);

  const sortable = (
    <ReactSortable
      tag={CustomComponent}
      delay={2}
      animation={500}
      ref={currentElement}
      list={state}
      setList={newState => {
        setState(newState);
      }}
    >
      {state.map(item => (
        <DefaultButton
          style={{
            borderRadius: 0,
            borderBottomColor: item.id === selected ? "white" : ""
          }}
          iconProps={{ iconName: item.iconName }}
          text={item.title}
          key={item.id}
          primary={item.id !== selected}
          onClick={() => {
            props.click(item.id);
            setSelected(item.id);
          }}
        />
      ))}
    </ReactSortable>
  );

  return (
    <>
      {sortable}
      <div className="tab-extended">
        {selected !== -1 && (
          <IconButton
            primary
            className="pivot-menu-button"
            onClick={() => {
              props.clickRemove(selected);
              removeElement(selected);
            }}
            iconProps={{
              className: "pivot-menu-button-image",
              iconName: "Cancel"
            }}
          />
        )}
      </div>
    </>
  );
};

const CustomComponent = React.forwardRef(
  (props, ref: React.RefObject<HTMLDivElement>) => {
    return (
      <div
        className="tab-bar-sorter"
        onWheel={e => {
          e.preventDefault();
          if (ref.current) ref.current.scrollLeft += e.deltaY / 5;
        }}
        ref={ref}
      >
        {props.children}
      </div>
    );
  }
);

export const TabItem: React.FunctionComponent<{ title: string }> = props => {
  return <DefaultButton text={props.title} allowDisabledFocus />;
};
