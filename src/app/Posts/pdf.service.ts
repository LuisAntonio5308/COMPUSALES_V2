import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import {Post} from 'src/app/Posts/post.model';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  generatePdf(posts: Post[]): void {
    // Verifica si la lista de publicaciones está vacía
    if (posts.length === 0) {
      alert('No hay Computadoras para imprimir.');
      return; // Sale del método si no hay publicaciones
    }

    const doc = new jsPDF();

    // Agrega un fondo al área de contenido (color beige)
    doc.setFillColor('#f5f5dc'); // Código hexadecimal para el color beige
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    // Establece márgenes y tamaño de fuente
    const margin = 10;
    const fontSizeTitle = 16;
    const fontSizeText = 12;
    const columnWidth = 60;
    const rowHeight = 10;

    // Agrega el título
    doc.setFontSize(fontSizeTitle);
    doc.text('Lista de Computadoras', margin, margin);

    // Define los datos para la tabla
    //const columns = ['Título', 'Contenido', 'Precio'];
    const columns = ['Título', 'Contenido', 'Precio'];
    //const data = posts.map((post) => [post.title, post.content, $${post.price}]);
    const data = posts.map((post) => [post.title, post.content, ('$'+ post.price + '.00 mxn')]);


    // Configura la posición inicial de la tabla
    let xPosition = margin;
    let yPosition = margin + fontSizeTitle + 5;

    // Agrega las filas y columnas
    columns.forEach((column, index) => {
      doc.text(column, xPosition, yPosition);
      xPosition += columnWidth;
    });

    // Reinicia las posiciones para comenzar las filas de datos
    xPosition = margin;
    yPosition += rowHeight;

    data.forEach((row) => {
      row.forEach((cell, index) => {
        doc.text(cell, xPosition, yPosition);
        xPosition += columnWidth;
      });

      // Reinicia la posición para la próxima fila
      xPosition = margin;
      yPosition += rowHeight;
    });

    // Guarda y abre el PDF en una nueva pestaña
    doc.save('lista_computadoras_CompuSales.pdf');
    window.open(doc.output('bloburl'), '_blank');
  }
}