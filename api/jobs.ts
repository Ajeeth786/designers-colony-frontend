import { createClient } from '@supabase/supabase-js'

export default async function handler(req: any, res: any) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    )

    // ✅ 7-day automatic decay rule
    const visibleFromDate = new Date()
    visibleFromDate.setDate(visibleFromDate.getDate() - 7)

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .gte('created_at', visibleFromDate.toISOString())
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}