import { ipcMain } from "electron";
import { DigitalSignature } from "./digital-signature";

const digitalSignature = new DigitalSignature();

ipcMain.on("generate-private-key", (event, arg) => {
  digitalSignature.generatePrivateKey()
    .then(privateKey => event.reply("generate-private-key", privateKey))
    .catch(e => console.log(e.toString()))
});

ipcMain.on("generate-public-key", async (event, privateKeyPath) => {
  try {
    const publicKey = await digitalSignature.generatePublicKey(privateKeyPath)
    event.reply("generate-public-key", publicKey)
  } catch(e) {
    console.log(e.toString())
  }
});

ipcMain.on("sign", (event, {privateKeyPath, fileToSignPath}) => {
  digitalSignature.sign(privateKeyPath, fileToSignPath)
    .then(signedFile => event.reply("sign", signedFile))
    .catch(e => console.log(e.toString()))
});

ipcMain.on("verify", (event, {publicKeyPath, fileToVerifyPath, originalFilePath}) => {
  digitalSignature.verify(publicKeyPath, fileToVerifyPath, originalFilePath)
    .then(result => event.reply(result))
    .catch(e => console.log(e.toString()))
});