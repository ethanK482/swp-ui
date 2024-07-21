/* eslint-disable react/prop-types */
function PDFViewer({ file }) {
  const httpsFile = file?.startsWith("http://")
    ? file?.replace("http://", "https://")
    : file;

  return (
    <div>
      <object
        className="mt-[100px]"
        width="100%"
        height="800px"
        data={httpsFile}
        type="application/pdf"
      ></object>
    </div>
  );
}

export default PDFViewer;
