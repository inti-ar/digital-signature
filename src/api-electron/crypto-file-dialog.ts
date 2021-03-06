import { dialog } from "electron";
import i18n from "@/i18n";
import { promises as fsPromises } from "fs";
import { Stream } from "stream";

const savePEM = async (
  data:
    | string
    | NodeJS.ArrayBufferView
    | Iterable<string | NodeJS.ArrayBufferView>
    | AsyncIterable<string | NodeJS.ArrayBufferView>
    | Stream,
  defaultFilename: any,
  defaultSave?: boolean
) => {
  if (defaultSave) {
    await fsPromises.writeFile(defaultFilename, data);
    return defaultFilename;
  }

  const file = await dialog.showSaveDialog({
    title: i18n.t("crypto-file-dialog.select-file-location-to-save") as string,
    defaultPath: defaultFilename,
    buttonLabel: i18n.t("crypto-file-dialog.save-file-button-label") as string,
    filters: [
      {
        name: i18n.t("crypto-file-dialog.pem-files-name") as string,
        extensions: ["pem"],
      },
    ],
    properties: [],
  });

  if (file.canceled || !file || !file.filePath)
    throw i18n.t("crypto-file-dialog.canceled-save-file");

  const dest = file.filePath.toString();

  await fsPromises.writeFile(dest, data);

  return dest;
};

const saveDigest = async (
  data:
    | string
    | NodeJS.ArrayBufferView
    | Iterable<string | NodeJS.ArrayBufferView>
    | AsyncIterable<string | NodeJS.ArrayBufferView>
    | Stream,
  defaultFilename: any,
  defaultSave?: boolean
) => {
  if (defaultSave) {
    await fsPromises.writeFile(defaultFilename, data, "binary");
    return defaultFilename;
  }

  const file = await dialog.showSaveDialog({
    title: i18n.t("crypto-file-dialog.select-file-location-to-save") as string,
    defaultPath: defaultFilename,
    buttonLabel: i18n.t("crypto-file-dialog.save-file-button-label") as string,
    filters: [
      {
        name: i18n.t("crypto-file-dialog.digest-files-name") as string,
        extensions: ["dig"],
      },
    ],
    properties: [],
  });

  if (file.canceled || !file || !file.filePath)
    throw i18n.t("crypto-file-dialog.canceled-save-file");

  const dest = file.filePath.toString();

  await fsPromises.writeFile(dest, data, "binary");

  return dest;
};

const saveSignature = async (
  data:
    | string
    | NodeJS.ArrayBufferView
    | Iterable<string | NodeJS.ArrayBufferView>
    | AsyncIterable<string | NodeJS.ArrayBufferView>
    | Stream,
  defaultFilename: any,
  defaultSave?: boolean
) => {
  if (defaultSave) {
    await fsPromises.writeFile(defaultFilename, data, "binary");
    return defaultFilename;
  }

  const file = await dialog.showSaveDialog({
    title: i18n.t("crypto-file-dialog.select-file-location-to-save") as string,
    defaultPath: defaultFilename,
    buttonLabel: i18n.t("crypto-file-dialog.save-file-button-label") as string,
    filters: [
      {
        name: i18n.t("crypto-file-dialog.signature-files-name") as string,
        extensions: ["bin"],
      },
    ],
    properties: [],
  });

  if (file.canceled || !file || !file.filePath)
    throw i18n.t("crypto-file-dialog.canceled-save-file");

  const dest = file.filePath.toString();

  await fsPromises.writeFile(dest, data, "binary");

  return dest;
};

const cryptoFileDialog = {
  savePEM,
  saveDigest,
  saveSignature,
};

export default cryptoFileDialog;
