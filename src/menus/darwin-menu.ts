import i18n from "@/i18n";
import menuFactory from "@/services/menu-factory";
import { App, BrowserWindow, nativeTheme, ipcMain } from "electron";

export default (app: App, mainWindow: BrowserWindow) => {
  mainWindow.setTitle(i18n.t("app.title") as string);

  ipcMain.on("get-language", (_event, locale) => {
    mainWindow.webContents.send("change-language", locale || i18n.locale);
  });

  ipcMain.on("get-theme", (_event, theme) => {
    mainWindow.webContents.send(
      "change-theme",
      theme || nativeTheme.themeSource
    );
  });

  ipcMain.on("change-language", (_event, locale) => {
    new menuFactory.buildMenu(app, mainWindow);
    i18n.locale = locale;
  });

  ipcMain.on("change-theme", (_event, theme) => {
    new menuFactory.buildMenu(app, mainWindow);
    nativeTheme.themeSource = theme;
  });

  const openAboutDialog = () => {
    mainWindow.webContents.send("open-about-dialog");
  };

  const menu = [];

  const mainMenu = [
    {
      label: i18n.t("window.main.about-app-description"),
      role: "about",
    },
    {
      type: "separator",
    },
    {
      label: i18n.t("window.main.hide-app"),
      accelerator: "Command+H",
      role: "hide",
    },
    {
      label: i18n.t("window.main.hide-others"),
      accelerator: "Command+Shift+H",
      role: "hideothers",
    },
    {
      label: i18n.t("window.main.show-all"),
      role: "unhide",
    },
    {
      type: "separator",
    },
    {
      label: i18n.t("window.file.quit"),
      accelerator: "Command+Q",
      click: () => {
        app.quit();
      },
    },
  ];

  const helpMenu = [
    {
      label: i18n.t("window.help.about-app"),
      click: () => openAboutDialog(),
    },
  ];

  const languageMenu = i18n.availableLocales.map((languageCode) => {
    return {
      label: languageCode + " - " + i18n.t(`language.${languageCode}`),
      type: "radio",
      checked: i18n.locale === languageCode,
      click: function () {
        i18n.locale = languageCode;
        new menuFactory.buildMenu(app, mainWindow);
        mainWindow.webContents.send("change-language", languageCode);
      },
    };
  });

  const themeMenu = ["system", "dark", "light"].map((style) => {
    return {
      label: i18n.t(`window.view.theme.mode.${style}`),
      type: "radio",
      checked: nativeTheme.themeSource === style,
      click: function () {
        nativeTheme.themeSource = style as any;
        mainWindow.webContents.send("change-theme", style);
      },
    };
  });

  const viewMenu = [
    {
      label: i18n.t("language.label"),
      submenu: languageMenu,
    },
    {
      label: i18n.t("window.view.theme.label"),
      submenu: themeMenu,
    },
    {
      type: "separator",
    },
    {
      label: i18n.t("window.file.reload"),
      accelerator: "Command+R",
      click: function (_item: any, focusedWindow: { reload: () => void }) {
        focusedWindow.reload();
      },
    },
    {
      label: i18n.t("window.view.fullscreen"),
      accelerator: "Ctrl+Command+F",
      click: function (
        _item: any,
        focusedWindow: {
          setFullScreen: (arg0: boolean) => void;
          isFullScreen: () => any;
        }
      ) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
      },
    },
    {
      label: i18n.t("window.view.minimize"),
      accelerator: "Command+M",
      role: "minimize",
    },
  ];

  menu.push({
    label: i18n.t("app.title"),
    submenu: mainMenu,
  });

  menu.push({
    label: i18n.t("window.view.label"),
    submenu: viewMenu,
  });

  menu.push({
    label: i18n.t("window.help.label"),
    submenu: helpMenu,
  });

  return menu;
};
