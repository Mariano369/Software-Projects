import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'

function ReactPDF(props) {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    if (props.maxNumPages) {
      props.maxNumPages === false ? setNumPages(numPages) : setNumPages(props.maxNumPages)
    } else {
      setNumPages(numPages)
    }
  }

  return (
    <div>
      <Document file={props.file} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return <Page pageNumber={page} renderTextLayer={false} renderAnotationLayer={false} width={props.pageWidth} />
          })}
      </Document>
    </div>
  )
}
export default ReactPDF
