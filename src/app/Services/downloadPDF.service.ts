import { Injectable } from "@angular/core";
import * as jspdf from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
//import html2pdf  from "html2pdf.js";

@Injectable()
export class PDFDownloadService {

  constructor() { }

  public DownloadPDF(data: any, pdfName: any): any {
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL("image/png");
      const pdf = new jspdf.jsPDF("p", "mm", "a4");
      const position = 0;

      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save(pdfName);
    });
  }

  public downloadMultiplePagePDF(element: any, pdfName: any): any {
    const opt = {
      margin: 15,
      filename: pdfName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jspdf: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    // setTimeout(() => {
    //   html2pdf().set(opt).from(element).save();
    // }, 700);
  }

  // To generate PDF
  public exportToPDF(element: any, pdfName: any): any {
    html2canvas(element, { allowTaint: true }).then(canvas => {
      const HTML_Width = canvas.width;
      const HTML_Height = canvas.height;
      const top_left_margin = 15;
      const PDF_Width = HTML_Width + (top_left_margin * 2);
      const PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
      const canvas_image_width = HTML_Width;
      const canvas_image_height = HTML_Height;
      const totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
      canvas.getContext("2d");
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jspdf.jsPDF("p", "pt", [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, "JPG", top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
      for (let i = 1; i <= totalPDFPages; i++) {
        pdf.addPage([PDF_Width, PDF_Height], "p");
        pdf.addImage(imgData, "JPG", top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
      }
      pdf.save(pdfName);
    });
  }

}
