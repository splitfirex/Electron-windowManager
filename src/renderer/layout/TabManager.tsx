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
  PrimaryButton
} from "office-ui-fabric-react";
import * as React from "react";
import { openWindow } from "./StandardWindowController";
import { TabContainer } from "./uicomponents/Tab";

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

  return (
    <>
      <div className="content-tab-manager">
        <div style={{ width: "64px", height: "32px" }}>
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
          content={[
            { id: 0, title: "Comunicaciones", icon: "UnpublishContent" },
            { id: 1, title: "Vista estacion", icon: "UnpublishContent" },
            { id: 2, title: "Videografico", icon: "UnpublishContent" },
            { id: 3, title: "Libros", icon: "UnpublishContent" },
            { id: 4, title: "Incumplimientos", icon: "UnpublishContent" },
            { id: 5, title: "AGER", icon: "UnpublishContent" },
            { id: 6, title: "SITRA", icon: "UnpublishContent" }
          ]}
          click={(value: number) => console.log(value)}
        />
      </div>
      <div style={{ height: "100%" }}>{props.children}</div>
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
        <ChoiceGroup defaultSelectedKey="day" options={options} />
        <ChoiceGroup defaultSelectedKey="day" options={options} />
        <ChoiceGroup defaultSelectedKey="day" options={options} />
        <PrimaryButton style={{ float: "right" }} text="PRUEBA"></PrimaryButton>
        <div style={{ clear: "both" }}></div>
      </div>
    </Modal>
  );
};
