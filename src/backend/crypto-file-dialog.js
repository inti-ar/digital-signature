import { dialog } from "electron";
import i18n from "@/i18n";
import { promises as fsPromises } from "fs";

const savePEM = async (data, defaultFilename) => {
  const file = await dialog.showSaveDialog({
    title: i18n.t("crypto-file-dialog.select-file-location-to-save"),
    defaultPath: defaultFilename,
    buttonLabel: i18n.t("crypto-file-dialog.save-file-button-label"),
    filters: [
      {
        name: i18n.t("crypto-file-dialog.pem-files-name"),
        extensions: ["pem"],
      },
    ],
    properties: [],
  });

  if (file.canceled) throw i18n.t("crypto-file-dialog.canceled-save-file");

  const dest = file.filePath.toString();

  console.log(dest);

  await fsPromises.writeFile(dest, data);

  console.log(i18n.t("crypto-file-dialog.saved-file"));
};

const saveSignature = async (data, defaultFilename) => {
  const file = await dialog.showSaveDialog({
    title: i18n.t("crypto-file-dialog.select-file-location-to-save"),
    defaultPath: defaultFilename,
    buttonLabel: i18n.t("crypto-file-dialog.save-file-button-label"),
    filters: [
      {
        name: i18n.t("crypto-file-dialog.signature-files-name"),
        extensions: ["bin"],
      },
    ],
    properties: [],
  });

  if (file.canceled) throw i18n.t("crypto-file-dialog.canceled-save-file");

  const dest = file.filePath.toString();

  console.log(dest);

  await fsPromises.writeFile(dest, data, "binary");

  console.log(i18n.t("crypto-file-dialog.saved-file"));
};

const cryptoFileDialog = {
  savePEM,
  saveSignature,
};

export default cryptoFileDialog;