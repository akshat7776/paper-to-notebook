import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  const res = await fetch(`https://export.arxiv.org/api/query?id_list=${id}`, {
    headers: { 'User-Agent': 'paper2notebook/1.0' },
  })
  const text = await res.text()
  return new NextResponse(text, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
