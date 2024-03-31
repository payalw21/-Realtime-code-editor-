import React, { useState, useEffect } from "react";
import Editor from "./components/Editor.js";
import useLocalStorage from "./hooks/useLocalStorage.js";
import Header from "./components/Header.js";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  const [title, setTitle] = useLocalStorage("title", "Enter your Title");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
    <html>
      <body>${html}<body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
    `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handler = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const downloadCode = () => {
    const extension = "html";
    const text = srcDoc;
    const fileName = title;
    const data = `data:text/${extension};charSet=utf-8,${encodeURIComponent(
      text
    )}`;
    const link = document.createElement("a");
    link.href = data;
    link.download = `${fileName}.${extension}`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Header title={title} handler={handler} download={downloadCode} />
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
