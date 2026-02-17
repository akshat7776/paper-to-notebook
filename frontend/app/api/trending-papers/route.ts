import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const revalidate = 0

// In-memory cache keyed by period
const _cache = new Map<string, { papers: any[]; ts: number }>()
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

type Period = 'day' | 'week' | 'month'

interface PaperEntry {
  id: string
  title: string
  abstract: string
  authors: string
  publishedAt: string
  upvotes: number
  githubUrl: string
  githubStars: number
  keywords: string[]
  arxivUrl: string
  hfUrl: string
  thumbnail: string
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function formatAuthors(authors: any[]): string {
  const names: string[] = (authors || []).map((a: any) => a.name).filter(Boolean)
  if (names.length > 3) return names.slice(0, 3).join(', ') + ' et al.'
  return names.join(', ')
}

async function scrapeTrendingPapers(period: Period): Promise<PaperEntry[]> {
  const url = `https://huggingface.co/papers/trending?period=${period}`
  const res = await fetch(url, {
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (compatible; paper2notebook/1.0)',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  })

  if (!res.ok) throw new Error(`HF trending page fetch failed: ${res.status}`)

  const html = await res.text()

  // Extract from Svelte HYDRATER div: data-target="DailyPapers" data-props="..."
  const match = html.match(/data-target="DailyPapers"\s+data-props="([^"]*)"/)
  if (!match) throw new Error('Could not find DailyPapers data-props in HTML')

  const propsJson = decodeHtmlEntities(match[1])
  const props = JSON.parse(propsJson)
  const dailyPapers: any[] = props.dailyPapers || props.papers || []

  return dailyPapers
    .filter((item: any) => item.paper?.id && item.paper?.title)
    .map((item: any): PaperEntry => {
      const paper = item.paper
      return {
        id: paper.id,
        title: paper.title,
        abstract: paper.summary || item.summary || '',
        authors: formatAuthors(paper.authors || []),
        publishedAt: (paper.publishedAt || item.publishedAt || '').slice(0, 10),
        upvotes: paper.upvotes || 0,
        githubUrl: paper.githubRepo || '',
        githubStars: paper.githubStars || 0,
        keywords: (paper.ai_keywords || []).slice(0, 3) as string[],
        arxivUrl: `https://arxiv.org/abs/${paper.id}`,
        hfUrl: `https://huggingface.co/papers/${paper.id}`,
        thumbnail: item.thumbnail || '',
      }
    })
}

export async function GET(request: NextRequest) {
  const period = (request.nextUrl.searchParams.get('period') || 'day') as Period

  // Serve from cache if fresh
  const cached = _cache.get(period)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json({ papers: cached.papers })
  }

  try {
    const papers = await scrapeTrendingPapers(period)
    _cache.set(period, { papers, ts: Date.now() })
    return NextResponse.json({ papers })
  } catch (err) {
    console.error('HF trending papers error:', err)
    // Stale cache fallback
    const stale = _cache.get(period)
    if (stale) return NextResponse.json({ papers: stale.papers })
    return NextResponse.json({ papers: [], error: true })
  }
}
