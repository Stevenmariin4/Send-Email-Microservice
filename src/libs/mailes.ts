import nodemailer from "nodemailer";
import { config } from "../config/config";

export const transporte = nodemailer.createTransport({
  service: "gmail",
  port: 8000,
  secure: false,
  auth: {
    user: config.userEmail,
    pass: config.passwordEmail,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporte
  .verify()
  .then(() => {
    console.log("Conexion Smtp Correcto");
  })
  .catch((error) => {
    console.error("Error Conexion SMTP", error);
  });
