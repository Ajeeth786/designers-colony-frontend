import { createClient } from '@supabase/supabase-js'

export default async function handler(req: any, res: any) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string
    )

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  } catch (err: any) {
    return res.status(500).json({ error: 'Server error' })
  }
}