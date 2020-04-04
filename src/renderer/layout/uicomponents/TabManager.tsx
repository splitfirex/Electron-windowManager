import {
  FontSizes,
  FontWeights,
  getTheme,
  IconButton,
  IContextualMenuItem,
  mergeStyleSets,
  Modal,
  IChoiceGroupOption,
  ChoiceGroup,
  PrimaryButton,
  Checkbox,
  CompoundButton,
  DefaultButton
} from "office-ui-fabric-react";
import * as React from "react";
import { openWindow } from "../StandardWindowController";
import { TabContainer } from "./TabContainer";
import * as Electron from "electron";
import {
  IAbstractComponentProp,
  ContextTabs
} from "../../modules/AbstractComponent";
import { VideograficoComponent } from "@/renderer/modules/videografico/VideograficoComponente";
import ComponentsLibrary from "../utils/ComponentsLibrary";
import {
  getAvailableComponents,
  assingComponentWindow
} from "./TabManagerActions";
import { IComponentDefinition } from "@/main/core/window/IWindowState";

export interface IOverflowData {
  primary: IContextualMenuItem[];
  overflow: IContextualMenuItem[];
  cacheKey?: string;
}

const theme = getTheme();
const contentStyles = mergeStyleSets({
  container: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch"
  },
  header: [
    // tslint:disable-next-line:deprecation
    theme.fonts.large,
    {
      flex: "1 1 auto",
      borderTop: `4px solid ${theme.palette.themePrimary}`,
      color: theme.palette.neutralPrimary,
      display: "flex",
      fontSize: FontSizes.large,
      alignItems: "center",
      fontWeight: FontWeights.semibold,
      padding: "12px 12px 14px 24px"
    }
  ],
  body: {
    flex: "4 4 auto",
    padding: "0 24px 24px 24px",
    overflowY: "hidden",
    selectors: {
      p: {
        margin: "14px 0"
      },
      "p:first-child": {
        marginTop: 0
      },
      "p:last-child": {
        marginBottom: 0
      }
    }
  }
});

const iconButtonStyles = mergeStyleSets({
  root: {
    color: theme.palette.neutralPrimary,
    marginLeft: "auto",
    marginTop: "4px",
    marginRight: "2px"
  },
  rootHovered: {
    color: theme.palette.neutralDark
  }
});

export const TabManager: React.FunctionComponent = props => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [components, setComponents] = React.useState<React.ReactElement[]>([]);
  const [componentsMenu, setComponentsMenu] = React.useState<any>([]);
  const [selectedTab, setSelectedTab] = React.useState(-1);

  const updateComponentsMenu = (
    update: boolean,
    list: IComponentDefinition[]
  ) => {
    if (update)
      assingComponentWindow(list.filter(x => x.state.showing && (x.state.currentWindow === Electron.remote.getCurrentWindow().id
        || x.state.currentWindow === undefined))).then(
          listComponents => {
            setComponents(listComponents.filter(x => x.state.showing && (x.state.currentWindow === Electron.remote.getCurrentWindow().id)).map(ComponentsLibrary));
            setComponentsMenu([...listComponents]);
            setShowMenu(false);
          }
        );
    else
      setShowMenu(false);

  };

  const loadMenu = () => {
    getAvailableComponents(Electron.remote.getCurrentWindow().id).then(
      components => {
        setComponentsMenu([...components]);
        setShowMenu(true);
      }
    );
  };

  return (
    <>
      <ContextTabs.Provider value={{ selectedTab, setSelectedTab }}>
        <div className="content-tab-manager">
          <div style={{ minWidth: 64 }}>
            <IconButton
              className="pivot-menu-button"
              onClick={openWindow}
              iconProps={{
                className: "pivot-menu-button-image",
                iconName: "OpenInNewTab"
              }}
            />
            <IconButton
              className="pivot-menu-button"
              onClick={() => loadMenu()}
              iconProps={{
                className: "pivot-menu-button-image",
                iconName: "Tiles"
              }}
            />
          </div>
          <TabContainer
            content={componentsMenu}
            callback={updateComponentsMenu}
          />
        </div>
        <div className="tab-content">{components}</div>
        <DialogSelectorMenu
          content={componentsMenu}
          show={showMenu}
          callback={updateComponentsMenu}
          windowid={Electron.remote.getCurrentWindow().id}
        />
      </ContextTabs.Provider>
    </>
  );
};

const DialogSelectorMenu: React.FunctionComponent<{
  content: IComponentDefinition[];
  show: boolean;
  windowid: number;
  callback: (update: boolean, action: IComponentDefinition[]) => void;
}> = ({ content, show, callback, windowid }): JSX.Element => {
  const [options, setOptions] = React.useState(content);

  React.useEffect(() => {
    setOptions(content);
  }, [content]);

  const toggle = (n: number) => {
    let option = options.find(x => x.id === n);
    if (option) option.state.showing = !option.state.showing;
    setOptions([...options]);
  };

  return (
    <Modal isOpen={show} isBlocking={true} styles={{ main: { width: "50%" } }}>
      <div className={contentStyles.header}>
        <span>Menu de opciones</span>
        <IconButton
          styles={iconButtonStyles}
          iconProps={{ iconName: "Cancel" }}
          ariaLabel="Close popup modal"
          onClick={() => callback(false, options)}
        />
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        {options.map(x => (
          <CompoundButton
            key={"cb" + x.id}
            onClick={() => toggle(x.id)}
            primary
            disabled={!(x.state.available || x.state.currentWindow === windowid)}
            checked={x.state.showing}
            style={{ margin: "5px" }}
            iconProps={{ iconName: x.iconName }}
            secondaryText={x.subtitle}
          >
            {x.title}
          </CompoundButton>
        ))}
        <DefaultButton onClick={() => callback(true, options)}>
          Actualizar
        </DefaultButton>
      </div>
    </Modal>
  );
};
