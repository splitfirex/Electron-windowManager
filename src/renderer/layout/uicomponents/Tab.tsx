import * as React from "react";
import { ReactSortable } from "react-sortablejs";
import {
  DefaultButton,
  CommandBarButton,
  CommandBar,
  IContextualMenuProps
} from "office-ui-fabric-react";

export const TabContainer: React.FunctionComponent<{
  content: { title: string; id: number; icon: string }[];
  click: (id: number) => void;
}> = props => {
  const [selected, setSelected] = React.useState(0);
  const [state, setState] = React.useState(props.content);

  return (
    <>
      <ReactSortable list={state} setList={newState => setState(newState)} style={{height:"32px"}}>
        {state.map(item => (
          <DefaultButton
            style={{
              borderRadius: 0,
              borderBottomColor: item.id === selected ? "white" : ""
            }}
            iconProps={{ iconName: item.icon }}
            text={item.title}
            key={item.id}
            primary={item.id !== selected}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </ReactSortable>
      <div className="tab-extended"></div>
    </>
  );
};

export const TabItem: React.FunctionComponent<{ title: string }> = props => {
  return <DefaultButton text={props.title} allowDisabledFocus />;
};
