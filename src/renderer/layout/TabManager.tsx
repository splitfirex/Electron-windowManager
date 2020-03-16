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
  Checkbox
} from "office-ui-fabric-react";
import * as React from "react";
import { openWindow } from "./StandardWindowController";
import { TabContainer, ITabData } from "./uicomponents/Tab";

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

interface IComponents {
  id: number;
  component?: React.FunctionComponent;
  cachedElement?: React.ReactElement;
}

export const LanguageContext = React.createContext({
  language: "en",
  setLanguage: (value: string) => {},
  init: false,
  setInit: (value: boolean) => {}
});

export const Prueba: React.FunctionComponent = props => {
  const { language, setLanguage, init, setInit } = React.useContext(
    LanguageContext
  );
  React.useEffect(() => {
    let cont = 0;
    if (!init) {
      setInterval(() => setLanguage(language + "" + cont++), 1000);
      setInit(true);
    }
  }, []);

  return <div>{language}</div>;
};

export const Prueba1: React.FunctionComponent = props => {
  return <div>PEPE1</div>;
};

export const Prueba2: React.FunctionComponent = props => {
  return <div>PEPE2</div>;
};

export const TabManager: React.FunctionComponent = props => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [componentSelected, setComponentSelected] = React.useState(-1);
  const [language, setLanguage] = React.useState("en");
  const [init, setInit] = React.useState(false);
  const value = { language, setLanguage, init, setInit };

  const [componentMenu, setComponentMenu] = React.useState<ITabData[]>([
    {
      id: 0,
      order: 0,
      iconName: "Cancel",
      title: "prueba1",
      showing: true,
      available: true
    },
    {
      id: 1,
      order: 1,
      iconName: "Cancel",
      title: "prueba2",
      showing: true,
      available: true
    },
    {
      id: 2,
      order: 2,
      iconName: "Cancel",
      title: "prueba3",
      showing: true,
      available: true
    }
  ]);

  const [components, setComponents] = React.useState<IComponents[]>([
    {
      id: 0,
      component: Prueba
    },
    {
      id: 1,
      component: Prueba1
    },
    {
      id: 2,
      component: Prueba2
    }
  ]);

  const removeComponent = (id: number) => {
    setComponentSelected(-1);
  };

  const renderComponent = (): React.ReactElement | undefined => {
    let values = components.find(x => x.id === componentSelected);
    if (values && values.component) {
      if (values.cachedElement === undefined)
        values.cachedElement = React.createElement(values.component);

      return values.cachedElement;
    }
  };

  return (
    <>
      <div className="content-tab-manager">
        <div style={{ minWidth: 64 }}>
          <IconButton
            className="pivot-menu-button"
            onClick={openWindow}
            iconProps={{
              className: "pivot-menu-button-image",
              iconName: "OpenInNewWindow"
            }}
          />
          <IconButton
            className="pivot-menu-button"
            onClick={() => setShowMenu(true)}
            iconProps={{
              className: "pivot-menu-button-image",
              iconName: "OpenInNewTab"
            }}
          />
        </div>
        <TabContainer
          content={componentMenu.filter(x => x.showing).map(item => item)}
          clickRemove={(value: number) => removeComponent(value)}
          click={(value: number) => setComponentSelected(value)}
        />
      </div>
      <div className="tab-content">
        <LanguageContext.Provider value={value}>
          {renderComponent()}
        </LanguageContext.Provider>
      </div>
      <DialogSelectorMenu
        show={showMenu}
        callback={setShowMenu}
      ></DialogSelectorMenu>
    </>
  );
};

const DialogSelectorMenu: React.FunctionComponent<{
  show: boolean;
  callback: (action: boolean) => void;
}> = ({ show, callback }): JSX.Element => {
  const options: IChoiceGroupOption[] = [
    { key: "day", text: "Day", iconProps: { iconName: "CalendarDay" } }
  ];

  return (
    <Modal isOpen={show} isBlocking={true}>
      <div className={contentStyles.header}>
        <span>Menu de opciones</span>
        <IconButton
          styles={iconButtonStyles}
          iconProps={{ iconName: "Cancel" }}
          ariaLabel="Close popup modal"
          onClick={() => callback(false)}
        />
      </div>
      <div style={{ padding: "0 20px 20px" }}>
        <Checkbox checkmarkIconProps={{ iconName: "Cancel" }}></Checkbox>
        <ChoiceGroup style={{ display: "inline-block" }} options={options} />
        <ChoiceGroup style={{ display: "inline-block" }} options={options} />
        <ChoiceGroup style={{ display: "inline-block" }} options={options} />
        <PrimaryButton style={{ float: "right" }} text="PRUEBA"></PrimaryButton>
        <div style={{ clear: "both" }}></div>
      </div>
    </Modal>
  );
};
