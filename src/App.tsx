import "./styles.css";
import * as React from "react";
import { v4 as uuid } from "uuid";

function DeeplinkForm({ onChange }) {
  const labelRef = React.useRef<HTMLInputElement>(null);
  const urlRef = React.useRef<HTMLInputElement>(null);

  return (
    <form style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label htmlFor="label">Label</label>
      <input ref={labelRef} id="label" name="label" />
      <label htmlFor="url">Url</label>
      <input ref={urlRef} id="url" name="url" />
      <button
        type="button"
        onClick={() => {
          if (labelRef.current?.value && urlRef.current?.value) {
            onChange({
              label: labelRef.current?.value,
              url: urlRef.current?.value,
              id: uuid(),
            });
            labelRef.current.value = "";
            urlRef.current.value = "";
          }
        }}
      >
        Add
      </button>
    </form>
  );
}

export default function App() {
  const [items, setItems] = React.useState<
    { label: string; id: string; url: string }[]
  >([]);

  React.useEffect(() => {
    async function exec() {
      try {
        const deeplinks = await localStorage.getItem("deeplinks");
        if (deeplinks) {
          const convertDL = JSON.parse(deeplinks);
          setItems(convertDL);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (typeof window !== "undefined") {
      exec();
    }
  }, []);

  const onChange = React.useCallback((value) => {
    setItems((prev) => {
      let tempValue: { label: string; id: string; url: string }[] = [];
      tempValue = prev.concat(value);
      localStorage.setItem("deeplinks", JSON.stringify(tempValue));
      return tempValue;
    });
  }, []);

  return (
    <div className="App">
      <h1>Simple Deeplink Tester</h1>
      <DeeplinkForm onChange={onChange} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((item) => (
          <a target="_blank" type="link" key={item.id} href={`${item.url}`}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
