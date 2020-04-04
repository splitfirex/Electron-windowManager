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
import {
  IAbstractComponentProp,
  ContextTabs
} from "@/renderer/modules/AbstractComponent";
import { IComponentDefinition } from "@/main/core/window/IWindowState";

export const TabContainer: React.FunctionComponent<{
  content: IComponentDefinition[];
  callback: (update: boolean, action: IComponentDefinition[]) => void;
}> = ({ content, callback }) => {
  //const currentElement = React.useRef<ReactSortable<IAbstractComponent>>();
  const { selectedTab, setSelectedTab } = React.useContext(ContextTabs);
  const [tabs, setTabs] = React.useState<IComponentDefinition[]>(content);

  React.useEffect(() => {
    setTabs(content);
  }, [content]);

  const removeElement = (id: number) => {
    setSelectedTab(-1);
    let newState = tabs.find(x => x.id === id);
    if (newState) newState.state.showing = false;
    callback(true, tabs);
  };

  const sortable = (
    <ReactSortable
      tag={CustomComponent}
      delay={2}
      animation={500}
      //ref={currentElement}
      list={tabs}
      setList={newTabs => {
        setTabs(newTabs);
      }}
    >
      {tabs
        .filter(x => x.state.showing)
        .map(item => (
          <DefaultButton
            style={{
              borderRadius: 0,
              borderBottomColor: item.id === selectedTab ? "white" : ""
            }}
            iconProps={{ iconName: item.iconName }}
            text={item.title}
            key={"TAB_" + item.id}
            primary={item.id !== selectedTab}
            onClick={() => {
              setSelectedTab(item.id);
            }}
          />
        ))}
    </ReactSortable>
  );

  return (
    <>
      {sortable}
      <div className="tab-extended">
        {selectedTab !== -1 && (
          <IconButton
            primary
            className="pivot-menu-button"
            onClick={() => {
              removeElement(selectedTab);
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
