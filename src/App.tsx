import { useEffect, useState } from 'react'
import * as Select from "@radix-ui/react-select"

import './App.css'

function App() {
  const [count, setCount] = useState(4);
  const [nameFilter, setNameFilter] = useState("");
  const [result, setResult] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const handleCreate = (): void => {
    parent.postMessage(
      { pluginMessage: { type: "create-rectangles", count } },
      "*",
    );
  }

  const handleFilter = (): void => {
    parent.postMessage(
      { pluginMessage: { type: "filter-components", nameFilter, typeFilter } },
    );
  }

  useEffect(() => {
    window.onmessage = (event) => {
      if (event.data.pluginMessage) {
        const { type, count } = event.data.pluginMessage;
        if (type === "filter-result") {
          setResult(`Found ${count} component(s)`)
        }
      }


    }
  }, [])


  return (
    <div className='container mx-auto p-10 space-y-4'>
      <h1 className="text-xl font-bold">Component Filter</h1>

      <input
        type="text"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        placeholder="Filter by name"
        className="w-full p-2 border border-gray-300 rounded"
      />

      <Select.Root value={typeFilter} onValueChange={setTypeFilter}>
        <Select.Trigger className="w-full p-2 border border-gray-300 rounded">
          <Select.Value placeholder="Select component type" />
        </Select.Trigger>
        <Select.Content className="bg-white border border-gray-300 rounded shadow-lg">
          <Select.Viewport>
            <Select.Item value="All" className="p-2 hover:bg-gray-100 cursor-pointer">
              <Select.ItemText>All types</Select.ItemText>
            </Select.Item>
            <Select.Item value="COMPONENT" className="p-2 hover:bg-gray-100 cursor-pointer">
              <Select.ItemText>Components</Select.ItemText>
            </Select.Item>
            <Select.Item value="INSTANCE" className="p-2 hover:bg-gray-100 cursor-pointer">
              <Select.ItemText>Instances</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <button onClick={handleFilter} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Filter Components
      </button>

      {result ? <p>{result}</p> : null}

      <button onClick={handleCreate} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Insert {count}
      </button>
      <button
        onClick={() => {
          setCount(prevCount => prevCount + 1)
        }}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Set count
      </button>

    </div>
  )
}

export default App
