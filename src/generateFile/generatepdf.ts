import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Función para generar un PDF a partir de HTML
export const generatePDFFromHTML = async (
  htmlElement: HTMLElement,
  fileName: string = "CV.pdf",
): Promise<void> => {
  const pdf = new jsPDF();

  // Usar html2canvas para tomar una captura del elemento HTML
  const canvas = await html2canvas(htmlElement);
  const imgData = canvas.toDataURL("image/png");

  // Obtener las dimensiones del canvas
  const imgWidth = 190; // ancho máximo en mm
  const pageHeight = pdf.internal.pageSize.height;
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // calcular altura proporcional
  let heightLeft = imgHeight;

  // Añadir imagen al PDF, paginando si es necesario
  let position = 0;

  pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Agregar páginas adicionales si el contenido excede una sola página
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  // Guardar el PDF con el nombre proporcionado
  pdf.save(fileName);
};
