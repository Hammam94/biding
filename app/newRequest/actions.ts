'use server'

import { createClient } from "@/utils/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

interface RequestLine {
  quantity: string;
  notes: string;
}

interface StructuredData {
  notes: string;
  requestLines: RequestLine[];
}

export async function create(formData: FormData): Promise<void> {
  const data = convertFormData(formData);
  
  const supabase = createClient();
  const notes = data.notes;
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    try {
      const { error } = await supabase.from("requests").insert({ buyer_id: user.id, notes });
      if (error) { throw error; }

      const { data: fetchedData, error: fetchError } = await supabase
        .from("requests")
        .select()
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);
      if (fetchError) { throw fetchError; }

      if (fetchedData) { sendRequestLines(fetchedData[0].id, data.requestLines, supabase) }
      console.log("Form submitted successfully");
      redirect("/requests");
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error
    }
  }
}

function convertFormData(formData: FormData): StructuredData {
  const structuredData: StructuredData = {
    notes: "",
    requestLines: [],
  };

  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      if (key === 'notes') {
        structuredData.notes = value;
      } else {
        const match = key.match(/(quantity|notes)(\d+)/);
        if (match) {
          const [_, type, index] = match;
          const idx = parseInt(index) - 1;
          let requestLine = structuredData.requestLines[idx];
          if (!requestLine) {
            requestLine = { quantity: '', notes: '' };
            structuredData.requestLines[idx] = requestLine;
          }
          requestLine[type as keyof RequestLine] = value;
        }
      }
    }
  });

  return structuredData;
}

async function sendRequestLines(requestId: number, requestLines: RequestLine[], supabase: SupabaseClient) {
  const requestLineData = requestLines.map(line => ({
    request_id: requestId,
    notes: line.notes,
    quantity: line.quantity,
    product_id: 1
  }));

  const { data: requestLineInsertData, error: requestLineError } = 
    await supabase.from("request_lines").insert(requestLineData);
  
  if (requestLineError) { throw requestLineError; }

  console.log("Request Line Insert Data:", requestLineInsertData);
}
