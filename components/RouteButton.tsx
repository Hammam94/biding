import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

type Props = {
  path: string;
  buttonName: string;
};

export default async function RouteButton({ path, buttonName }: Props) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return (
    <Link
      href={path}
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      {buttonName}
    </Link>
  );
}
