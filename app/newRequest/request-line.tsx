import { ChangeEvent } from "react";

type Props = {
  updateRequestLine: (data: FormData) => void;
  requestLineId: number;
};

export interface FormData {
  product_id: number;
  quantity: number;
  notes: string;
  id: number
}

export function RequestLine({ updateRequestLine, requestLineId }: Props) {
  const formData = {
    product_id: 1,
    notes: '',
    quantity: 0,
    id: requestLineId
  };

  const handleNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    formData['notes'] = e.target.value as string;
    updateRequestLine(formData);
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    formData['quantity'] = Number(e.target.value);
    updateRequestLine(formData);
  };

  return (
    <div className="border-2 p-4">
      <h4>Request line # {requestLineId}</h4> 
      <label className="text-md">
        Quantity
      </label>
      <input
        type="number"
        className="rounded-md px-4 py-2 bg-inherit border mb-4"
        name={"quantity-" + requestLineId}
        placeholder="quantity"
        onChange={handleQuantityChange}
        required
      />
      <label className="text-md">
        Notes
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-4"
        name={"notes-" + requestLineId}
        onChange={handleNoteChange}
        placeholder="notes"
      />
    </div>
  )
};
