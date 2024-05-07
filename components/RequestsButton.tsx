import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function RequestsButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Return null or equivalent if no user is found
  if (!user) {
    return null;
  }

  return (
    <Link
      href="/requests"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Requests
    </Link>
  );
}
