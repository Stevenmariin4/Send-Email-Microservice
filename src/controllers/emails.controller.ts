import * as fs from "fs";
import { config } from "../config/config";
import { transporte } from "../libs/mailes";
import { Request, Response } from "express";
import { IEmail } from "../interfaces/email.interface";
import { success, error } from "./response";

class sendEmail {
  public templateMeeting: any = config.templateMeeting;
  constructor() {}
  public meeting(req: Request, res: Response, next: any) {
    this.changeString(this.templateMeeting)
      .then(async (data) => {
        const mailOpntions = {
          from: config.userEmail,
          to: "stevenmariin4@gmail.com",
          subject: "Pruebas correos",
          html: data,
        };
        const mailsSend = await this.transport(mailOpntions);

        res.status(mailsSend ? 200 : 500).send({
          message: mailsSend
            ? "Correo Enviado Correctamente"
            : "Error al enviar Correo",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Ha ocurrido un error" });
      });
  }

  public async sendEmail(req: Request, res: Response, next: any) {
    try {
      const body: IEmail = req.body;
      if (
        req.body === undefined ||
        body.to === undefined ||
        body.subject === undefined ||
        body.html === undefined
      ) {
        success(req, res, "Datos Invalidso", 400);
        return;
      }
      const mailOpntions: Partial<IEmail> = {
        from: config.userEmail,
        to: body.to,
        subject: body.subject,
        html: body.html,
      };
      const mailsSend = await this.transport(mailOpntions);
      res.status(mailsSend ? 200 : 500).send({
        message: mailsSend
          ? "Correo Enviado Correctamente"
          : "Error al enviar Correo",
      });
    } catch (ex) {
      console.log(ex);
      error(req, res, "Interla serve error", 500);
    }
  }

  private changeString(nameFile: string): Promise<string> {
    const pathTemplate: any = config.pathSaveTemplate;
    const formatTemplate: any = config.formatTemplate;
    return new Promise((resolve: any, reject: any) => {
      fs.readFile(pathTemplate + nameFile, formatTemplate, (err, data: any) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  private transport(options: any): Promise<boolean> {
    let status: any = false;
    return new Promise((resolve, reject) => {
      transporte
        .sendMail(options)
        .then((info) => {
          status = true;
          resolve(status);
        })
        .catch((error) => {
          status = false;
          reject(status);
          console.error("Error Send Email", error);
        });
    });
  }
}

export const sendemail = new sendEmail();
