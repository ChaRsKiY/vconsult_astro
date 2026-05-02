import { supabase } from './supabase'

export type SectionContent = Record<string, string>
export type SiteContent = Record<string, SectionContent>

export async function fetchContent(lang: string): Promise<SiteContent> {
  const { data } = await supabase
    .from('content')
    .select('section,key,lang,value')
    .eq('lang', lang)

  const result: SiteContent = {}
  for (const row of (data ?? []) as { section: string; key: string; lang: string; value: string }[]) {
    if (!result[row.section]) result[row.section] = {}
    result[row.section][row.key] = row.value
  }
  return result
}

export type CmsArticle = {
  id: string
  title: string
  slug: string | null
  category: string | null
  tags: string[] | null
  date: string | null
  image_url: string | null
  short_description: string | null
  content: string | null
  published: boolean | null
}

// Normalized shape used by all Astro components and React NewsList
export type ArticleItem = {
  id: string
  title: string
  slug: string
  category: string
  tags: string[]
  date: string
  image: string
  shortDescription: string
  content: string
}

export function mapArticle(a: CmsArticle): ArticleItem | null {
  if (!a.slug) return null
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    category: a.category ?? '',
    tags: a.tags ?? [],
    date: a.date ?? '',
    image: a.image_url ?? '',
    shortDescription: a.short_description ?? '',
    content: a.content ?? '',
  }
}

export async function fetchArticles(): Promise<ArticleItem[]> {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,category,tags,date,image_url,short_description,content,published')
    .eq('published', true)
    .order('date', { ascending: false })
  return ((data ?? []) as CmsArticle[]).map(mapArticle).filter(Boolean) as ArticleItem[]
}

export type KundeItem = {
  id: string
  name: string
  industry: string
  type: 'kunde' | 'partner'
  logo_url: string | null
  website_url: string | null
  display_order: number
}

export async function fetchKunden(): Promise<KundeItem[]> {
  const { data } = await supabase
    .from('kunden')
    .select('id,name,industry,type,logo_url,website_url,display_order')
    .eq('active', true)
    .order('display_order')
  return (data ?? []) as KundeItem[]
}

export async function fetchTrustbarKunden(): Promise<KundeItem[]> {
  const { data } = await supabase
    .from('kunden')
    .select('id,name,logo_url,website_url,display_order')
    .eq('active', true)
    .eq('show_in_trustbar', true)
    .order('display_order')
  return (data ?? []) as KundeItem[]
}

export async function fetchArticleBySlug(slug: string): Promise<ArticleItem | null> {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,category,tags,date,image_url,short_description,content,published')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  if (!data) return null
  return mapArticle(data as CmsArticle)
}
