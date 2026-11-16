import { GET as getRss } from "../rss.xml/route";

export async function GET() {
  return getRss();
}
