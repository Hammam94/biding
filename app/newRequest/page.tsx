'use client'
import { useState } from 'react';
import { RequestLine, FormData as RequestLineFormData } from "./request-line";
import { create } from './actions'
import { SubmitButton } from './submit-button';
export default function NewRequest() {
  const [requestLines, setRequestLines] = useState<RequestLineFormData[]>([
    {
      product_id: 1,
      notes: '',
      quantity: 0,
      id: 1
    }
  ]);

  const addRequestLine = () => {
    const newRequestLine: RequestLineFormData = {
      product_id: 1,
      notes: "",
      quantity: 0,
      id: requestLines.length + 1,
    };
    setRequestLines([...requestLines, newRequestLine]);
  };

  const updateRequestLine = (updatedRequestLine: RequestLineFormData) => {
    setRequestLines((prevRequestLines) =>
      prevRequestLines.map((requestLine) =>
        requestLine.id === updatedRequestLine.id ? updatedRequestLine : requestLine
      )
    );
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 lg:max-w-2xl justify-center gap-2">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground" action={create}>
        <label className="text-md">
          Notes
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="notes"
          placeholder="notes"
        />
        {
          requestLines.map(rl => <RequestLine key={rl.id} requestLineId={rl.id} updateRequestLine={updateRequestLine}/>)
        }
        <button onClick={addRequestLine} className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Add Request Line
        </button>
        <SubmitButton
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Submit..."
        >
          Submit
        </SubmitButton>
      </form>
    </div>
  );
}